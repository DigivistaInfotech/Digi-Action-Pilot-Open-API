# DigiVista Knowledge Assistant — Feasibility and Decision Plan

## Executive summary

This project is useful if DigiVista repeatedly answers the same product, policy, IT, HR, accounting-process, website, or operations questions. It converts approved documents into a controlled help service that can be placed on the DigiVista website and inside individual products.

It should **not** replace Codex, employees, accountants, security specialists, or legal advisers. Codex remains the development tool. The Knowledge Assistant becomes the controlled support layer for end users.

The recommended decision is to continue only with a small local pilot first. Do not pay for full hosting or production development until the pilot proves that users can get accurate answers and that it saves real support time.

## What problem it solves

Today, useful information can be spread across PDFs, project documentation, GitHub files, operating procedures, and staff knowledge. Users may repeatedly ask the same questions, while staff must search, verify, and explain the same steps again.

The proposed assistant creates one governed knowledge service:

1. An administrator imports an approved document.
2. The document is assigned to a project and audience.
3. The server extracts and indexes the text.
4. A user asks a question through the relevant website or application chatbot.
5. The backend searches only the knowledge permitted for that user and project.
6. The AI prepares an answer only from those excerpts.
7. The answer displays its sources and verification warning.
8. If evidence is missing, the assistant refuses and directs the user to DigiVista support.

## How it will help

### Customer and product support

- Provides help at any time without waiting for a staff response.
- Answers common “how do I use this?” questions consistently.
- Sends difficult or unsupported questions to the correct support channel.
- Gives every product its own restricted help assistant.

### Office and operations work

- Makes approved SOPs, IT etiquette, asset processes, onboarding instructions, and internal policies searchable.
- Reduces time spent locating the latest document.
- Preserves organizational knowledge when responsibilities change.
- Helps train new employees using the same approved material.

### Accounting-process support

- Can explain approved internal procedures such as invoice submission, expense documentation, approval flow, vendor onboarding, and due-date processes.
- Can provide links to the current form or procedure.
- Must not give unverified accounting, tax, legal, or investment advice; those questions should point to the responsible professional or official source.

### Website and project work

- Provides public information about DigiVista services and policies.
- Provides project-specific user help without exposing other projects.
- Turns reviewed release notes and user guides into searchable support knowledge.
- Creates a report of unanswered questions, showing which documentation should be improved.

### Management value

- Central ownership and version control for help information.
- Measurable data on common questions, gaps, feedback, and usage.
- Consistent disclaimers, citations, and escalation.
- A reusable platform: new products require a new protected collection, not a completely separate chatbot system.

## What it will not do

- It will not automatically make every uploaded document correct or safe.
- It will not guarantee that AI responses are error-free.
- It will not safely publish an entire private GitHub repository without review.
- It will not use ChatGPT Pro credits for API responses.
- It will not execute customer actions in CRM, HRM, accounting, or other systems in the initial version.
- It will not replace authentication, permissions, document governance, or human review.
- It will not provide authoritative professional advice merely because a disclaimer is displayed.

## Recommended first pilot

Use one low-risk project with non-confidential documents. A public product help guide or internal training guide is preferable to financial, HR-personal, security-sensitive, or customer-confidential material.

### Pilot inputs

- 5–20 approved and current documents
- One named content owner
- One clearly defined audience
- 20–50 test questions with expected answers
- A DigiVista support contact for refused questions
- No passwords, personal data, customer records, or private source code

### Pilot duration

Run local testing until the content owner has reviewed all benchmark answers. Then conduct a limited user pilot before approving hosted production work.

## Success measures

Set the exact targets before starting. Suggested pilot measures are:

| Measure | Suggested pilot target |
|---|---:|
| Expected questions answered correctly | At least 85% |
| Answers with correct supporting citations | 100% |
| Unsupported questions correctly refused | At least 95% |
| Cross-project information leakage | 0 cases |
| Critical factual or security errors | 0 cases |
| Users rating the answer helpful | At least 75% |
| Reduction in repeated support handling time | Demonstrable during pilot |

These are proposed planning targets, not a claim about the present MVP. DigiVista should adjust them to the risk of each project.

## Cost and resource areas

The software can be tested locally with minimal infrastructure cost. A production service will have recurring costs in these areas:

- AI API usage for generating answers
- Hosting for the backend service
- Production database and document storage
- Backup and disaster recovery storage
- Domain, HTTPS, monitoring, and error reporting
- Development and security testing
- Staff time for document review and updates
- Support and maintenance after launch

The largest hidden cost is normally content ownership: outdated or poorly organized documents will produce poor assistance even if the software is strong. API spending can be controlled with monthly budgets, rate limits, short retrieved context, answer-length limits, and usage reporting by project.

Do not purchase a large server initially. Measure question volume and answer cost during the pilot, then size production hosting from evidence.

## Options

### Option 1 — Drop the project now

Choose this if repeated support questions are rare, documents have no clear owner, or the team cannot maintain approved content. Continue using ordinary documents and Codex for development.

### Option 2 — Keep only the local internal tool

Choose this if the team wants searchable internal guides but does not need public or customer access. This avoids most public hosting and customer-isolation work, although internal access and document governance still matter.

### Option 3 — Run a limited pilot — recommended

Use the existing MVP, one project, and approved non-confidential documents. Measure accuracy, usefulness, support time saved, and operating cost. This provides evidence for a go/no-go decision with low risk.

### Option 4 — Build the complete production platform

Choose this only after a successful pilot. This includes central hosting, secure admin publishing, authentication, tenant isolation, application widgets, monitoring, backup, privacy controls, and independent security testing.

## Continue, change, or drop decision

### Continue to production when

- A real repeated-support problem is confirmed.
- A content owner accepts responsibility for every launch collection.
- The pilot meets the agreed answer and refusal targets.
- No project or customer data leaks during testing.
- Users report that the assistant saves time or improves access to help.
- Expected savings or service improvement justify recurring costs.
- DigiVista can fund maintenance, security updates, and content review.

### Change the design when

- Users need document search but not generated answers.
- Most questions require live business data rather than documentation.
- The assistant frequently finds the right document but creates a weak summary.
- Different customers require stronger physical or database separation.
- Scanned or multilingual documents are the main source and require improved extraction.

### Drop or pause when

- Documents are outdated, contradictory, or do not have owners.
- The pilot does not reduce support effort or improve user experience.
- Correct-answer or refusal targets cannot be reached safely.
- Required privacy, licensing, or customer approvals cannot be obtained.
- Security and maintenance costs exceed the demonstrated value.
- The use case requires professional judgement that should remain with a person.

## Practical rollout plan

### Stage 1 — Current local MVP

Use the existing build to import a safe document set, ask benchmark questions, verify citations, test refusal, and confirm project separation.

### Stage 2 — Controlled internal pilot

Add content ownership, a review process, user access, analytics, and feedback. Test with a small employee group.

### Stage 3 — Hosted staging system

Deploy secure authentication, backend authorization, production database, backups, monitoring, and one product integration. Complete privacy and security testing.

### Stage 4 — Limited customer or public pilot

Release one low-risk collection to a limited audience. Monitor answers, refusals, costs, incidents, and support savings.

### Stage 5 — Gradual product expansion

Add CRM, HRM, DigiVault Warden, vulnerability management, and other projects only after each collection has an owner, approved documents, benchmark tests, and access rules.

## Recommendation

Do not drop the idea before testing it, and do not commit to the full production cost yet. The local MVP already provides enough capability to run a meaningful feasibility pilot. Select one low-risk project, prepare approved documents and expected questions, and use the evidence from that pilot to make the investment decision.

Use [PROJECT-DEVELOPMENT-CHECKLIST.md](PROJECT-DEVELOPMENT-CHECKLIST.md) as the detailed execution and production-readiness checklist.
