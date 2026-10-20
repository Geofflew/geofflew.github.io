# A customer platform should help someone decide what to do next

*A score can summarize an account without explaining it. A useful customer platform connects the evidence, the changes worth noticing, and the people responsible for following up.*

At a weekly customer review, the team needs to decide where to spend its attention. Which customers are struggling to adopt the product? Has something deteriorated since last week? Who will follow up?

The information exists, but it arrives in different forms. Product activity records what people completed. Feature settings explain what they intended to use. Meetings and notes describe the relationship. Account records identify the person responsible. Bringing these together gives the team a place to work; deciding how to interpret and present them determines whether that place is useful.

Consider a customer using accounting software. They complete reconciliations inside the product, but keep their month-end checklist in another tool. A dashboard showing little checklist activity is correct about the activity and potentially wrong about what it means. Someone reviewing the account needs to know whether that is a problem before they arrange a training session.

A customer solutions platform should carry that distinction all the way from the records to the next decision. The design connects product use to an activation score, that score to a custom customer segment, and the segment to an activation play—a repeatable sequence of help and follow-up. The value comes from those components working together.

The six screens below follow that work, using synthetic customer records. Select any screen to open the full-size image.

![Customer records support account understanding, review of changes, and human decisions about follow-up and confirmed assignments.](/assets/customer-solutions-flow.svg)

## Establish what the score is measuring

Suppose the product offers a close checklist, reconciliations, and variance review. Averaging their completion rates seems like a reasonable measure of adoption. But a checklist intentionally disabled by the customer should not lower the score. Nor should variance review if it requires an integration that the customer does not have.

Classify each feature before calculating the average. A feature can be scored, temporarily paused, disabled with a reason, or inapplicable. The latter three states remove it from the calculation while retaining the explanation. If no features remain, the account is not scored. That differs from an account whose enabled features genuinely have no use.

This is a modeling decision with a practical consequence. The customer team can see “checklist managed elsewhere” and spend its time on another concern. It does not need to rediscover the customer's arrangement every time the account appears in a report.

There is a deliberate choice in the opposite direction too. An enabled feature with no recorded usage receives zero and an explanation that no usage was recorded. That keeps a customer who has never started visible for follow-up. It makes the feature settings important: an inaccurate setting can still produce a misleading interpretation, so the reason belongs beside the score where someone can inspect it.

An activation score can then combine utilization across the included features with complaint and escalation penalties and an allowance for customers still getting started. Selecting closed monthly periods avoids judging a month-end workflow while the work is still in progress. Retaining the component values alongside the total makes the calculation explainable now—and comparable next week.

<figure class="screen">
<a href="/assets/customer-screens/activation.png"><img src="/assets/customer-screens/activation.png" alt="Activation screen showing account scores, feature utilization, exclusions, and the reasons features are not scored." loading="lazy"></a>
<figcaption><strong>Activation.</strong> Read the score alongside feature use and exclusions, so a deliberate product choice is distinguishable from an adoption gap. <a href="/assets/customer-screens/activation.png">Open full size ↗</a></figcaption>
</figure>

## Explain the movement, not just the position

The customer team does not review accounts only once. A familiar score can hide a new problem.

Suppose an account falls from 64 to 50. Both values sit inside a yellow band, so a page showing only the current color looks unchanged. Yet a fourteen-point fall may be the most consequential development in that week's review. The team needs the movement and its explanation, not just the latest classification.

Stored components make that explanation possible. Write the unrounded score as utilization multiplied by the remaining fraction after penalties, plus the new-customer allowance. To compare weeks, first substitute the new utilization while holding the other old components fixed. Then substitute the new penalty, and finally the new allowance. Each difference contributes part of the movement; a final adjustment accounts for rounding and the score's upper and lower bounds.

The contributions add up to the displayed change. This is an accounting of how the calculation moved, not proof that a complaint caused the customer's behavior. It can tell the reviewer that the complaint penalty changed while product use stayed steady. That directs the conversation toward the complaint rather than another adoption session.

The report can lead with those changes and show the recorded owner and next step alongside each flagged account. Missing ownership or a missing next step deserves attention of its own: a well-explained concern still goes nowhere if nobody takes responsibility for it.

The same discipline applies to the overall trend. If new accounts enter the average each week, an apparent improvement may reflect who joined rather than how existing customers are doing. Comparing accounts that have scores in every displayed week holds the population fixed. The tradeoff is explicit: that trend describes the continuing cohort, while newly started accounts need their own place in the review.

<figure class="screen">
<a href="/assets/customer-screens/status-report.png"><img src="/assets/customer-screens/status-report.png" alt="Weekly status report with cohort trends, changed accounts, missing owners, and next steps." loading="lazy"></a>
<figcaption><strong>Weekly status.</strong> Start with what changed, then see who is responsible and what is meant to happen next. <a href="/assets/customer-screens/status-report.png">Open full size ↗</a></figcaption>
</figure>

## Connect custom segments to the next action

An activation score is more useful when it helps select a response. A **custom segment** lets someone save a rule over customer signals—for example, a measured activation score below 70, expressed as the inverse of an “activation 70+” signal. Other segments might identify customers approaching renewal or showing strong adoption and recent executive engagement.

Connect the low-activation segment to an **activation play**: a repeatable sequence of follow-up. An owner reviews the feature breakdown, identifies what is blocking adoption, offers relevant help, and checks progress later. Missing integration setup might call for technical assistance; an enabled feature with no use might call for a guided session. A deliberately excluded feature should not generate the same advice.

The connection is **product use → activation score → custom segment → activation play → follow-up**. Each component supplies something the next one needs: evidence, an interpretation, a customer selection, and a response. Segment entry can become a trigger for a play proposal or task, with approval where the action needs it. That link to play execution is a design extension to the implemented membership review and assignment workflow. That is how the platform can turn changing customer context into coordinated help.

Saving the selection rule avoids reconstructing the list each time. It does not make the list permanent.

Suppose a group contains five accounts when reviewed and five a month later. Four may have left and four others entered. Showing “five customers” conceals almost everything that matters to the person preparing outreach.

Save the member IDs when someone accepts the list. At the next review, compare the current IDs with that baseline and show entries and exits. Attach the reason for each movement: perhaps an executive meeting brought an account into scope, or someone explicitly excluded it with a recorded explanation. A count becomes a reviewable change in the work the team intends to do.

The rule also needs to represent missing evidence. If call recording is unavailable for an account, “no competitor mentioned” is not established. A signal can therefore be a match, a non-match, or no-data. One conservative policy is to mark the whole rule as no-data whenever a referenced signal lacks coverage, even if another branch matches. Manual inclusion can express a person's judgment separately, with their name, date, and reason; exclusions take precedence.

That separation lets people use information from outside the recorded signals without disguising their decision as an automatic finding.

<figure class="screen">
<a href="/assets/customer-screens/segments.png"><img src="/assets/customer-screens/segments.png" alt="Segments screen showing membership changes, saved rules, manual overrides, and signal coverage." loading="lazy"></a>
<figcaption><strong>Segments.</strong> Review which customers entered or left a saved group, together with the rules and manual decisions behind the change. <a href="/assets/customer-screens/segments.png">Open full size ↗</a></figcaption>
</figure>

## Inspect the evidence before choosing a response

A weekly report or saved group tells someone where to look. The account view should help them decide what to do when they get there. A risk label alone cannot explain whether the concern comes from product use, a change in the relationship, or a sentence in a meeting note.

Keep those contributions and their source evidence visible. A note mentioning a departing sponsor is a reason to investigate, but counting every keyword hit can amplify an ambiguous remark. Requiring a keyword family to appear under two authors on two days provides a specific corroboration rule. It reduces reliance on one remark without proving that the interpretation is correct. Suggested contacts likewise need to resolve to the customer roster, rather than treating every name mentioned on a call as a customer champion.

<figure class="screen">
<a href="/assets/customer-screens/account.png"><img src="/assets/customer-screens/account.png" alt="Account detail screen with risk components, source-note evidence, suggested champions, and rejected contact matches." loading="lazy"></a>
<figcaption><strong>Account detail.</strong> Inspect the reasons behind a risk assessment and the evidence supporting suggested customer contacts. <a href="/assets/customer-screens/account.png">Open full size ↗</a></figcaption>
</figure>

Those rules should also be open to evaluation. Comparing risk scores with known outcomes reveals whether the ranking separates customers who later churned from those who stayed. Looking at the individual snapshots where two rules disagree can reveal what an aggregate metric hides. The screen below uses synthetic snapshots to compare counting every note hit with requiring corroboration; its measurements describe that generated dataset.

<figure class="screen">
<a href="/assets/customer-screens/backtest.png"><img src="/assets/customer-screens/backtest.png" alt="Churn backtest showing ranking metrics, churn by risk band, and synthetic account snapshots where note-handling rules disagree." loading="lazy"></a>
<figcaption><strong>Churn backtest.</strong> Compare the rules against outcomes, then inspect the accounts whose classification changed. <a href="/assets/customer-screens/backtest.png">Open full size ↗</a></figcaption>
</figure>

## Make responsibility visible through the action

Once the team selects a follow-up, assigning the work should preserve what it decided. A chat command can identify an account and propose people for onboarding, cash, or owner roles. Resolving the names against known records produces a concrete proposal for review.

Save that proposal before asking for confirmation. The confirmation names the saved proposal, and a transaction locks it while checking the requester, conversation, and status. Execution applies its stored assignments and reports which were newly written and which were already present. A relayed list with extra changes cannot silently broaden the decision.

This assignment workflow supports the person's choice; a report flag does not automatically invoke it. The useful connection is between a concern the person understands and a specific piece of work they choose to organize.

<figure class="screen">
<a href="/assets/customer-screens/bot.png"><img src="/assets/customer-screens/bot.png" alt="Bot activity showing an assignment proposal, confirmation checks, an applied result, and the proposal ledger." loading="lazy"></a>
<figcaption><strong>Bot activity.</strong> Follow the proposed assignments through confirmation to the recorded outcome. <a href="/assets/customer-screens/bot.png">Open full size ↗</a></figcaption>
</figure>

## Benefits for the people using it

The first benefit is less preparation before a customer conversation. Product use, relationship evidence, and follow-up responsibilities are available together, so someone can understand the account without reconstructing its story across reports and notes.

That context also makes help more relevant. A customer who deliberately uses another tool should not repeatedly receive adoption advice for a feature they have chosen to exclude. A customer whose usage is deteriorating deserves attention even if their account still has the same color on a dashboard. Explaining both the score and its movement helps people distinguish those situations.

Custom segments connect that understanding to repeatable help: a low-activation group can select an activation play, while its feature evidence helps the owner tailor the response. Seeing who entered or left the group lets people adjust outreach as customer circumstances change. Visible owners and next steps then make gaps in follow-up easier to resolve, while confirmed assignments show what responsibility was actually recorded.

The result is a clearer path from understanding a customer to choosing useful help and coordinating who will provide it.

The [Customer Solutions Platform repository](https://github.com/Geofflew/customer-solutions-platform) provides runnable calculations, assignment handlers, tests, and generated views over synthetic records. It implements configurable rules over registered signals, membership review, and confirmed assignments. Segment-triggered play execution is a design extension; the generated pages illustrate the workflows over synthetic records.
