import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { createKnowledgeStore, answerFromKnowledge } from "./knowledge.mjs";

const appDir = path.dirname(fileURLToPath(import.meta.url));
await loadEnv(path.join(appDir, ".env"));

const port = Number(process.env.ACTIONPILOT_PORT || 4310);
const root = path.resolve(process.env.ACTIONPILOT_WORKSPACE || path.join(appDir, "workspace"));
const model = process.env.OPENAI_MODEL || "gpt-5.4-mini";
const publicDir = path.join(appDir, "public");
const sessions = new Map();
await fs.mkdir(root, { recursive: true });
const knowledge = await createKnowledgeStore(appDir, root);
await knowledge.importText({
  title: "DigiVista Knowledge Assistant User Help Center",
  content: await fs.readFile(path.join(appDir, "docs", "USER-HELP-CENTER.md"), "utf8"),
  sourcePath: "docs/USER-HELP-CENTER.md",
  collection: "public"
});

const tools = [
  fn("list_files", "List files and folders inside the allowed workspace.", {
    relative_path: str("Folder path relative to the workspace. Use an empty string for the root."),
    recursive: bool("Whether to include nested contents.")
  }, ["relative_path", "recursive"]),
  fn("read_file", "Read a UTF-8 text file inside the allowed workspace.", {
    relative_path: str("File path relative to the workspace.")
  }, ["relative_path"]),
  fn("create_directory", "Create a directory inside the allowed workspace.", {
    relative_path: str("Directory path relative to the workspace.")
  }, ["relative_path"]),
  fn("write_file", "Create or replace a UTF-8 text file inside the allowed workspace.", {
    relative_path: str("File path relative to the workspace."),
    content: str("Complete file content.")
  }, ["relative_path", "content"]),
  fn("move_path", "Move or rename a file or directory inside the allowed workspace.", {
    source: str("Existing relative path."), destination: str("New relative path.")
  }, ["source", "destination"]),
  fn("copy_file", "Copy a file inside the allowed workspace.", {
    source: str("Existing relative path."), destination: str("New relative path.")
  }, ["source", "destination"]),
  fn("delete_path", "Delete a file or empty directory inside the workspace. Always requires approval.", {
    relative_path: str("Path relative to the workspace.")
  }, ["relative_path"]),
  fn("run_program", "Run an approved local program without a command shell. Always requires approval.", {
    program: { type: "string", enum: ["node", "npm", "git", "python", "python3"] },
    args: { type: "array", items: { type: "string" }, description: "Argument list; shell operators are not interpreted." },
    working_directory: str("Working directory relative to the workspace.")
  }, ["program", "args", "working_directory"]),
  fn("open_url", "Open an HTTP or HTTPS address in the default browser. Always requires approval.", {
    url: str("Full HTTP or HTTPS URL.")
  }, ["url"])
];

const instructions = `You are ActionPilot, a careful local task agent. Break the user's request into concrete steps and use tools until the task is complete. You can only act inside the configured workspace. Inspect before changing. Never claim an action succeeded until its tool result confirms it. Explain blocked tasks plainly. Avoid destructive replacement when an additive change works. Do not request secrets. Keep final responses brief and include a useful summary of completed work.`;

function fn(name, description, properties, required) {
  return { type: "function", name, description, strict: true, parameters: { type: "object", properties, required, additionalProperties: false } };
}
function str(description) { return { type: "string", description }; }
function bool(description) { return { type: "boolean", description }; }

function safePath(relative = "") {
  if (typeof relative !== "string" || path.isAbsolute(relative)) throw new Error("Only relative workspace paths are allowed.");
  const target = path.resolve(root, relative);
  const rel = path.relative(root, target);
  if (rel.startsWith("..") || path.isAbsolute(rel)) throw new Error("Path escapes the allowed workspace.");
  return target;
}

function actionRisk(name, args, mode) {
  if (["delete_path", "run_program", "open_url"].includes(name)) return "high";
  if (["write_file", "move_path", "copy_file", "create_directory"].includes(name)) return mode === "cautious" ? "medium" : "low";
  return "low";
}

async function execute(name, args) {
  switch (name) {
    case "list_files": {
      const start = safePath(args.relative_path);
      const output = [];
      async function walk(dir, depth = 0) {
        if (output.length >= 300) return;
        const entries = await fs.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
          const full = path.join(dir, entry.name);
          output.push({ path: path.relative(root, full), type: entry.isDirectory() ? "directory" : "file" });
          if (args.recursive && entry.isDirectory() && depth < 8) await walk(full, depth + 1);
        }
      }
      await walk(start);
      return { entries: output, truncated: output.length >= 300 };
    }
    case "read_file": {
      const file = safePath(args.relative_path);
      const stat = await fs.stat(file);
      if (stat.size > 1_000_000) throw new Error("File exceeds the 1 MB reading limit.");
      return { path: args.relative_path, content: await fs.readFile(file, "utf8") };
    }
    case "create_directory":
      await fs.mkdir(safePath(args.relative_path), { recursive: true });
      return { created: args.relative_path };
    case "write_file": {
      const file = safePath(args.relative_path);
      if (Buffer.byteLength(args.content, "utf8") > 2_000_000) throw new Error("Content exceeds the 2 MB writing limit.");
      await fs.mkdir(path.dirname(file), { recursive: true });
      await fs.writeFile(file, args.content, "utf8");
      return { written: args.relative_path, bytes: Buffer.byteLength(args.content) };
    }
    case "move_path":
      await fs.mkdir(path.dirname(safePath(args.destination)), { recursive: true });
      await fs.rename(safePath(args.source), safePath(args.destination));
      return { moved: args.source, destination: args.destination };
    case "copy_file":
      await fs.mkdir(path.dirname(safePath(args.destination)), { recursive: true });
      await fs.copyFile(safePath(args.source), safePath(args.destination));
      return { copied: args.source, destination: args.destination };
    case "delete_path": {
      const target = safePath(args.relative_path);
      if (target === root) throw new Error("The workspace root cannot be deleted.");
      const stat = await fs.stat(target);
      if (stat.isDirectory()) await fs.rmdir(target); else await fs.unlink(target);
      return { deleted: args.relative_path };
    }
    case "run_program":
      return await runProgram(args.program, args.args, safePath(args.working_directory));
    case "open_url": {
      const url = new URL(args.url);
      if (!["http:", "https:"].includes(url.protocol)) throw new Error("Only HTTP and HTTPS URLs are allowed.");
      const command = process.platform === "win32" ? "explorer.exe" : process.platform === "darwin" ? "open" : "xdg-open";
      spawn(command, [url.href], { detached: true, stdio: "ignore" }).unref();
      return { opened: url.href };
    }
    default: throw new Error(`Unknown action: ${name}`);
  }
}

function runProgram(program, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(program, args, { cwd, shell: false, windowsHide: true, env: { ...process.env } });
    let stdout = "", stderr = "", finished = false;
    const timer = setTimeout(() => { child.kill(); reject(new Error("Program exceeded the 30-second limit.")); }, 30_000);
    child.stdout.on("data", chunk => { stdout = (stdout + chunk).slice(-50_000); });
    child.stderr.on("data", chunk => { stderr = (stderr + chunk).slice(-50_000); });
    child.on("error", reject);
    child.on("close", code => { if (finished) return; finished = true; clearTimeout(timer); resolve({ exit_code: code, stdout, stderr }); });
  });
}

async function callOpenAI(input, previousResponseId) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY is missing. Add it to ActionPilot/.env and restart.");
  const body = { model, instructions, input, tools, tool_choice: "auto", parallel_tool_calls: false, store: true };
  if (previousResponseId) body.previous_response_id = previousResponseId;
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${key}` }, body: JSON.stringify(body)
  });
  const json = await response.json();
  if (!response.ok) throw new Error(json.error?.message || `OpenAI request failed (${response.status}).`);
  return json;
}

function summary(name, args) {
  const labels = { list_files: "List files", read_file: "Read file", create_directory: "Create folder", write_file: "Write file", move_path: "Move or rename", copy_file: "Copy file", delete_path: "Delete", run_program: "Run program", open_url: "Open website" };
  const detail = args.relative_path || args.source || args.url || `${args.program || ""} ${(args.args || []).join(" ")}`;
  return `${labels[name] || name}: ${detail}`;
}

async function advance(session, input, previousResponseId) {
  for (let turns = 0; turns < 20; turns++) {
    if (session.stopped) { session.status = "stopped"; return; }
    const response = await callOpenAI(input, previousResponseId);
    if (session.stopped) { session.status = "stopped"; return; }
    session.previousResponseId = response.id;
    const calls = (response.output || []).filter(item => item.type === "function_call");
    if (!calls.length) {
      const text = response.output_text || (response.output || []).flatMap(x => x.content || []).filter(x => x.type === "output_text").map(x => x.text).join("\n");
      session.messages.push({ role: "assistant", text: text || "Task completed." });
      session.status = "idle";
      return;
    }
    const call = calls[0];
    let args;
    try { args = JSON.parse(call.arguments); } catch { args = {}; }
    const risk = actionRisk(call.name, args, session.mode);
    if (risk !== "low") {
      session.pending = { id: crypto.randomUUID(), callId: call.call_id, name: call.name, args, risk, summary: summary(call.name, args) };
      session.status = "approval";
      return;
    }
    let result;
    if (session.stopped) { session.status = "stopped"; return; }
    try { result = await execute(call.name, args); session.activity.push({ at: new Date().toISOString(), name: call.name, summary: summary(call.name, args), outcome: "completed" }); }
    catch (error) { result = { error: error.message }; session.activity.push({ at: new Date().toISOString(), name: call.name, summary: summary(call.name, args), outcome: "failed" }); }
    input = [{ type: "function_call_output", call_id: call.call_id, output: JSON.stringify(result) }];
    previousResponseId = response.id;
  }
  throw new Error("Stopped after 20 consecutive actions for safety.");
}

function newSession() {
  const id = crypto.randomUUID();
  const session = { id, mode: "balanced", status: "idle", stopped: false, pending: null, previousResponseId: null, messages: [], activity: [] };
  sessions.set(id, session); return session;
}

async function api(req, res, url) {
  if (url.pathname === "/api/knowledge/status" && req.method === "GET") {
    return json(res, 200, { model, keyConfigured: Boolean(process.env.OPENAI_API_KEY), workspace: root, documents: knowledge.listDocuments("public") });
  }
  if (url.pathname === "/api/knowledge/import-folder" && req.method === "POST") {
    const body = await readJson(req);
    return json(res, 200, await knowledge.importWorkspace(String(body.relativeFolder || "knowledge"), String(body.collection || "public")));
  }
  if (url.pathname === "/api/knowledge/documents" && req.method === "POST") {
    const body = await readJson(req);
    return json(res, 201, await knowledge.importText({ title: body.title, content: body.content, sourceUrl: body.sourceUrl, collection: body.collection, updatedAt: body.updatedAt }));
  }
  if (url.pathname === "/api/knowledge/ask" && req.method === "POST") {
    const body = await readJson(req), question = String(body.question || "").trim();
    if (!question) return json(res, 400, { error: "Question is required." });
    return json(res, 200, await answerFromKnowledge({ question, collection: String(body.collection || "public"), store: knowledge, apiKey: process.env.OPENAI_API_KEY, model }));
  }
  const deleteKnowledge = url.pathname.match(/^\/api\/knowledge\/documents\/([a-f0-9-]+)$/);
  if (deleteKnowledge && req.method === "DELETE") return json(res, 200, knowledge.removeDocument(deleteKnowledge[1]));
  if (req.method === "POST" && url.pathname === "/api/sessions") return json(res, 201, publicState(newSession()));
  const match = url.pathname.match(/^\/api\/sessions\/([^/]+)(?:\/(message|approval|stop))?$/);
  if (!match) return json(res, 404, { error: "Not found" });
  const session = sessions.get(match[1]);
  if (!session) return json(res, 404, { error: "Session not found" });
  if (req.method === "GET" && !match[2]) return json(res, 200, publicState(session));
  const body = await readJson(req);
  if (req.method === "POST" && match[2] === "message") {
    if (session.status === "working" || session.status === "approval") return json(res, 409, { error: "Finish or stop the current task first." });
    session.mode = ["cautious", "balanced"].includes(body.mode) ? body.mode : "balanced";
    session.stopped = false; session.status = "working";
    session.messages.push({ role: "user", text: String(body.message || "") });
    await advance(session, String(body.message || ""), session.previousResponseId);
    return json(res, 200, publicState(session));
  }
  if (req.method === "POST" && match[2] === "approval") {
    if (!session.pending || session.pending.id !== body.id) return json(res, 409, { error: "This approval is no longer pending." });
    const pending = session.pending; session.pending = null; session.status = "working";
    let result;
    if (body.approved) {
      try { result = await execute(pending.name, pending.args); session.activity.push({ at: new Date().toISOString(), name: pending.name, summary: pending.summary, outcome: "approved and completed" }); }
      catch (error) { result = { error: error.message }; session.activity.push({ at: new Date().toISOString(), name: pending.name, summary: pending.summary, outcome: "failed" }); }
    } else {
      result = { denied: true, reason: String(body.reason || "User declined the action.") };
      session.activity.push({ at: new Date().toISOString(), name: pending.name, summary: pending.summary, outcome: "declined" });
    }
    await advance(session, [{ type: "function_call_output", call_id: pending.callId, output: JSON.stringify(result) }], session.previousResponseId);
    return json(res, 200, publicState(session));
  }
  if (req.method === "POST" && match[2] === "stop") {
    session.stopped = true; session.pending = null; session.status = "stopped";
    return json(res, 200, publicState(session));
  }
  return json(res, 405, { error: "Method not allowed" });
}

function publicState(s) { return { ...s, workspace: root, model, keyConfigured: Boolean(process.env.OPENAI_API_KEY) }; }
function json(res, status, value) { res.writeHead(status, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }); res.end(JSON.stringify(value)); }
async function readJson(req) { let body = ""; for await (const chunk of req) { body += chunk; if (body.length > 10_000_000) throw new Error("Request too large"); } return body ? JSON.parse(body) : {}; }
async function loadEnv(file) { try { const text = await fs.readFile(file, "utf8"); for (const line of text.split(/\r?\n/)) { const match = line.match(/^([A-Z0-9_]+)=(.*)$/); if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim(); } } catch {} }

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname.startsWith("/api/")) return await api(req, res, url);
    const requested = url.pathname === "/" ? "index.html" : url.pathname.slice(1);
    const file = path.resolve(publicDir, requested);
    if (!file.startsWith(publicDir)) return json(res, 403, { error: "Forbidden" });
    const ext = path.extname(file);
    const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml" };
    res.writeHead(200, { "content-type": types[ext] || "application/octet-stream" }); res.end(await fs.readFile(file));
  } catch (error) { json(res, 500, { error: error.message }); }
});

server.listen(port, "127.0.0.1", () => console.log(`ActionPilot is ready at http://127.0.0.1:${port}`));
