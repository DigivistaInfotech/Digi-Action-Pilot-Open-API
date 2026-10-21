import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { createKnowledgeStore, answerFromKnowledge } from "../knowledge.mjs";

test("imports, isolates, retrieves, deduplicates, and refuses unsupported questions", async () => {
  const temp = await fs.mkdtemp(path.join(os.tmpdir(), "actionpilot-knowledge-"));
  const workspace = path.join(temp, "workspace");
  await fs.mkdir(workspace);
  const store = await createKnowledgeStore(temp, workspace);
  store.createProject({ slug: "private", name: "Private Test Project" });

  const first = await store.importText({
    title: "Support Hours",
    content: "DigiVista support hours are Monday to Friday from nine to five.",
    collection: "public"
  });
  assert.equal(first.imported, true);
  assert.equal((await store.importText({ title: "Copy", content: "DigiVista support hours are Monday to Friday from nine to five.", collection: "public" })).duplicate, true);
  assert.equal((await store.importText({ title: "Private copy", content: "DigiVista support hours are Monday to Friday from nine to five.", collection: "private" })).imported, true);
  assert.equal(store.search("What are DigiVista support hours?", "public").length, 1);
  assert.equal(store.search("What are DigiVista support hours?", "private").length, 1);
  assert.deepEqual(store.listProjects().map(project => project.slug).sort(), ["private", "public"]);

  const version1=await store.importText({title:"Versioned guide",content:"The versioned guide contains the original approved procedure.",sourcePath:"guide.md",collection:"public"});
  const version2=await store.importText({title:"Versioned guide",content:"The versioned guide contains the revised approved procedure.",sourcePath:"guide.md",collection:"public"});
  assert.equal(version1.imported,true);
  assert.equal(version2.updated,true);
  assert.equal(store.listDocuments("public").filter(document=>document.source_path==="guide.md").length,1);

  const missing = await answerFromKnowledge({ question: "What is the lunar temperature?", collection: "public", store, apiKey: "", model: "unused" });
  assert.equal(missing.grounded, false);
  assert.match(missing.answer, /DigiVista Infotech team/);

  assert.equal(store.removeDocument(first.document.id).deleted, true);
  assert.equal(store.listDocuments("public").length, 1);
  store.close();
  await fs.rm(temp, { recursive: true, force: true });
});
