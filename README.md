# ActionPilot — personal local agent

This is a self-contained app intended for its own private GitHub repository. It is not connected to the DigiVista website code.

For simple setup instructions, example IT and operations tasks, and troubleshooting, read [HOW-TO-USE.md](HOW-TO-USE.md).

For end-user and knowledge-administrator training, read [DigiVista Knowledge Assistant User Help Center](docs/USER-HELP-CENTER.md). This guide is automatically added to the local knowledge database so the chatbot can answer questions about its own operation.

## Fast start on Windows

1. Install Node.js 22.5 or newer.
2. Double-click `Start-ActionPilot.ps1`, or right-click it and choose **Run with PowerShell**.
3. On the first run, enter the full path of the one folder the app may access and your OpenAI API key.
4. Open <http://127.0.0.1:4310>.

The launcher installs the required document-reading package automatically on the first run. Future starts reuse it.

## One-folder guarantee

Every file path is converted to an absolute path and checked against the configured folder before an action runs. Absolute paths and paths that escape through `..` are rejected. The configured folder itself cannot be deleted. To change the allowed folder, edit `ACTIONPILOT_WORKSPACE` in `.env` while the app is stopped.

## Safeguards

- The app listens only on your computer (`127.0.0.1`).
- The API key stays on the local server and `.env` is excluded from Git.
- No general-purpose command shell is available.
- Program execution, deletion, and opening a website always require approval.
- Cautious mode requires approval for every file change.
- Limits cover file size, traversal depth, output size, action count, and execution time.
- **Emergency stop** prevents additional agent actions.

## Put it in a separate private GitHub repository

Move the complete `ActionPilot` folder outside this website repository first. Then create a new private repository for that folder. Never commit `.env`; it contains your API key.

The app uses OpenAI's Responses API and function tools. API usage is billed separately from a ChatGPT subscription.

## Knowledge Assistant (testing version)

Open <http://127.0.0.1:4310/knowledge.html> after starting ActionPilot.

The Knowledge Assistant can:

- Store approved document text in a local SQLite database.
- Import PDF, TXT, Markdown, CSV, JSON, and HTML files from a `knowledge` folder inside the allowed workspace.
- Accept pasted documents with an optional official source URL.
- Search only the published `public` collection.
- Generate answers only from retrieved document excerpts.
- Display document sources and a verification disclaimer.
- Refuse unrelated questions and direct the user to the DigiVista team.
- Detect duplicate documents using a content hash.

Create a `knowledge` folder inside the assigned workspace, place test documents in it, and select **Import documents**. The current interface is for local testing only. Do not publish it on the internet yet: admin authentication, project isolation, rate limiting, and production security controls are planned for the hosted phase.
