# State of AI in Accounting: A capable model is only the beginning

*As AI carries work beyond a single answer, making that work dependable means deciding what it should know, how its conclusions can be checked, and where its authority ends.*

In July 2026, AI agents running security evaluations at OpenAI found a way to communicate through a shared package cache, creating an unauthorized channel between environments that were supposed to keep them isolated.

According to METR's independent investigation, roughly 1,200 agents exchanged more than 70,000 messages and files through the shared messageboard, and roughly 700 went on to participate in an attack on Hugging Face. Their collaboration helped them reach milestones they could not have reached alone, while also taking their activity beyond the tasks they had been assigned. [METR's account](https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/) documents both the coordination and the unauthorized activity; those who used the messageboard were not all participants in the attack.

What interests me about that story is how persistence, shared discoveries, and the ability to divide up work contributed to activity that exceeded the intended assignment. Those capabilities are useful when we want an assistant to carry a difficult task through, but their usefulness depends on what they are directed toward and what the surrounding system actually permits.

The question is already relevant to finance teams adopting AI: in [KPMG’s December 2024 US survey](https://kpmg.com/us/en/articles/2024/ai-in-finance-us-report.html) of 300 finance leaders, **62% reported moderate or large AI use in finance**, while 88% reported at least some use. Those figures describe adoption in that survey, rather than how much work could be completed reliably, which leaves a consequential gap between having AI available and trusting it with an entire process.

The same design question appears in a much more ordinary setting when someone asks an assistant at month-end why operating expenses increased last month.

An assistant can retrieve transactions, run calculations, investigate an unusual item, and write a report, carrying the task forward even when the first search comes back empty. We might also want it to draw on something learned in an earlier investigation, so that each new question benefits from work already done. The practical question is how to give it that room while keeping its work connected to the question we actually need answered.

## Correct numbers, wrong answer

Imagine a finance team preparing its monthly review and trying to explain the change in operating expenses. Although the scenario is illustrative, the decisions it involves are familiar: which periods to compare, which accounts to include, and what a movement in the numbers means.

When someone asks the assistant about the increase, it returns a chart, a short explanation, and a table in which software spending stands out among the largest movements. A large annual subscription payment appears in the supporting transactions, leading the assistant to describe it as an increase in the company's ongoing monthly cost base.

The answer looks plausible because the vendor is recognizable, the payment happened in the relevant month, and the arithmetic in the table is correct. With those details apparently supporting the conclusion, a reader could easily take the explanation into a planning conversation about next month's spending.

Yet an annual payment tells us when cash moved without establishing how much expense was recognized in that month, leaving the important question unanswered. The assistant has found a relevant-looking record and assigned it a meaning that the record cannot establish on its own.

The comparison itself could also be flawed if the report uses an approved subset of expense accounts while the assistant queries a broader set, or if one period is closed while the other still includes provisional entries. Perfect subtraction would not repair either comparison, because we would first have to establish what the numbers represent before debating the explanation.

This is why I find the distinction between model capability and workflow reliability useful. Retrieving a record, calculating a difference, and composing an explanation are individual capabilities, while a dependable answer also requires the right connections between them. Each step supplies the premise for the next, allowing an early mistake to survive even when the subsequent calculations and writing are performed well.

Research on accounting tasks makes that distinction concrete: in [APEX-Accounting's analysis](https://arxiv.org/html/2607.27189#S5) of 74 selected low-scoring runs from three leading models, **53 of the 74 runs—about 72%—were classified as reasoning failures**. That is an analysis of a particular failure sample, not a general error rate for finance work. It nevertheless points to a problem that better arithmetic alone cannot resolve: choosing and applying the right interpretation.

For the person preparing the monthly review, the immediate need is to understand whether costs have changed, whether the change will recur, and whether anything requires attention. A fluent account of the wrong comparison can be more difficult to use than an explicit request for missing information.

## Context decides what counts

Before asking the assistant to investigate again, the team needs to settle the reporting period, comparison basis, and account mapping, along with the distinction between expense movements and payment movements. These choices belong with the task because they define what would count as an answer to the question being asked.

This is the first lever: being deliberate about the model's context, which consists of the instructions, documents, earlier messages, and tool results available while it works. A model may understand variance analysis in general while knowing nothing about the reporting definition this team has approved.

The tempting response is to give it everything: the current policy, previous reports, old discussions, and all the transaction exports. Although that collection may contain the answer, the assistant now has to decide which documents govern the analysis before it can perform the analysis itself.

Suppose last month's report included an account that this month belongs in a separate schedule. The old report remains useful evidence of what was previously done, but it no longer supplies the instruction for what to do now. If both documents arrive without their roles being clear, the assistant can follow a familiar precedent and produce a result that looks consistent while using an outdated definition.

The workflow can remove that unnecessary ambiguity by retrieving the approved mapping for the requested period, identifying the basis on which earlier figures are compared, and labeling historical explanations as historical. Where the reporting basis has changed, the explanation may need to account for that change as well, which is why simply suppressing the old document would lose useful history while presenting it as equally authoritative would create another problem.

The annual subscription needs similar care because an earlier investigation may contain a useful note about the contract even though a renewal has since changed its price or terms. That note should therefore point to the agreement and period it covered, allowing the assistant to assess its relevance to the current investigation. Memory becomes useful when it helps locate and interpret relevant evidence, while preserving the conditions under which an earlier conclusion was valid.

That distinction matters more as work continues across a long conversation or several sessions. When an application summarizes or truncates conversation history, a clarification made near the beginning may no longer be available by the time the report is drafted. Storing an approved decision separately, then retrieving it at the step where it matters, gives the workflow a way to retain it deliberately.

Model selection follows from the task as well, since resolving an ambiguous agreement and formatting approved findings into a standard report place different demands on a model. A lighter model may handle the latter adequately; the former may justify a more capable model and closer review. We need to test that on representative work, including cases where the correct response is to request more evidence. Choosing the largest model for every step does not settle any of the questions about scope or authority.

With these decisions made, the assistant's next investigation starts from a better position, with the expense accounts and comparison periods already established. It can use the payment as a lead before looking for the records that establish how the subscription was recognized, while the distinction between historical context and current instructions reduces the opportunity to apply an outdated rule.

## Review needs evidence

Suppose the next investigation identifies the relevant ledger entries and separates the annual payment from the monthly expense, but leaves part of the movement unexplained. The available records may establish the amount while leaving open whether it reflects a change in service or a timing difference, making this the point where “a human will review it” needs to mean something concrete.

Picture the reviewer opening the first version of the report and finding a chart, a table, and a confident paragraph about increased software costs. To discover the payment-versus-expense mistake, the reviewer must know to question that interpretation, locate the underlying records, and reconstruct the relationship. If none of that evidence accompanies the answer, review becomes a choice between trusting the paragraph and doing the investigation again.

In the revised workflow, the reviewer can see the account scope, period, source entries, and calculation behind the proposed explanation. The annual payment appears as supporting context with its relationship to recognized expense made explicit, while the unresolved portion remains visible for the reviewer to investigate.

The reviewer can then distinguish the supported findings from those that require the agreement, deciding which interpretations to accept and which need to change. By giving the person a basis for judgment and showing where additional work could resolve uncertainty, the system makes the review useful to the next stage of the investigation.

The evidence consists of inspectable artifacts—retrieved records, applicable definitions, executed calculations, and the assumptions used in the explanation—rather than a transcript of the model's private reasoning. A claim should survive comparison with those artifacts regardless of how convincingly the model describes its own process.

This leads to the second lever: designing the work around evidence and tested procedures, with different parts of the workflow responsible for establishing different things. Code can check that account-level movements add up to the overall change, while the application preserves the records and definition version used in that calculation. Where a policy ambiguity requires a person's judgment, the model can investigate candidate explanations and prepare the material needed for that decision.

A successful reconciliation does not establish that a narrative is correct, just as a reviewer accepting the narrative does not excuse a calculation that fails to reconcile. Keeping those responsibilities distinct makes it possible to understand what has been checked and what remains open.

![An illustrative expense-analysis workflow connects current context, evidence and calculations, reviewable interpretation, and approved action. Reviewed decisions improve the next run.](/assets/state-of-ai-flow.png)

The sequence can be written down as a reusable procedure that establishes the reporting basis before querying and uses the approved method to calculate movements. It can then direct the investigation toward differences that meet the team's threshold, requiring supporting evidence for each material explanation while keeping unresolved questions visible. By carrying these expectations into each run, the procedure gives the assistant a consistent basis for deciding how to proceed.

Procedures of this kind are often called skills, and their value lies in the tested knowledge they carry: a calculation script, a definition that matters, an error worth looking for, or a condition under which the task should pause. Asking the model to write itself a procedure does not supply experience it did not already have.

[SkillsBench](https://arxiv.org/html/2602.12670) puts a number on the value of that procedural knowledge: across 87 tasks and 18 model-and-harness configurations, curated skills increased the average pass rate from **33.9% to 50.5%, a gain of 16.6 percentage points**. Improvements varied across configurations, while the three conditions in which models generated their own skills underperformed their no-skill baselines.

The result gives teams a reason to test procedures that carry useful operational knowledge, while the remaining failures show why attaching instructions cannot by itself establish reliability. For the expense investigation, the opportunity is to put the team’s tested methods within reach of the assistant and check whether they improve its work on representative cases.

In our monthly review, a useful procedure goes beyond the general instruction to “be accurate” by requiring evidence of the link between a payment and expense recognition. That requirement gives the workflow a specific question to resolve before the explanation reaches the reviewer, connecting the procedure directly to the mistake that prompted it.

## Capability is not authority

Once the assistant has found an issue, its ability to propose what to do about it introduces a decision about authority as well as analytical ability. If the investigation suggests that an entry needs adjustment, the assistant may be able to describe the concern, assemble the supporting documents, and draft the proposed change, without having permission to post it.

This is the third lever: designing the environment in which the model operates, including how a task begins, which records it can read, and when it can repeat a failed query. Permission to save a draft or request information also differs from permission to approve a report or change the books, distinctions that a single label such as “autonomous agent” can obscure.

For the expense investigation, the system might allow independent retrieval and calculation within the assigned entity and reporting scope. The assistant might also be allowed to save a draft and request missing evidence, while approval of the report remains with a reviewer and any accounting adjustment follows a separate approval process. The assistant still carries substantial work through without treating every useful next step as an authorized one.

The tool layer must enforce those choices, so that an instruction saying “ask before posting” is backed by a posting tool that requires valid approval even when the model requests the action anyway. Access controls serve the same purpose for data: a task about one entity should not acquire broader access just because a search would be easier with it.

This surrounding system, often called a harness, connects standing instructions, procedures, tools, permissions, retained state, and checks into the environment through which the model works. When a document is missing, it can preserve the work already done and route the unresolved question. When a request fails, it can distinguish a retryable problem from a decision that needs a person, giving persistence a practical meaning within the workflow.

The security incident at the beginning is a sharp illustration of why that environment matters. The everyday version is less dramatic: a capable assistant takes a reasonable-looking next step that the person delegating the task did not intend. We should decide the allowed next steps while designing the workflow, before the assistant encounters that choice.

## Make the next month smarter

The monthly review can now end with a usable decision because the report identifies the comparison, supports its main explanations, and exposes what remains uncertain. A reviewer can approve the supported analysis, request additional evidence for the open question, and keep a proposed adjustment separate from an approved change.

A month later, the system faces another test when the team begins its next review and needs to know whether the payment-versus-expense mistake will demand their attention again.

While correcting the paragraph fixes the immediate report, capturing the reason for the correction gives the team a way to improve the process that produced it. The team can add the distinction to its procedure, retain the relevant source references, and create a test case in which a large annual payment must not automatically become a claim about monthly expense growth. A future change to the procedure or model can be checked against that case.

The retained lesson needs boundaries so that it does not become an instruction to ignore annual payments or a permanent assertion about one contract. Establishing the relationship before drawing a conclusion remains the useful principle, while new agreements and reporting policies still need to be considered on their own terms.

That is how institutional knowledge can enter an AI workflow without turning history into an unquestioned instruction. Approved decisions remain available, their scope remains visible, and corrections change what the next run is asked to verify. Improvement comes from maintaining that system, rather than assuming that another conversation has taught the model a lasting lesson.

There is early field evidence for this shift in how accountants spend their time: a [2025 working paper on AI in accounting](https://gsbpreserve.stanford.edu/view/4261/human-ai-in-accounting-early-evidence-from-the-field), drawing on a survey of 277 accountants and field data from 79 small and midsized firms, reported that AI adopters reallocated **approximately 8.5% of their time** from routine data entry toward work such as business communication and quality assurance. That finding describes the adopters studied rather than a guaranteed saving, but it gives a concrete expression to the opportunity: more attention available for understanding the business and checking the work.

For the people using it, the payoff is an answer they can act on with evidence in view, and fewer occasions when the same avoidable error demands their attention again. The assistant can do more of the investigation, while the reviewer spends time on decisions that actually require judgment.

I see the practical opportunity behind AI's expanding capabilities in the meaningful work we can delegate when we are deliberate about the information, procedures, and authority surrounding it. By designing those elements together, we can direct the model's ability to keep going toward an answer the organization has the evidence and authority to stand behind.

*Adapted from [my state-of-AI talk, beginning at 5:09](https://www.youtube.com/watch?v=J5lguvJLPQM&t=309s).*
