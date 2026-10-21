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

  const first = await store.importText({
    title: "Support Hours",
    content: "DigiVista support hours are Monday to Friday from nine to five.",
    collection: "public"
  });
  assert.equal(first.imported, true);
  assert.equal((await store.importText({ title: "Copy", content: "DigiVista support hours are Monday to Friday from nine to five.", collection: "public" })).duplicate, true);
  assert.equal(store.search("What are DigiVista support hours?", "public").length, 1);
  assert.equal(store.search("What are DigiVista support hours?", "private").length, 0);

  const missing = await answerFromKnowledge({ question: "What is the lunar temperature?", collection: "public", store, apiKey: "", model: "unused" });
  assert.equal(missing.grounded, false);
  assert.match(missing.answer, /DigiVista Infotech team/);

  assert.equal(store.removeDocument(first.document.id).deleted, true);
  assert.equal(store.listDocuments("public").length, 0);
  store.close();
  await fs.rm(temp, { recursive: true, force: true });
});
