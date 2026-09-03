# ActionPilot — personal local agent

This is a self-contained app intended for its own private GitHub repository. It is not connected to the DigiVista website code.

For simple setup instructions, example IT and operations tasks, and troubleshooting, read [HOW-TO-USE.md](HOW-TO-USE.md).

## Fast start on Windows

1. Install Node.js 20 or newer.
2. Double-click `Start-ActionPilot.ps1`, or right-click it and choose **Run with PowerShell**.
3. On the first run, enter the full path of the one folder the app may access and your OpenAI API key.
4. Open <http://127.0.0.1:4310>.

There are no packages to install. Future starts reuse the saved settings.

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
