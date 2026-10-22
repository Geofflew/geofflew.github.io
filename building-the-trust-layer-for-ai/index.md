# Building the trust layer for AI

By Geoffrey Lew

Canonical article: [https://geofflew.github.io/building-the-trust-layer-for-ai/](https://geofflew.github.io/building-the-trust-layer-for-ai/)

An AI agent asked which renewals are at risk this quarter needs to know which records belong to each customer, when the contracts renew, and what the available evidence says about those relationships. A renewal date in the CRM may disagree with the signed contract. A strong customer contact may appear under several names across support records and calls. Bringing those sources together makes the information easier to find, but the answer still depends on resolving those disagreements.

For customer workflows, a trust layer gives that responsibility a clear home. It establishes a consistent account of the customer, records how it reached that account, and carries corrections back to the sources. The design described here combines canonical records, explicit business rules, and human review in a process that can be repeated and checked. Its purpose is to give people and agents answers they can inspect and use without having to reconcile the underlying systems themselves.

## Map the customer

Business systems hold different views of the same relationship. A CRM stores company and commercial records. A support platform tracks problems. Call records capture conversations, a product tracker holds requests, and product events describe usage. Their records were created for different jobs, so joining them does not automatically produce one reliable account of the customer.

This design organizes that account around seven business entities. The first two are customers and people. A customer needs a canonical identity that connects its CRM records, support accounts, and product workspaces. A person needs an identity that connects contact records, call appearances, and email messages. Getting these relationships wrong can duplicate revenue or scatter the evidence of a strong customer relationship across several apparently weak contacts.

The remaining entities describe what customers bought, their conversations, their support needs, their product requests, and their usage. Commercial information draws on deals, contracts, and invoices. Conversations include calls, email, and messaging. A support need remains the same business problem whether it arrived as a ticket or a message. A product request may be recorded in a tracker or raised on a call. These entities let someone ask about the customer without first knowing which application contains the answer.

![Seven customer entities connect source systems to shared readers, with evidence receipts recording source records, rules, decisions, and freshness.](https://geofflew.github.io/assets/trust-layer-1.png)

A generalized customer model, adapted as a field-guide illustration. [View full size ↗](https://geofflew.github.io/assets/trust-layer-1.png)

Each canonical record also needs provenance. Its receipt identifies the source records behind it, the rules and human decisions used to interpret them, and when it was last checked. If part of the evidence is known to be wrong or unresolved, that should remain visible. A unified record is useful only if someone can understand why it deserves confidence.

## Build and check the record

A nightly process provides a practical way to keep this representation current. The sequence is to mirror the sources, clean their records, apply business rules and human decisions, and then correct the sources where necessary. Each stage has a different responsibility.

![Mirror source history, clean records, resolve with rules and review, and correct sources; check freshness, completeness, reconciliation, and fixes at every stage.](https://geofflew.github.io/assets/trust-layer-2.png)

The nightly process, reconstructed as a generalized workflow. [View full size ↗](https://geofflew.github.io/assets/trust-layer-2.png)

The mirror captures source records as they arrive, mistakes included. This Bronze layer remains untouched by later corrections. Durable source history makes it possible to establish what a system said at an earlier point in time and to reconstruct how a later interpretation was reached.

Cleaning produces a second layer, Silver. It standardizes formats and brings scattered fields into one tidy row per source record. Similar records become easier to compare, but they remain separate until there is a reason to join them. Cleaning a contact's name or email format should not silently settle an uncertain identity.

Business rules then resolve cases where the organization has agreed how to interpret the evidence. A signed contract can govern a renewal date. A missing number should remain missing rather than become zero. A shared email address can support an identity match, but the rule must state when that evidence is sufficient and when a person needs to review it. Written rules make these choices explicit and allow them to be applied consistently.

Cases the rules cannot settle go to a single review list. The reviewer examines the evidence and makes a decision that is saved, visible, and reversible. The next rebuild reuses that decision instead of asking someone to resolve the same ambiguity again.

## Resolve one contact

Consider a contact recorded under a full name in the CRM, a shortened name in the support system, and only a first name in call records. The CRM and support entries share an email address. Depending on the agreed identity rule, that may be enough to connect them. The call attendee has no email, and the matching first name and customer leave room for doubt.

A reviewer can inspect the calls and decide whether the attendee is the same person. If the evidence supports the match, the canonical record brings together the aliases and conversations. Its receipt preserves the basis for the join and the human decision behind it. Someone reviewing the record later can examine that judgment rather than inherit an unexplained merge.

![CRM, support, and call records become one contact through an agreed matching rule and human review, preserving a reversible decision and evidence receipt.](https://geofflew.github.io/assets/trust-layer-3.png)

A generalized contact example, adapted as a field-guide illustration. [View full size ↗](https://geofflew.github.io/assets/trust-layer-3.png)

This makes human review a durable input to the system. A nightly rebuild can regenerate derived records while retaining the decisions that required context and judgment. If a decision needs to be reversed, it remains possible to identify and change it.

## Correct the source

The process is incomplete if it repairs only the combined view. An incorrect source record can return on the next sync, while people working in that source continue to see the old information.

Where the evidence is clear and the action is safe, a correction can be automated. For example, a title established in a call may fill a blank CRM field. Uncertain changes and actions that cannot be undone, such as an irreversible company merge, need review by the person responsible for the record. That person should receive the evidence and a specific proposed correction. A later check must establish that the fix actually landed.

This feedback improves the records used in everyday work and gives the next mirror better inputs. It also separates the decision that a source is wrong from the authority to change it.

## Check the answer

A completed nightly job does not establish that its output is trustworthy. Checks need to establish whether the mirror is current, whether cleaning lost records, whether revenue agrees with finance, and whether renewal dates agree with contracts. The system also needs to verify source corrections and examine the answers people receive.

Negative answers deserve particular attention. When an agent says the information is unavailable, the question is whether it is genuinely missing or has been overlooked because of an identity, linkage, or retrieval problem. Known failures should reach the people responsible for the data before others rely on it, and unresolved uncertainty should remain visible in the answer.

Reports, the semantic layer that supports plain-language questions, and agents should read from the same trusted representation. That keeps them from independently resolving the same disagreements in different ways.

The design preserves source history and human decisions so that derived state can be reconstructed from retained evidence. As rules improve, earlier records can be reconsidered without losing the judgments people have already made. An agent answering a renewal question can then work from an account of the customer whose evidence, interpretation, and remaining uncertainties are available for inspection.
