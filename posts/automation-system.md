# Building automation that carries the work through

*Interpreting a request is one part of automation. Completing it means carrying the intent, the person's decisions, and the record of progress through every subsequent step.*

Consider a manager reorganizing account responsibilities. They want to move one colleague's European accounts to another colleague. Doing it manually means finding the right accounts, reviewing the list, updating each owner, and checking what changed.

An LLM can turn the request into a structured plan. That removes some translation work, but the manager still needs the accounts to change correctly. They may review the proposal later. Someone else may edit an account in the meantime. A confirmation may arrive twice.

Building a useful automation system means handling that whole task. The language model helps interpret what someone wants; the application carries the work forward, remembers decisions, and establishes what actually happened.

## Turn an intention into specific work

For account reassignment, the planner needs to identify three things: the current owner, the region, and the destination owner. The application can then use a parameterized database query to find matching accounts. Each proposed change contains an account ID, its current owner, and its proposed owner.

This division gives the model a useful responsibility without asking it to invent the records it intends to change. The language request becomes a filter; the database supplies the actual accounts. The person reviews a concrete list rather than approving an interpretation whose consequences remain hidden.

Other requests need investigation before a useful result is possible. An analyst answering an account question can choose tools to find the account and retrieve its deals or support tickets. The application executes those tools and adds their results to the conversation, letting the model choose the next step from what it has learned.

Here, orchestration means more than forwarding calls. The application counts the calls it executes and decides when the investigation must conclude. After a budget of six, it can remove the available tools and ask for an answer from the evidence already gathered. A response based on incomplete reading should say so. Otherwise, the user receives an apparently finished answer without knowing that the investigation stopped early.

Reassignment and investigation have different outcomes, but the same division of responsibility: models interpret and propose; application code manages execution and progress. For a change that requires approval, the next step is to preserve exactly what the person was asked to decide.

## Give approval something durable to refer to

Suppose the manager reviews three accounts and says yes. If that response is translated into a fresh list of changes, it creates another opportunity to reinterpret the request. A broader list could accidentally include every account belonging to the original owner.

Instead, save the reviewed proposal on the server and give it an identifier. The confirmation refers to that identifier. Execution reads the saved proposal, so approval remains attached to the particular accounts and destination the person saw. If the confirmation also carries a list, compare it with the saved one and reject differences.

That proposal needs a lifecycle. A newer proposal in the same conversation supersedes the old one. A proposal that has already been applied cannot be applied again. Both creating a proposal and confirming one take the same transaction-level session lock, which puts those operations in an order: a new proposal either arrives before confirmation and makes it stale, or waits until confirmation completes.

Within the transaction, a conditional update claims the pending proposal. Two confirmations cannot both claim it. The account updates then check another condition: does each account still have the owner shown during review?

```sql
UPDATE accounts
SET owner = $1
WHERE id = $2 AND owner = $3;
```

The final condition preserves someone else's intervening work. If an account has moved since review, that row is skipped and reported; other unchanged accounts can still be transferred. The outcome includes both applied and refused changes, giving the manager a specific exception to resolve instead of silently overwriting the newer assignment.

Approval, execution, and reporting are now parts of one task. The person supplies judgment once, and the application preserves its scope through the update.

## Remember work that arrives without a conversation

Account changes begin with a person, but automation also receives events from other systems. Those deliveries introduce a similar question: how does the application recognize work it has already accepted or completed?

A sender may retry because it did not receive a timely response. Processing everything before acknowledging the delivery makes that more likely, especially when the work takes longer than the sender is willing to wait. The first attempt may still be running when another arrives.

Separate accepting the event from processing it. Verify the delivery, store its ID and body, and acknowledge it once storage succeeds. A unique constraint on the event ID recognizes repeated deliveries. The sender gets a prompt response while a worker processes the stored event independently.

For database work, the worker can claim an unhandled event with `FOR UPDATE SKIP LOCKED`. Overlapping workers take different available records. The effect and the event's handled flag commit in the same transaction: if processing fails, neither is committed. A later drain can find the event again. Keying the effect by event ID also prevents a deliberate replay from repeating that database effect.

The proposal and event workflows are separate implementations of a common idea. Give work a stable identity, store its progress, and make the conditions for advancing it explicit. This lets a retry continue an existing task instead of accidentally creating another one.

## Keep essential work moving

Stored work also needs something to pick it up. Database notifications can wake an event listener quickly, while draining the stored backlog provides a recovery path after a missed notification. The record of work remains useful even when the wake-up signal is lost.

Scheduled work needs a comparable distinction between when a job was due and when the dispatcher happened to run. Checking for scheduled times since the previous start lets a late tick notice missed work. With a bounded lookback, it can start a due job once without replaying an unlimited history.

Once several jobs run regularly, their controls should reflect what users depend on. Customer synchronization and duplicate detection may concern the same records, but stopping an optional duplicate check should not stop essential updates. Separate job identities and switches let one pause while the other continues. Run records can then reveal whether a job executed, failed, or has no recorded execution despite being due.

These records matter because silence is ambiguous. Without them, a person waiting for updated information has to investigate whether the system is slow, disabled, or broken before they can decide what to do next.

## Let people delegate the coordination

The practical benefit of automation is less work carrying a task from one step to the next. People can review a prepared change instead of assembling and applying it themselves. Their approval retains its meaning. Repeated deliveries need not produce repeated effects, and exceptions leave a record that tells someone what still needs attention.

People retain the decisions that require their judgment while the application handles the coordination around them. That is what makes a request worth delegating: a clear path from intent to a result, with enough memory to explain where the work stands.

The [Automation System repository](https://github.com/Geofflew/automation-system) contains runnable AI workflow and data-operation implementations of these ideas. It uses synthetic data and prepared model responses so the orchestration can be inspected and tested repeatably.
