# DigiVista Knowledge Assistant — User Help Center

## Welcome

DigiVista Knowledge Assistant helps users find answers from documents approved by DigiVista Infotech. It does not search the open internet and should not invent information that is missing from its knowledge base.

This guide explains how to start the application, add documents, ask questions, verify answers, and resolve common problems.

## What the assistant can do

- Answer questions from approved documents.
- Read PDF, TXT, Markdown, CSV, JSON, and HTML files.
- Show the documents used to prepare an answer.
- Refuse questions that are not supported by available documents.
- Display a reminder to verify important information from official sources.
- Store imported knowledge locally in a SQLite database.
- Detect duplicate documents.

## What the assistant cannot do

- It does not automatically search the internet.
- It does not know information that has not been imported.
- It cannot guarantee that every document is correct or current.
- It should not make final legal, tax, compliance, medical, security, or financial decisions.
- The testing version should not be published directly on a public website.
- It does not yet provide production user accounts or project-level access isolation.

## Roles

### User

A user asks questions and reviews answers and sources.

### Knowledge administrator

An administrator selects approved documents, imports them, checks their source and date, removes outdated material, and tests the chatbot.

## Starting the application on Windows

1. Install Node.js version 22.5 or newer.
2. Open the ActionPilot folder.
3. Run `Start-ActionPilot.ps1` with PowerShell.
4. During first-time setup, enter the full path of the one folder the application may access.
5. Enter the OpenAI API key when requested.
6. Keep the PowerShell window open while using the application.
7. Open `http://127.0.0.1:4310/knowledge.html` in a browser.

The first start may install a document-reading component automatically.

## Preparing documents

Before importing a document:

1. Confirm that DigiVista has permission to use it.
2. Prefer government, vendor, regulator, or other official sources.
3. Check the publication or updated date.
4. Remove passwords, API keys, customer secrets, personal records, and confidential source code.
5. Confirm that the document belongs in the intended public or internal collection.
6. Use a clear file name that identifies the topic and version.

Do not upload a document merely because it was found online. Check its ownership, reliability, relevance, and current validity first.

## Importing files from the workspace

1. Create a folder named `knowledge` inside the assigned ActionPilot workspace.
2. Copy approved documents into that folder.
3. Open the Knowledge Assistant page.
4. Confirm that the folder field displays `knowledge`.
5. Select **Import documents**.
6. Review the import summary showing imported, duplicate, and failed files.
7. Confirm that imported files appear under **Published documents**.

Supported file types are PDF, TXT, Markdown, CSV, JSON, HTML, and HTM. The current maximum file size is 20 MB per document.

## Adding pasted content

Use **Paste a document** for a short policy, FAQ, operating instruction, or approved extract:

1. Enter a meaningful document title.
2. Add the official source URL when available.
3. Paste the approved text.
4. Select **Save to knowledge**.
5. Confirm that the document appears under **Published documents**.

Do not paste passwords, private credentials, one-time passwords, bank details, or confidential personal information.

## Asking a good question

Ask a specific question using the same terminology found in the documents.

Good examples:

- `How do I create a new asset record?`
- `What documents are required for employee onboarding?`
- `How can a user reset a CRM password?`
- `What is the approved website deployment checklist?`
- `Which source supports this answer?`

Avoid extremely broad questions such as `Tell me everything`.

## Understanding an answer

A normal answer contains:

1. An answer based on retrieved document text.
2. Source references such as `[Source 1]`.
3. The source document title and available update date.
4. A verification disclaimer.

The assistant may use clear wording that differs from the document, but the meaning must be supported by the cited source.

## When information is unavailable

If the knowledge base does not support the question, the assistant should reply that the information was not found and ask the user to contact the DigiVista Infotech team.

The assistant must not guess. A refusal is the correct result when information is missing, unrelated, uncertain, or outside the permitted collection.

## Verifying important information

For government, legal, tax, compliance, security, finance, employment, or regulatory topics:

1. Open the cited source.
2. Check its publication or updated date.
3. Compare it with the latest official government, regulator, or vendor publication.
4. Ask an authorized specialist before making a decision.

The disclaimer does not replace proper professional or official verification.

## Removing an outdated document

1. Find the document under **Published documents**.
2. Select **Remove**.
3. Confirm the removal.
4. Import the new approved version.
5. Ask test questions to confirm the updated answer.

Removing a document from the knowledge database does not delete its original file from the workspace.

## Recommended update process

1. Assign an owner to each document category.
2. Record the source organization and source link.
3. Record the publication or last-updated date.
4. Review important documents on a scheduled basis.
5. Replace or archive outdated versions.
6. Test at least three expected questions after every update.
7. Test at least one unrelated question to confirm that the assistant refuses it.
8. Keep a change record showing what was added, replaced, or removed.

## Troubleshooting

### The page does not open

- Confirm that the PowerShell window is still open.
- Confirm that ActionPilot reports that it is ready.
- Restart `Start-ActionPilot.ps1`.
- Refresh the browser page.

### API key shows “Setup needed”

- Stop the application.
- Confirm that `.env` exists beside `server.mjs`.
- Run the launcher again and complete setup.
- Never paste the API key into a chatbot or commit `.env` to GitHub.

### A document does not import

- Confirm that its file type is supported.
- Confirm that it is smaller than 20 MB.
- Confirm that the document contains readable text.
- A scanned PDF may require OCR before it can be searched.
- Check whether the same content was already imported as a duplicate.

### The answer says information was not found

- Ask a more specific question.
- Use terminology present in the document.
- Confirm that the correct document was imported.
- Confirm that the document contains the expected information.
- Contact the DigiVista team if the information is genuinely unavailable.

### The answer appears incorrect

- Do not act on the answer immediately.
- Check every cited source.
- Confirm the source date and version.
- Remove or replace incorrect documents.
- Report the question, answer, and expected correction to the knowledge administrator.

### The assistant reports a billing or quota error

- Check the OpenAI API project balance and spending limit.
- ChatGPT subscription billing is separate from API billing.
- Ask the API project owner to review the account.

## Data and safety rules

- Import only approved information.
- Keep public and confidential information separate.
- Do not use the local testing interface as a public production website.
- Back up the knowledge database and source documents.
- Restrict administrative document import and removal.
- Never rely only on a prompt to enforce access control.
- Add server-side authentication and project isolation before production use.
- Review activity and unanswered questions regularly.

## Testing checklist

Before accepting a new knowledge set, confirm that:

- Expected documents imported successfully.
- Duplicate documents were identified.
- Relevant questions return supported answers.
- Source names are displayed.
- Unrelated questions are refused.
- Outdated documents have been removed.
- The disclaimer is visible.
- Important answers match current official information.
- No confidential information appears in public answers.

## Getting additional help

If this guide and the available knowledge documents do not resolve the issue, contact the DigiVista Infotech team. Include the question asked, the displayed answer, the source shown, and a short description of the expected result. Never include passwords, API keys, or other secrets in a support request.
