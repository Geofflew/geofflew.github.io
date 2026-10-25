# Can a keep-or-revert research loop work on a question with no answer key?

By Geoffrey Lew

Canonical article: [https://geofflew.github.io/strategy-like-math/](https://geofflew.github.io/strategy-like-math/)

An experiment in using an autonomous research loop to explore the future of finance software. The most useful discoveries came when the system challenged its own answers and changed how it judged them.

## The question: can research improve itself?

Some tasks give an AI agent a clear signal that it has improved. A program passes its tests. A training experiment improves a benchmark. The agent proposes a change, checks the result, keeps what helped and reverts what did not.

[Karpathy’s autoresearch loop](https://github.com/karpathy/autoresearch) applies this pattern to model-training experiments. It was our starting point for a different question: could the same approach help with strategy, where there is no answer key?

We chose a question we had a practical interest in: how will agentic product experiences in ERP and financial close platforms evolve over the next ten years?

That meant exploring four connected areas: the work agents take on, how people establish trust in that work, how products and data need to change, and what happens to roles, buyers and economics.

We began with a concept map and rough views of 2031 and 2036. Rather than ask an agent to write a single report, we wanted it to build a thesis that could be challenged and revised continuously.

### Two kinds of checking

Our hypothesis was that the feedback needed two parts. A mechanical check could establish whether a cited page contained a recorded quotation. A model could then judge whether the claim built on that material was useful.

We also expected the model-based judgment to be gamed. If the rubric rewarded more claims, longer arguments or a particular style of reasoning, the loop would learn to produce those things.

The experiment was therefore as much about improving the evaluation as improving the research.

## Round one: give the loop something to improve

We made the thesis a file of numbered claims. Each claim contained a sentence about the future, a short argument and its sources.

On each turn, an agent proposed an edit. The scorer evaluated it, the loop kept or reverted it, and a log recorded the attempt and its outcome.

### Check the quotations, then judge the idea

The source gate fetched each cited page and checked that the recorded quotations appeared in it. A missing page or quotation prevented the claim from earning a score.

That check established quotation presence, not truth. A genuine quotation can still be taken out of context or used to support an argument it does not justify.

The model judge assessed qualities such as novelty, mechanism, specificity, practical consequences, evidence and connections to other claims. Repeated readings helped reduce variation. As the loop evolved, we added penalties so that each claim and each extra paragraph had to earn their place.

Diagram 1: One agent proposes one edit to the thesis. The edit passes a source gate and a judge, is kept or reverted, and is logged.

The loop at its simplest. One agent proposes one edit, the scorer checks the sources mechanically and then judges the quality against a rubric, and the edit stays only if the score rose.

[View original diagram](https://geofflew.github.io/strategy-like-math/#diagram-1)

### The loop found the cheapest way to score

The first version mostly added claims. It also learned a recognizable style: a disagreement with someone, a numbered chain of reasoning and a prediction tied to a date.

Those features looked like rigor, but often added little. A disagreement might target vendor marketing rather than a serious counterargument. A chain of reasoning might repeat what the claim already said. A date might be precise without having any reason behind it.

Reading the output made the problem obvious. The loop was improving its score faster than it was improving its ideas.

We responded by charging for extra claims and tightening the rubric. A disagreement needed a substantive target. A date needed a real clock behind it, such as a regulatory deadline or a contract renewal.

## Round two: give the research different jobs

A single proposer had another weakness: it kept looking for additions. We needed agents that would ask different questions of the same thesis.

The challenger looked for evidence that would break an existing claim, replaced weak sources with original documents, and merged or retired overlapping ideas.

The explorer brought in material from laws, standards, studies and shipped products. It also synthesized existing claims into new ones.

The designer asked what the preparer, controller or auditor would actually do, step by step, once agents took on part of the work. That kept the research connected to product experience rather than drifting entirely into controls.

### Keep the research even when the claim fails

Reverting an edit should not mean losing everything learned while making it. We created a separate set of research threads outside the scored thesis.

A rejected addition could remain there as a draft. A retired claim could leave behind an unresolved question. The explorer could return to those threads when looking for the next useful idea.

This let the thesis stay selective while the research grew around it.

Diagram 2: Three worker agents with different roles each propose one edit to the scorer. Reverted and retired ideas land in an uncapped set of threads, and the next add is drawn from there.

The second version. Three agents with different jobs propose the edits, and a set of threads outside the score keeps the research behind the edits that were reverted.

[View original diagram](https://geofflew.github.io/strategy-like-math/#diagram-2)

### See where the system is spending its attention

The research map below traces claims and threads across the run. It shows ideas entering, becoming claims and being retired, grouped by the part of the original question they address.

Trust attracted much of the activity. The question of which tasks would move to agents first received much less. Making that imbalance visible gave us a better way to direct the next round of work.

Diagram 3: Every claim and every thread as a branch over the fifteen hours, grouped by the part of the question it answers

Every claim and every thread drawn as a line from the moment it entered, grouped by the part of the question it answers, with the point at which a thread became a claim marked on the line and the retired claims labelled.

[View original diagram](https://geofflew.github.io/strategy-like-math/#diagram-3)

## Round three: review the judgment itself

Some problems were visible only when looking across the whole thesis.

The pruning behaviour gravitated toward cuts just large enough to earn a reward. Several claims leaned on the same radiology press release. Repeated scoring also showed enough variation to affect whether an edit survived.

Each claim could look acceptable in isolation while the collection became narrower, more repetitive or more dependent on a single source.

### Add a reviewer with a wider view

We added a reviewer agent that periodically read the thesis, the results log and a sample of source entries. It looked for weak ideas, rubric-shaped writing, repeated dependencies and drift from the original question.

The reviewer could change worker instructions and issue verdicts that affected subsequent scoring. This created a way to revisit ideas that the ordinary keep-or-revert rule had protected.

The reviewer remained another model-based judgment. Its value came from having a different view of the work and a different job, rather than from being an independent answer key.

### Give the research permission to look further ahead

The evidence-heavy thesis tended toward the near future. We wanted to explore longer-term possibilities without presenting speculation as a sourced fact.

A futurist therefore developed contrasting scenarios for 2031 and 2036. Each scenario had to connect to claims in the thesis, but could explore what might follow from them.

When a scenario depended on a missing idea, it opened a new line of inquiry for the explorer. The research informed the scenarios, and the scenarios gave the research new questions.

A cartographer brought the claims, threads and scenarios together into storylines and a readable report. An orchestrator kept the agents running.

Diagram 4: The full system. A research question and a seed concept map start the thesis. Three worker agents each propose one edit. The edit passes a source gate and a judge, is kept or reverted, and is logged. A reviewer reads the log and the thesis every ninety minutes and feeds verdicts into the judge and rule changes to the workers. A futurist writes pictures of 2031 and 2036 under a separate judge, and a picture that needs a missing idea opens a line of inquiry for the explorer. A cartographer groups the thesis, threads and pictures into storylines and writes the report. An orchestrator starts and restarts every agent.

[View original diagram](https://geofflew.github.io/strategy-like-math/#diagram-4)

## What the research brought into focus

The run produced more than a collection of predictions. It surfaced concrete questions about how finance products could work when agents prepare, review and act on financial information.

These examples came out of the research process. They are useful design hypotheses to investigate, rather than forecasts that the experiment proved.

### Look for errors where the agent appears confident

One line of research examined how accountants respond to AI uncertainty. If people concentrate on items the agent flags, confident-looking errors may receive less scrutiny.

That led to a practical product idea: reserve a sample of apparently straightforward work for a person to prepare without seeing the agent’s answer first.

For example, a close platform could include a blind-check sample alongside its exception queue. The sample would help reveal errors among the supposedly safe items, rather than measuring only the problems the agent already knows to raise.

### Two agents agreeing is not automatically an independent check

Another thread explored correlated errors across language models. Using a different provider does not necessarily mean the second agent will fail in a different way.

For an auditor using an agent to check agent-prepared work, agreement alone should not be treated as independent corroboration.

The design implication is to check some entries that both agents accepted, not only the disagreements, and compare them with evidence outside the two models’ answers.

### Put approval boundaries around consequential actions

Research into legal and operational constraints suggested that agent permissions should depend on the consequences of an action.

Preparing a proposed journal entry is different from releasing a payment. Investigating a discrepancy is different from taking an action that changes an external record or is difficult to reverse.

A useful product pattern is to give agents room to investigate and prepare, while making approval requirements explicit at consequential boundaries. The exact boundary depends on the workflow and jurisdiction; there is no single rule covering every financial action.

### Treat model changes as changes to the workflow

A scenario about vendors freezing model versions for a fiscal year prompted research into model retirement and audit controls.

Providers retire models on their own schedules. For a finance team, switching a model may change the behaviour of a workflow that has already been tested and approved.

[PCAOB AS 2201’s benchmarking provisions](https://pcaobus.org/oversight/standards/auditing-standards/details/AS2201) concern qualifying unchanged automated controls under specified conditions. They do not create a universal requirement to wait a year before relying on a control.

The product question is nevertheless useful: what evidence should a platform preserve when a model changes? Version records, regression tests and a clear review of changed behaviour could make that transition easier to assess.

## From a report to a research practice

The most encouraging part of this experiment was watching ideas become more specific, get challenged and sometimes disappear when better evidence arrived.

The loop gave the work continuity. Specialist roles gave it different directions. The reviewer gave it a way to reconsider what it was rewarding.

That combination suggests a useful direction for AI-assisted strategy: research that can keep its sources, remember unsuccessful paths and return to questions with better tools than it had the first time.

We still have to decide which ideas deserve to shape a product. But a system that helps us ask sharper questions, connect findings and expose weak arguments can make that decision more informed.

The opportunity is to make research something we can keep improving, alongside the products we build.

[Code / agent-research ↗](https://github.com/Geofflew/agent-research)
