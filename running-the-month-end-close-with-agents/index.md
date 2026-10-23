# Running the month-end close with agents in the preparer and reviewer seats

By Geoffrey Lew

Canonical article: [https://geofflew.github.io/running-the-month-end-close-with-agents/](https://geofflew.github.io/running-the-month-end-close-with-agents/)

[![Month-end close architecture: source systems, shared close state, agents, and preparer and reviewer responsibilities.](https://geofflew.github.io/assets/month-end-close-field-guide-colors.png)](https://geofflew.github.io/assets/month-end-close-field-guide-colors.png)

## The situation

Every accounting team now has an AI assistant somewhere in its month. Someone drafts flux explanations in a chat window, someone else has a skill that pulls a bank export and matches it, a third person runs accruals through a prompt they refined over three closes. The work is real and it saves time. It is also scattered: each person has their own instructions, their own version of the process, their own outputs in their own folder, and none of it shows up in the checklist until a human copies the result in and signs off.

The close itself has not changed shape. It still starts on day one, runs on due dates, and ends when the last reviewer approves the last task. The agents are faster preparers inside the same calendar.

## The problem

The calendar is the problem. A close checklist encodes what has to happen before what as a set of dates a person chose, and the people running it fill in everything the dates leave out: whether the inputs have actually arrived, who is waiting on whom, what the agent used to get its number, and whether the instructions it followed are the ones the team agreed on. That tacit layer is what makes a checklist work, and it is exactly what an agent cannot see.

So when agents prepare more of the work, the bottleneck moves to review, and nobody has said what reviewing an agent's work means. A reviewer who re-performs the reconciliation has gained nothing. A reviewer who ticks the total has given up the control. And the person who used to prepare the task is now watching an agent do it, with no clear job of their own. The accounting has not changed. The two jobs have, and that is the thing to get right first.

## The two jobs change

The seats stay. Every task still has a preparer and a reviewer, and the sign-off still carries a name and a timestamp. An agent can hold either seat, and when it does, the person who used to hold it does not go away. Their job changes.

**Preparer**

- Owns the procedures and policies the agent works from. When the agent gets something wrong, the fix is usually a line in the procedure, not a correction to one task.

- Checks the agent's inputs and steps, not just the prepared output and conclusion. The review pack is built for this.

- Answers the agent when it stops and asks. During the close, the preparer's queue is the list of tasks waiting on input.

- Runs continuously through the month, not in the close window. Procedure maintenance, threshold decisions and answering questions happen as inputs land, so day one of the close is lighter and the weeks before it are busier.

**Reviewer**

- Checks the preparer's work, whether the preparer was a person or an agent: inputs, steps and exceptions, not just the result.

- Captures judgment calls and changes so they go back into the procedure and policies, rather than living in one period's comments.

- Reviews the rework taken when a task was rejected or an exception was resolved.

- Approves, or rejects with a reason that points at the procedure, so the preparer can fix the instructions.

- Samples agent-prepared and agent-reviewed tasks each period. This is the control that lets the threshold keep moving.

- Sets the threshold below which an agent can hold the reviewer seat. After enough periods with no rejections on a task, the reviewer is the one with the evidence to move it.

The threshold is the dial. Below it, both seats can be agents and the task runs without a person. Above it, a person reviews. A controller moves it account by account as the rejection rate proves out, which makes this a rollout rather than a switch. The rest of this post is what has to be true for those two jobs to work, and what falls out when it is.

## What has to be written down

A good preparer carries most of a task in their head: what it depends on, whether the inputs have arrived, what matters and what does not, what happened last time. For an agent to hold the seat, all of that has to be written down in one place, and the preparer becomes the person who owns what is written. This is what that list is.

| What | Holds |
| --- | --- |
| Accounts and transactions | The balances and the lines behind them, for the period. |
| Tasks and their state | The checklist, and whether each task is not started, in progress, waiting on input, submitted or reviewed. |
| Ownership | Who holds the preparer and reviewer seat on each task, a person or an agent. |
| Dependencies | Which tasks have to be reviewed before this one can start. This is what sets the order and shows what is blocked. |
| Procedure | The instructions for whoever holds the seat. A person and an agent read the same one. |
| Policies | Materiality thresholds, tolerances, and the memos that apply. |
| Evidence | Workbooks, linked files, one comment per step, the submission, the sign-off. |

One of those is new: waiting on input. An agent gets most of the way through a task and needs something a person has, a vendor estimate, a confirmation, a decision on an item the procedure did not cover. Today that is a message in a channel and a task that looks like it is in progress. Making it a state is what gives the preparer their queue during the close: the list of questions the agent could not answer alone.

## The agents

A handful of agents do the work, each under its own identity with only the permissions its seat allows, so an agent in the preparer seat cannot approve and an agent in the reviewer seat cannot submit. They run on a schedule and on events, so a task can start the moment an input lands.

- An orchestrator starts work as soon as it is unblocked, nudges whoever holds the seat, and reports blockers and the critical path. It does no accounting.

- Domain agents for accruals, reconciliations, rollforwards and flux work the task the way the procedure says, one comment per step, then submit.

- A sequencing agent works out which tasks have to finish before which, from the procedures, the accounts and past sign-off order, and a controller approves.

- An outreach agent asks people and vendors for what a task is waiting on, and pulls source files into the task as evidence.

Two more exist for the reviewer, and they are the ones that make review of an agent's work different from review of a person's.

The validation harness is a second model that checks the preparer's work before a person sees it. It flags exceptions and judgment calls, scores confidence, and sends feedback back for reprocessing. It advises; the reviewer seat decides. The review pack is what the reviewer then reads: what the agent used and did, step by step, the inputs, the exceptions and what was done with each, and what changed from last period. It is compiled from the system's state, not written by the agent being reviewed, which is why it can be trusted. A reviewer reads the diff and the exceptions first and opens the workbook only where the pack points. That is review by exception, and it is faster than re-performance without giving up the control.

## How one task runs

A cash reconciliation against a payment processor, with an agent in the preparer seat and a person, call her Priya, in the reviewer seat. Sam owns the procedure.

1. The payout file lands. Its freshness updates, and the orchestrator sees that the cash rec's inputs are now current and its one dependency, the trial balance refresh, is reviewed.

2. The orchestrator starts the task. The preparer's pack is compiled: the procedure, the inputs, last period's rec with its exceptions, and the comment the bank rec reviewer left upstream.

3. The domain agent works the procedure. It matches the payout file to the ledger, writes one comment per step with the matching sheet attached, and lists 12 unmatched items.

4. Two of the 12 need a decision the procedure does not cover. The agent sets the task to waiting on input and asks Sam. The orchestrator nudges Sam. The task shows as asking, not stuck.

5. Sam answers in the task. One answer is a one-off; the other is a new rule, so Sam adds a line to the procedure. The agent resumes and submits: steps done, exceptions and what was done with each, the two items it was unsure of.

6. The reviewer's pack is compiled: the submission, the diff against last period, the trace, and the note that seven tasks are waiting on this review.

7. Priya reads the exceptions and the diff, opens the matching sheet for one item, and rejects with a reason pointing at the step that handled it.

8. The task goes back to the agent with the comment. Sam decides the fix belongs in the procedure and makes it. The agent reruns the step and resubmits, and Priya approves. The seven downstream tasks start.

At no point did anyone open a checklist to decide what to do next. The order came from the dependencies, the start came from freshness, and the two people did the two things only people can do: answer a question the procedure did not cover, and judge whether the work was right.

## The close becomes a state, not an event

Put the pieces together and something changes that nobody set out to change. Once what the preparer knew is written down, a task no longer needs a date. It starts the moment the tasks it depends on are reviewed and its inputs have landed, whether a person or an agent holds the seat. The books are always as closed as the data allows.

Month end becomes the point at which you freeze the period and emit the outputs, not the point at which the work begins. The preparers have spent the month keeping the procedures right and answering questions as they came up. The reviewers spend the close reading exceptions and deciding how far to trust the agents. That is the shift. The agents are the reason it happens, but the two jobs are what it is.
