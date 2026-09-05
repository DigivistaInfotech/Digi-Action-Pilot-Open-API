# Digi ActionPilot Training Guide

## 1. Purpose

Digi ActionPilot is a local assistant for repetitive office and project work. A user describes the required result in normal language. ActionPilot reviews the permitted files, performs available steps, pauses for sensitive actions, and reports what it completed.

ActionPilot may access only the one folder assigned during setup. It does not automatically access email, banking, accounting portals, hosting accounts, Google Workspace, Microsoft 365, or other online services. Each external service requires a separate approved integration.

## 2. Who should use it

- Office administrators
- Accounts and finance support staff
- Website coordinators
- Project coordinators
- IT support staff
- Managers reviewing reports and documentation

Users remain responsible for checking important results and approving sensitive actions.

## 3. Basic operating procedure

1. Place the working files inside the assigned ActionPilot folder.
2. Start ActionPilot using `Start-ActionPilot.ps1`.
3. Confirm that the dashboard shows **Ready** and **API key: Configured**.
4. Select **Cautious** mode for important business records.
5. Enter one clear instruction containing the goal, source files, output, and restrictions.
6. Review each approval request before selecting **Approve action**.
7. Check the Activity panel and inspect every generated or changed file.
8. Keep the final report with the project records.
9. Use **Emergency stop** if an unexpected action appears.

## 4. How to write a good instruction

Include these five items:

1. **Goal:** What result is required?
2. **Source:** Which files or folders should be used?
3. **Output:** What file, format, or report should be created?
4. **Rules:** What must not be changed or disclosed?
5. **Completion check:** How should the result be verified?

Example:

> Review all asset registers in the `Asset-Records` folder. Create `MONTHLY-ASSET-SUMMARY.md` showing total, assigned, spare, repair, and retired assets. Do not change the source files. Identify missing serial numbers and warranty dates. Verify that totals match the source records.

## 5. Automation service catalogue

### A. Office administration

| Service | What ActionPilot can do | Typical output | Approval or review |
|---|---|---|---|
| Document organization | Sort and rename files using agreed rules | Organized folders and file index | Review proposed moves |
| Meeting preparation | Build agendas, checklists, and note templates | Markdown or text documents | Manager reviews content |
| Meeting follow-up | Convert supplied notes into actions and decisions | Action register | Confirm owners and dates |
| Policy documentation | Format supplied procedures into clear guides | Policy or SOP draft | Authorized person approves policy |
| Correspondence drafting | Draft letters, notices, and standard responses | Draft text files | Human sends the message |
| Data cleanup | Standardize supplied names, dates, categories, and labels | Cleaned working file | Compare with original data |
| Register preparation | Create visitor, vendor, document, complaint, or dispatch registers | CSV templates | Confirm required fields |
| Monthly reporting | Summarize supplied operational files | Monthly summary | Manager validates figures |
| Handover preparation | Create role, employee, or department handover checklists | Handover document | Department head approves |
| Record indexing | Create a searchable list of documents and locations | File index | Check confidential classifications |

Example instructions:

- `Organize the documents in Incoming by department and month. Show the proposed structure before moving files.`
- `Create a weekly office operations checklist covering attendance, visitors, couriers, supplies, maintenance, and pending approvals.`
- `Review the supplied meeting notes and create an action register with action, owner, due date, dependency, and status.`

### B. Accounting support

ActionPilot supports accounting preparation and checking. It should not independently approve payments, post final journal entries, file taxes, or submit statutory reports.

| Service | What ActionPilot can do | Typical output | Required control |
|---|---|---|---|
| Invoice organization | Sort invoice files by vendor, year, or month | Organized invoice folders | Preserve originals |
| Invoice register | Extract supplied invoice details into a register | CSV or Markdown register | Accountant verifies every amount |
| Expense classification | Group supplied expenses by agreed categories | Draft expense summary | Accountant approves classification |
| Vendor register | Create and maintain vendor information templates | Vendor register | Do not store banking secrets unnecessarily |
| Payment preparation | Create a list of invoices due from supplied records | Payment-due report | Authorized person approves and pays |
| Reconciliation support | Compare two supplied exports and identify differences | Exception report | Accountant completes reconciliation |
| Aging analysis | Group receivables or payables by age bands | Aging summary | Verify source dates and balances |
| Purchase tracking | Summarize purchase orders and invoice status | Purchase status report | Procurement and accounts review |
| Budget comparison | Compare supplied budget and actual figures | Variance report | Finance owner explains variances |
| Audit preparation | Organize evidence and create document indexes | Audit evidence index | Restrict confidential information |
| Missing-data checks | Identify missing invoice numbers, dates, tax fields, or approvals | Data-quality report | Correct only from verified evidence |

Example instructions:

- `Review the invoice CSV files and create a vendor-wise summary. Flag duplicate invoice numbers and missing dates. Do not alter source files.`
- `Compare bank-export.csv and ledger-export.csv using date, reference, and amount. Create a reconciliation exception report; do not make accounting entries.`
- `Create a payment-due report for the next seven days. Include invoice number, vendor, amount, due date, and approval status. Do not initiate payments.`

Accounting safety rules:

- Never share banking passwords, PINs, OTPs, signing certificates, or complete card details.
- Never rely on AI output as final tax, legal, or statutory advice.
- Require two-person review for payments and bank-detail changes.
- Retain original exports and documents before cleaning or restructuring data.
- Verify totals, tax calculations, currency, dates, and duplicate records manually.

### C. Website work

| Service | What ActionPilot can do | Typical output | Approval or review |
|---|---|---|---|
| Content inventory | List pages, articles, images, and documents | Website content register | Content owner reviews |
| Broken-reference review | Search supplied code for missing local files or links | Issue report | Developer validates findings |
| Content drafting | Prepare page copy, FAQs, metadata, and calls to action | Draft content files | Marketing or legal approval |
| Accessibility review | Check supplied markup for common accessibility issues | Accessibility checklist | Manual and browser testing required |
| SEO preparation | Draft titles, descriptions, headings, and keyword maps | SEO worksheet | Avoid misleading claims |
| Build verification | Run approved existing build and test commands | Build/test report | Program execution requires approval |
| Code quality support | Review code and propose or apply bounded fixes | Source changes and summary | Review code diff |
| Asset organization | Rename and group website images and documents | Organized asset folders | Confirm references before renaming |
| Release checklist | Create staging, backup, testing, and rollback checklists | Release checklist | Deployment requires approval |
| Handover documentation | Document setup, structure, commands, and known issues | Project handover | Technical owner verifies |

Example instructions:

- `Inspect this website project and create WEBSITE-REVIEW.md covering structure, build commands, missing assets, accessibility risks, SEO gaps, and recommended priorities. Do not modify code.`
- `Run the existing test and build commands, fix only confirmed code defects, rerun verification, and create TEST-REPORT.md.`
- `Create a deployment checklist including backup, environment variables, database migration, smoke tests, rollback, and post-release monitoring. Do not deploy.`

Website safety rules:

- Never place API keys, passwords, or private certificates in the repository.
- Back up important files before large changes.
- Review source changes before committing.
- Require approval before dependency installation, Git pushes, deployment, DNS changes, or production updates.
- Test on a local or staging environment before production.

### D. Project work

| Service | What ActionPilot can do | Typical output | Approval or review |
|---|---|---|---|
| Project initiation | Create charter, scope, assumptions, and stakeholder templates | Project initiation pack | Sponsor approves scope |
| Work planning | Break requirements into tasks, phases, and milestones | Work plan | Project manager confirms priorities |
| Requirements register | Organize supplied business and technical requirements | Requirements document | Business owner validates |
| Risk management | Create risk, issue, assumption, and dependency registers | RAID register | Owners and mitigations confirmed |
| Status reporting | Summarize supplied progress records | Weekly status report | Project manager checks status |
| Testing support | Create test plans, run approved tests, and report results | Test plan and test report | Business acceptance remains manual |
| Defect tracking | Structure defects by severity, owner, and status | Defect register | Team confirms severity |
| Change control | Prepare change-request and impact-analysis templates | Change request | Authorized change approval required |
| Documentation | Create SOPs, technical notes, and handover packs | Project documents | Subject-matter review required |
| Closure | Create closure checklist, lessons learned, and pending-actions list | Closure report | Sponsor accepts closure |

Example instructions:

- `Review the project documents and create a phased work plan with tasks, dependencies, owners, acceptance criteria, and risks. Mark unknown information as TBD instead of inventing it.`
- `Create a weekly project status report from the supplied notes. Include completed work, next steps, risks, issues, decisions required, and overdue actions.`
- `Inspect the repository, run the existing automated tests, fix confirmed defects, rerun tests, and create a final verification report. Do not deploy or push changes without approval.`

## 6. Tasks requiring human approval

Always require approval for:

- Deleting or permanently replacing important files
- Running programs or installation commands
- Committing or pushing code to GitHub
- Publishing or deploying a website
- Sending email or messages
- Changing user access or permissions
- Processing or authorizing payments
- Changing vendor bank information
- Filing tax or statutory submissions
- Signing contracts or accepting legal terms
- Entering credentials, OTPs, or digital signatures
- Connecting a new external service

## 7. Services that need additional integration

These services are not available through the basic one-folder version. They can be added later with separate authorization and controls:

- Microsoft Outlook and Exchange
- Microsoft Word, Excel, SharePoint, OneDrive, and Teams
- Gmail, Google Drive, Google Calendar, Docs, and Sheets
- Tally, Zoho Books, QuickBooks, Xero, or other accounting platforms
- Banking and payment platforms
- CRM and help-desk platforms
- GitHub, GitLab, or Azure DevOps automation beyond approved local Git commands
- Hosting panels, cloud providers, domain registrars, and DNS services
- WhatsApp, Slack, or other messaging platforms

Each integration should use the minimum necessary permissions, keep an audit log, and require approval for external changes.

## 8. Training exercises

### Exercise 1: Safe document review

1. Place three sample documents in a training folder.
2. Select **Cautious** mode.
3. Ask ActionPilot to create an index without changing originals.
4. Confirm that the result contains all three documents.

### Exercise 2: Asset inventory template

1. Ask ActionPilot to create an asset inventory CSV template.
2. Review the columns and add two sample assets.
3. Ask it to create a status summary.
4. Confirm the summary against the sample records.

### Exercise 3: Website test report

1. Place a non-production test project in the assigned folder.
2. Ask ActionPilot to identify the documented build and test commands.
3. Review the program-execution approval request.
4. Approve only the expected command.
5. Check the test report and Activity history.

## 9. Supervisor checklist

Before allowing regular use, confirm that:

- The assigned workspace contains no unnecessary confidential files.
- The user understands Balanced and Cautious modes.
- The user can recognize unsafe approval requests.
- API spending limits and alerts are configured.
- Backups exist for important business records.
- Accounting outputs receive qualified human review.
- Website deployments and Git pushes require authorization.
- External integrations follow least-privilege access.
- The user knows how to activate Emergency stop.

## 10. Final operating rule

Use ActionPilot to prepare, organize, compare, document, test, and report. Keep people responsible for approvals, payments, production changes, statutory work, external communication, and final business decisions.
