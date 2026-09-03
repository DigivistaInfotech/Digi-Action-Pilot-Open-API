# How to Use Digi Action Pilot

This guide explains how to use Digi Action Pilot for personal IT and operations work. The app follows natural-language instructions, but it can access only the single folder you assign during setup.

## What you need

- A Windows computer
- Node.js version 20 or newer
- An OpenAI API key with API billing enabled
- One dedicated folder that ActionPilot is allowed to access

Your ChatGPT subscription and OpenAI API billing are separate. Set a small hard API spending limit in the OpenAI Platform if you want strict cost control.

## First-time setup

1. Create a dedicated working folder, for example `C:\Digi-Action-Workspace`.
2. Open the ActionPilot folder.
3. Right-click `Start-ActionPilot.ps1` and select **Run with PowerShell**.
4. Enter the full path of the dedicated working folder.
5. Enter your OpenAI API key when requested.
6. Keep the PowerShell window open.
7. Open `http://127.0.0.1:4310` in your browser.
8. Confirm that **API key** displays **Configured**.

ActionPilot cannot access files outside the assigned folder. To work on a project, place or clone that project inside the assigned folder.

## Normal daily use

1. Start ActionPilot with `Start-ActionPilot.ps1`.
2. Choose a safety mode.
3. Describe one clear outcome in the message box.
4. Review any approval request carefully.
5. Select **Approve action** only when the displayed action is expected.
6. Review the Activity panel and the final response.
7. Press **Emergency stop** if the agent starts an unexpected sequence.
8. Close the PowerShell window when finished.

## Safety modes

### Balanced

Reading and normal file changes run automatically. Deletion, program execution, and opening websites always require approval.

### Cautious

Every file change requires approval. Use this mode when working with important production files.

## Example IT tasks

Copy and adapt these instructions:

- `Inspect this Node.js project, identify build problems, and create a report named IT-REVIEW.md. Do not change source files.`
- `Read package.json and the project documentation. Prepare a safe testing checklist in TESTING-CHECKLIST.md.`
- `Run the existing test command. Summarize failures and propose fixes before changing any code.`
- `Review configuration files for exposed passwords, API keys, or unsafe defaults. Do not display secret values; report only file names and recommended actions.`
- `Organize the log files by month and create LOG-INDEX.md. Do not delete anything.`
- `Create a backup copy of config.json named config.backup.json before making the requested configuration change.`
- `List all files larger than expected and create STORAGE-REVIEW.md.`

## Example operations tasks

- `Create an asset inventory CSV template with columns for asset ID, category, manufacturer, model, serial number, assigned employee, location, purchase date, warranty date, status, and notes.`
- `Review all asset CSV files and prepare a summary showing active, spare, repair, and retired totals.`
- `Create a monthly operations checklist in MONTHLY-OPERATIONS.md.`
- `Organize invoices into year and month folders. Show the planned moves and ask before changing anything.`
- `Create a vendor register template with contact, service, contract start, renewal date, owner, cost, and status fields.`
- `Find warranties expiring within 60 days from the inventory data and create WARRANTY-ACTIONS.md.`
- `Create a handover checklist for an employee's assigned assets. Do not delete or modify the inventory.`

## Recommended instruction for project work

Use this when you want the agent to complete a longer technical task:

> Work autonomously inside this project until it is reviewed and tested. Inspect the repository first, make reasonable technical decisions, fix build errors and failing tests, and rerun verification after significant changes. Preserve existing work. Do not delete data, publish, deploy, purchase services, expose secrets, or change external systems without my approval. Ask only when a required business decision, credential, external access, or destructive action is unavoidable. Finish with a verification report.

## GitHub projects

ActionPilot can run approved `git` commands inside its assigned folder. It does not automatically receive instructions from the ChatGPT or Codex application.

For safer GitHub work:

1. Use a separate private repository for each important project.
2. Keep `.env`, passwords, private keys, database exports, and customer data out of Git.
3. Ask ActionPilot to show `git status` before committing.
4. Review changed files before approving a commit or push.
5. Never approve a force-push or history-rewrite command unless you fully understand its impact.

## What ActionPilot cannot currently do

- It cannot use your ChatGPT Pro allowance as API credit.
- It cannot automatically read this Codex conversation.
- It cannot access folders outside the assigned workspace.
- It cannot safely guarantee that generated code has no defects.
- It cannot connect to Outlook, Google Calendar, accounting systems, or other services without a separate integration.

## Common problems

### API key shows “Setup needed”

Stop ActionPilot, confirm that `.env` exists beside `server.mjs`, and run `Start-ActionPilot.ps1` again. Never paste the API key into chat or commit `.env` to GitHub.

### “Failed to fetch”

The local server may have stopped. Check that the PowerShell window is still open, restart ActionPilot, and refresh the browser. Also confirm that your computer can reach the OpenAI API.

### An API billing or quota error appears

Check the API project balance and spending limit in the OpenAI Platform. ChatGPT Pro billing does not cover API requests.

### The requested file cannot be found

Confirm that the file is inside the one assigned workspace folder. ActionPilot intentionally rejects all other paths.

## Before approving an action

Check these four points:

1. The displayed file or folder is the intended target.
2. The action does not reveal a password, API key, or customer information.
3. A backup exists before replacing important data.
4. You understand any program or Git command being requested.
