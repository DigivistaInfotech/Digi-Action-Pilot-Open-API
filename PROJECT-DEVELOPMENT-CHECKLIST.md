# DigiVista Knowledge Assistant — Development and Launch Checklist

## 1. What we are building

The goal is a central DigiVista knowledge assistant that answers users from approved documents only. An administrator will upload or paste product guides, policies, procedures, FAQs, and other verified material. Each website or application chatbot will be restricted to its own project knowledge.

The completed system will:

- Give fast, consistent help from the latest approved documents.
- Show the source document, source link, and update date with answers.
- Refuse unsupported questions instead of inventing an answer.
- Direct the user to the DigiVista team when the answer is unavailable or uncertain.
- Keep public, internal, project, customer, and confidential information separated.
- Let the same central platform support the DigiVista website, CRM, HRM, DigiVault Warden, vulnerability-management products, and future applications.
- Reduce repeated support work while preserving Codex as the development tool.

## 2. Important boundaries

- This is a knowledge and support assistant, not an unrestricted internet chatbot.
- It must answer only from content approved for the active project and audience.
- A disclaimer does not replace access control, source verification, or regular document review.
- The browser must never connect directly to the document database. It sends a question to the backend, and the backend applies permissions and returns the controlled answer.
- Private source code, secrets, credentials, customer data, raw database exports, and confidential project files must not be imported into a public collection.
- ChatGPT subscriptions and OpenAI API billing are separate. API calls require a separately funded API account.

## 3. Current status

### Completed in the local testing version

- [x] Local ActionPilot application with one-folder access restriction
- [x] Balanced and Cautious safety modes
- [x] Approval workflow, activity history, and emergency stop
- [x] Local SQLite knowledge database
- [x] PDF, TXT, Markdown, CSV, JSON, and HTML import
- [x] Pasted-text import with source metadata
- [x] Duplicate-content detection
- [x] Full-text document search and excerpt retrieval
- [x] Answers constrained to retrieved document excerpts
- [x] Source citations and verification disclaimer
- [x] Refusal when the knowledge base does not contain a reliable answer
- [x] Separate project collections
- [x] Customer chatbot route locked to the selected project
- [x] Basic per-client rate limiting
- [x] Built-in help documentation available to the chatbot
- [x] Automated tests for import, duplicate checks, updates, project isolation, search, deletion, and refusal
- [x] Windows launcher and local setup documentation

### Current maturity

The existing build is an MVP for local testing. It is **not yet approved for public internet use or confidential customer data**. Authentication, production authorization, hosting, governance, monitoring, and security hardening remain to be completed.

## 4. Knowledge and service structure

| Assistant | Intended users | Permitted knowledge | Example route |
|---|---|---|---|
| DigiVista website assistant | Public visitors | Approved public company, service, policy, and contact documents | `/chat?project=public` |
| CRM assistant | CRM customers or staff | Approved CRM how-to guides and FAQs | `/chat?project=crm` |
| HRM assistant | Authorized HRM customers or staff | Approved HRM user guides and policies | `/chat?project=hrm` |
| DigiVault Warden assistant | Authorized product users | Approved product instructions and troubleshooting | `/chat?project=digivault-warden` |
| Vulnerability assistant | Authorized product users | Approved usage and remediation guidance | `/chat?project=vulnerability` |
| Internal operations assistant | DigiVista employees | Approved internal SOPs, IT etiquette, accounting, HR, and operations guides | `/chat?project=internal` |

Routes are convenient identifiers, not security controls. The production backend must verify the signed-in user's organization, project, and permissions on every request.

## 5. Complete implementation checklist

### Phase A — Confirm requirements and ownership

- [ ] Confirm the official product name and branding
- [ ] Nominate a product owner
- [ ] Nominate a technical owner
- [ ] Nominate a content approver for every project
- [ ] List the first projects to launch
- [ ] Define public, employee-only, customer-only, and confidential classifications
- [ ] Define the support email, phone number, or ticket link used when the bot refuses
- [ ] Define supported languages for the first release
- [ ] Agree what the assistant must never answer
- [ ] Agree retention periods for documents, chat logs, analytics, and audit records

**Exit condition:** owners, first projects, audiences, escalation contact, and data classifications are documented and approved.

### Phase B — Prepare and govern the documents

- [ ] Create an approved document inventory for every project
- [ ] Record document title, owner, project, audience, source, version, review date, and expiry date
- [ ] Remove passwords, API keys, personal data, customer data, and confidential implementation details
- [ ] Separate public content from internal and customer content
- [ ] Confirm permission or licence to reuse material downloaded from the internet
- [ ] Prefer government, regulator, vendor, and other authoritative sources
- [ ] Store the official source URL for externally sourced information
- [ ] Review documents for accuracy, duplication, and contradictions
- [ ] Convert scanned PDFs with OCR or replace them with searchable files
- [ ] Create concise product FAQs and how-to guides where source documents are unclear
- [ ] Assign a regular review schedule and expiry rule
- [ ] Define draft, review, approved, published, expired, archived, and rejected states

**Exit condition:** the launch collection contains only readable, approved, classified, current, and attributable documents.

### Phase C — Local functional testing

- [ ] Start ActionPilot with the Windows launcher
- [ ] Confirm the assigned workspace is the intended test folder
- [ ] Create each planned test project in the administrator page
- [ ] Import a small approved document set for each project
- [ ] Confirm PDF and text extraction is readable
- [ ] Ask at least 20 known-answer questions per project
- [ ] Confirm every supported answer matches its source
- [ ] Confirm the displayed title, link, and date are correct
- [ ] Ask questions that are not present in the documents
- [ ] Confirm the assistant refuses and displays the DigiVista contact instruction
- [ ] Ask one project's question in another project's chatbot
- [ ] Confirm no cross-project information is returned
- [ ] Import a duplicate and confirm it is detected
- [ ] Replace a document and confirm the old version no longer answers
- [ ] Delete a test document and confirm it is no longer searchable
- [ ] Test Hindi, English, spelling mistakes, and short questions
- [ ] Record incorrect, incomplete, or confusing responses for improvement
- [ ] Run `npm run check`, `npm test`, and `npm audit --omit=dev`

**Exit condition:** all automated tests pass and content owners accept the test answers for the pilot collections.

### Phase D — Improve retrieval and answer quality

- [ ] Define a minimum confidence rule for answering versus refusing
- [ ] Add semantic retrieval or hybrid keyword-plus-vector retrieval if keyword search is insufficient
- [ ] Add reranking for large knowledge collections
- [ ] Add OCR processing for scanned PDFs
- [ ] Preserve page, section, and heading references where possible
- [ ] Detect conflicting sources and refuse or show the conflict
- [ ] Prefer the newest approved version of a document
- [ ] Prevent instructions inside uploaded documents from changing system behaviour
- [ ] Add standard response style, length, language, and terminology rules
- [ ] Require citations for every factual answer
- [ ] Add a visible “Was this helpful?” feedback control
- [ ] Create a reviewed benchmark set of questions and expected answers
- [ ] Measure answer accuracy, citation accuracy, refusal accuracy, and leakage rate

**Exit condition:** the agreed quality thresholds pass on the benchmark set without cross-project or unsupported answers.

### Phase E — Administrator and publishing workflow

- [ ] Add secure administrator sign-in
- [ ] Add roles such as uploader, reviewer, publisher, auditor, and system administrator
- [ ] Require approval before a document becomes searchable
- [ ] Provide project, audience, customer, language, and classification fields
- [ ] Show extraction preview before publishing
- [ ] Support document version history and rollback
- [ ] Prevent silent overwrites of approved material
- [ ] Notify owners before a document expires
- [ ] Provide archive and restore actions
- [ ] Record who uploaded, reviewed, approved, published, changed, or removed content
- [ ] Provide a source inventory and missing-metadata report
- [ ] Provide unanswered-question and low-confidence reports

**Exit condition:** no document reaches a user-facing chatbot without an authenticated, auditable approval step.

### Phase F — Authentication and information isolation

- [ ] Keep the public assistant limited to public documents
- [ ] Require login for employee and customer assistants
- [ ] Integrate the chosen identity provider or application login
- [ ] Map every user to an organization, tenant, project, and role
- [ ] Enforce access in backend database queries, not only in prompts or URLs
- [ ] Use separate tenant identifiers for customer data
- [ ] Prevent a user from selecting or guessing another project or tenant
- [ ] Add session expiry, logout, password policy, and account-lock controls
- [ ] Apply least-privilege service and database accounts
- [ ] Encrypt traffic with HTTPS
- [ ] Encrypt sensitive stored data and backups
- [ ] Test horizontal and vertical privilege escalation
- [ ] Test cross-project and cross-customer data leakage

**Exit condition:** independent security testing confirms that unauthorized users cannot read, search, infer, or cite restricted knowledge.

### Phase G — Central server and database

- [ ] Select a hosting provider and deployment region
- [ ] Select a production database suited to concurrent users
- [ ] Separate development, testing, staging, and production environments
- [ ] Store secrets in a secure secrets manager
- [ ] Configure HTTPS certificates and domain names
- [ ] Restrict database network access to backend services
- [ ] Add database migrations and controlled deployment scripts
- [ ] Add automated encrypted backups
- [ ] Test full backup restoration
- [ ] Define recovery time and recovery point objectives
- [ ] Add safe file storage for original approved documents
- [ ] Add antivirus or malware scanning for uploads
- [ ] Set file size, type, and processing limits
- [ ] Add queueing for large imports
- [ ] Document deployment and rollback procedures

**Exit condition:** staging operates from the hosted backend, and a tested backup can restore the database and document store.

### Phase H — Website and product integration

- [ ] Create a reusable chat widget or link
- [ ] Apply DigiVista branding and accessibility standards
- [ ] Configure each application with a fixed project identity
- [ ] Pass authenticated user and tenant context securely from the application
- [ ] Do not expose database credentials, API keys, or internal project IDs in browser code
- [ ] Display assistant identity and knowledge scope
- [ ] Display citations, document dates, and official links
- [ ] Display the verification disclaimer on answers
- [ ] Display the DigiVista escalation route on refusal
- [ ] Add loading, timeout, offline, retry, and service-unavailable states
- [ ] Add privacy notice and consent where required
- [ ] Test desktop, mobile, and supported browsers
- [ ] Make the widget keyboard accessible and screen-reader friendly

**Exit condition:** each website or product can access only its assigned assistant, with an understandable and accessible user experience.

### Phase I — Security and abuse protection

- [ ] Complete a threat model for public, employee, and customer use
- [ ] Add security headers and strict CORS rules
- [ ] Add request validation and output encoding
- [ ] Add per-user, per-IP, and per-tenant rate limits
- [ ] Add upload scanning and safe file-name handling
- [ ] Protect against prompt injection and document-based instructions
- [ ] Prevent secrets and internal configuration from appearing in errors
- [ ] Redact sensitive data from logs
- [ ] Add abuse detection and temporary blocking
- [ ] Keep dependencies patched and scanned
- [ ] Run static analysis and dependency vulnerability checks
- [ ] Perform application and API penetration testing
- [ ] Create an incident response and credential-rotation procedure

**Exit condition:** critical and high-risk findings are resolved, and remaining risks are documented and accepted by the owner.

### Phase J — Privacy, legal, and compliance

- [ ] Publish a privacy notice describing chat data and retention
- [ ] Publish terms and a clear AI-assistance disclaimer
- [ ] Define whether conversations are stored and who can view them
- [ ] Collect only the minimum necessary user information
- [ ] Provide deletion and correction processes where required
- [ ] Confirm data location and processor agreements
- [ ] Review copyright and reuse rights for imported internet material
- [ ] Link to official sources for legal, regulatory, tax, security, or government guidance
- [ ] Route high-risk questions to a qualified person or official source
- [ ] Record consent and lawful basis where applicable
- [ ] Complete legal review before public launch

**Exit condition:** the approved privacy, retention, copyright, disclaimer, and escalation policies match the implemented system.

### Phase K — Monitoring, analytics, and support

- [ ] Add uptime and health monitoring
- [ ] Add application error reporting without sensitive content
- [ ] Monitor response time, failure rate, refusal rate, and token usage
- [ ] Track unanswered and low-confidence questions
- [ ] Track helpful and unhelpful feedback by project
- [ ] Alert on repeated authorization failures or unusual traffic
- [ ] Maintain an immutable security and publishing audit trail
- [ ] Create a support runbook and escalation matrix
- [ ] Assign owners for outages, bad answers, stale content, and security incidents
- [ ] Create a service-status message for planned or unplanned downtime
- [ ] Schedule monthly content and analytics reviews

**Exit condition:** the team can detect a failure, identify its owner, investigate it, and restore service using documented procedures.

### Phase L — Cost control

- [ ] Select the appropriate AI model for answer quality and cost
- [ ] Set an API project budget and usage alerts
- [ ] Set per-user and per-tenant request limits
- [ ] Limit retrieved text and answer length
- [ ] Cache safe repeated public answers where appropriate
- [ ] Monitor cost by project and customer
- [ ] Prevent test environments from using production budgets
- [ ] Define behaviour when the budget or quota is reached
- [ ] Review hosting, database, storage, backup, monitoring, and API costs monthly

**Exit condition:** monthly limits, alerts, owners, and shutdown/fallback behaviour are tested and documented.

### Phase M — Acceptance and launch

- [ ] Complete functional acceptance testing
- [ ] Complete content-owner acceptance testing
- [ ] Complete performance and load testing
- [ ] Complete security and privacy review
- [ ] Complete accessibility and browser testing
- [ ] Confirm backup and rollback tests
- [ ] Train administrators, reviewers, support staff, and application owners
- [ ] Publish user help and administrator help
- [ ] Launch one low-risk pilot project first
- [ ] Observe the pilot and correct issues before wider rollout
- [ ] Obtain formal go-live approval
- [ ] Launch public, internal, and customer assistants in controlled stages
- [ ] Perform a post-launch review after the agreed pilot period

**Exit condition:** signed go-live approval exists, pilot evidence is accepted, and operational ownership is active.

### Phase N — Ongoing operation

- [ ] Review unanswered questions weekly during the pilot
- [ ] Review expired and soon-to-expire documents monthly
- [ ] Re-run the answer benchmark after model, prompt, retrieval, or content changes
- [ ] Apply security updates on a defined schedule
- [ ] Restore a backup in a test environment at least quarterly
- [ ] Review user and administrator access regularly
- [ ] Review costs and usage by project monthly
- [ ] Archive unused projects and documents safely
- [ ] Record product changes in the appropriate help collection before release
- [ ] Perform periodic security, privacy, and content audits

## 6. Minimum test scenarios before any public pilot

- [ ] Correct answer from one approved source
- [ ] Correct answer synthesized from multiple approved sources
- [ ] Citation opens the intended source
- [ ] Old and new versions exist; only the approved current version is used
- [ ] No answer exists; assistant refuses and provides the contact route
- [ ] User requests general knowledge outside the collection; assistant refuses
- [ ] Malicious question asks the assistant to ignore its rules; assistant refuses
- [ ] Uploaded document contains malicious instructions; instructions are treated as content, not commands
- [ ] CRM user asks for HRM information; no HRM information is disclosed
- [ ] Customer A asks for Customer B information; no information is disclosed
- [ ] Public user guesses an internal project route; access is denied
- [ ] User enters personal or secret information; safe handling guidance is shown and logs are protected
- [ ] API provider is unavailable; a controlled service message appears
- [ ] Database is unavailable; no raw technical or secret information appears
- [ ] Rate limit is exceeded; a clear retry message appears
- [ ] Document expires; it is removed from answers or clearly blocked pending review
- [ ] Backup is restored and produces the expected projects and documents

## 7. Definition of done

The product is complete for production only when:

- Every answer is restricted by authenticated project, tenant, audience, and document status.
- Unsupported answers are refused consistently.
- Citations and document dates are visible and accurate.
- Public, internal, and customer information cannot leak between collections.
- Documents follow an auditable review and publishing workflow.
- Security, privacy, backup, cost, monitoring, and support controls are operational.
- Administrators and support staff have been trained.
- A pilot has passed agreed quality and security thresholds.
- The product owner has approved production launch.

## 8. Recommended next actions

1. Test the current local MVP with a small, non-confidential document set.
2. Choose one low-risk pilot project and appoint its content owner.
3. Prepare 20–50 reviewed questions with expected answers for that project.
4. Fix answer quality and document-processing gaps found during local testing.
5. Build secure administrator authentication and the approval/publishing workflow.
6. Build backend-enforced user, project, tenant, and role authorization.
7. Deploy a staging server with backups, monitoring, and HTTPS.
8. Integrate the pilot chatbot into one application and complete security testing.
9. Launch the pilot, measure results, and then add other projects one at a time.

## 9. Expected result

When these phases are complete, DigiVista will have one centrally managed knowledge platform with multiple securely separated chatbots. Users will receive fast product and policy help from approved, current documents; administrators will control what is published; every answer will carry traceable sources and a verification warning; and missing information will be escalated instead of guessed. This should reduce repetitive support work, make project knowledge easier to reuse, and keep confidential information limited to the correct users and applications.
