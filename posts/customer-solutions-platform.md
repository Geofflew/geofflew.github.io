# A customer platform should help someone decide what to do next

*A score can summarize an account without explaining it. A useful customer platform connects the evidence, the changes worth noticing, and the people responsible for following up.*

At a weekly customer review, the team needs to decide where to spend its attention. Which customers are struggling to adopt the product? Has something deteriorated since last week? Who will follow up?

The information exists, but it arrives in different forms. Product activity records what people completed. Feature settings explain what they intended to use. Meetings and notes describe the relationship. Account records identify the person responsible. Bringing these together gives the team a place to work; deciding how to interpret and present them determines whether that place is useful.

Consider a customer using accounting software. They complete reconciliations inside the product, but keep their month-end checklist in another tool. A dashboard showing little checklist activity is correct about the activity and potentially wrong about what it means. Someone reviewing the account needs to know whether that is a problem before they arrange a training session.

A customer solutions platform should carry that distinction all the way from the records to the next decision.

![Customer records support account understanding, review of changes, and human decisions about follow-up and confirmed assignments.](/assets/customer-solutions-flow.svg)

## Establish what the score is measuring

Suppose the product offers a close checklist, reconciliations, and variance review. Averaging their completion rates seems like a reasonable measure of adoption. But a checklist intentionally disabled by the customer should not lower the score. Nor should variance review if it requires an integration that the customer does not have.

Classify each feature before calculating the average. A feature can be scored, temporarily paused, disabled with a reason, or inapplicable. The latter three states remove it from the calculation while retaining the explanation. If no features remain, the account is not scored. That differs from an account whose enabled features genuinely have no use.

This is a modeling decision with a practical consequence. The customer team can see “checklist managed elsewhere” and spend its time on another concern. It does not need to rediscover the customer's arrangement every time the account appears in a report.

There is a deliberate choice in the opposite direction too. An enabled feature with no recorded usage receives zero and an explanation that no usage was recorded. That keeps a customer who has never started visible for follow-up. It makes the feature settings important: an inaccurate setting can still produce a misleading interpretation, so the reason belongs beside the score where someone can inspect it.

An activation score can then combine utilization across the included features with complaint and escalation penalties and an allowance for customers still getting started. Selecting closed monthly periods avoids judging a month-end workflow while the work is still in progress. Retaining the component values alongside the total makes the calculation explainable now—and comparable next week.

## Explain the movement, not just the position

The customer team does not review accounts only once. A familiar score can hide a new problem.

Suppose an account falls from 64 to 50. Both values sit inside a yellow band, so a page showing only the current color looks unchanged. Yet a fourteen-point fall may be the most consequential development in that week's review. The team needs the movement and its explanation, not just the latest classification.

Stored components make that explanation possible. Write the unrounded score as utilization multiplied by the remaining fraction after penalties, plus the new-customer allowance. To compare weeks, first substitute the new utilization while holding the other old components fixed. Then substitute the new penalty, and finally the new allowance. Each difference contributes part of the movement; a final adjustment accounts for rounding and the score's upper and lower bounds.

The contributions add up to the displayed change. This is an accounting of how the calculation moved, not proof that a complaint caused the customer's behavior. It can tell the reviewer that the complaint penalty changed while product use stayed steady. That directs the conversation toward the complaint rather than another adoption session.

The report can lead with those changes and show the recorded owner and next step alongside each flagged account. Missing ownership or a missing next step deserves attention of its own: a well-explained concern still goes nowhere if nobody takes responsibility for it.

The same discipline applies to the overall trend. If new accounts enter the average each week, an apparent improvement may reflect who joined rather than how existing customers are doing. Comparing accounts that have scores in every displayed week holds the population fixed. The tradeoff is explicit: that trend describes the continuing cohort, while newly started accounts need their own place in the review.

## Keep customer lists open to review

A weekly review may also organize follow-up around a group: customers approaching renewal, or customers showing strong adoption and recent executive engagement. Saving that rule avoids reconstructing the list each time. It does not make the list permanent.

Suppose a group contains five accounts when reviewed and five a month later. Four may have left and four others entered. Showing “five customers” conceals almost everything that matters to the person preparing outreach.

Save the member IDs when someone accepts the list. At the next review, compare the current IDs with that baseline and show entries and exits. Attach the reason for each movement: perhaps an executive meeting brought an account into scope, or someone explicitly excluded it with a recorded explanation. A count becomes a reviewable change in the work the team intends to do.

The rule also needs to represent missing evidence. If call recording is unavailable for an account, “no competitor mentioned” is not established. A signal can therefore be a match, a non-match, or no-data. One conservative policy is to mark the whole rule as no-data whenever a referenced signal lacks coverage, even if another branch matches. Manual inclusion can express a person's judgment separately, with their name, date, and reason; exclusions take precedence.

That separation lets people use information from outside the recorded signals without disguising their decision as an automatic finding.

## Make responsibility visible through the action

Once the team selects a follow-up, assigning the work should preserve what it decided. A chat command can identify an account and propose people for onboarding, cash, or owner roles. Resolving the names against known records produces a concrete proposal for review.

Save that proposal before asking for confirmation. The confirmation names the saved proposal, and a transaction locks it while checking the requester, conversation, and status. Execution applies its stored assignments and reports which were newly written and which were already present. A relayed list with extra changes cannot silently broaden the decision.

This assignment workflow supports the person's choice; a report flag does not automatically invoke it. The useful connection is between a concern the person understands and a specific piece of work they choose to organize.

For the customer team, the benefit is a more focused review. Deliberate product choices need not become recurring false alarms. Meaningful deterioration need not disappear inside an unchanged color. A familiar list can reveal that its membership has changed, and a concern without an owner or next step can be resolved before the meeting ends.

The platform helps people spend their attention on customers rather than on reconstructing what a dashboard meant.

The [Customer Solutions Platform repository](https://github.com/Geofflew/customer-solutions-platform) provides runnable calculations, assignment handlers, tests, and generated views over synthetic records. It is a companion for studying these decisions; its pages illustrate the workflows rather than connecting to a live customer system.
