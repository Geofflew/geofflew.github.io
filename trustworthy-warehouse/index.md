# A warehouse should preserve what the data means

By Geoffrey Lew

Canonical article: [https://geofflew.github.io/trustworthy-warehouse/](https://geofflew.github.io/trustworthy-warehouse/)

*When customer information is scattered across systems, bringing it together is only the beginning. The harder task is making sure an answer still means what the person asking intended.*

Someone responsible for helping customers wants to know where to spend their time. Which customers have barely started using the product? Which have stopped using it? Who might need help setting it up?

Answering requires more than an activity report. Contract records establish who is currently a customer. Account records identify them. Product records show what they have connected and what their users have done. Each source contributes part of the answer, but none contains the whole picture.

The practical question is how to turn those separate records into information people can act on without losing important distinctions along the way.

## Give related questions a shared foundation

A useful starting point is to agree on the facts that several questions will need. “Current customer” should not depend on which report someone opens. Nor should every report have to reconstruct a customer's contract history before it can calculate how long that relationship has lasted.

One way to organize this work is through three layers. **Bronze** keeps the source records. **Silver** derives shared definitions from them, such as current customers, first contract dates, and counts of active users. **Gold**, the business-facing layer, brings those definitions into views that reports can query.

![Separate source systems become retained records, shared definitions, and business-facing views.](https://geofflew.github.io/assets/warehouse-flow.svg)

For example, a renewal gives a customer a new contract start date. It does not make them a new customer. Silver exposes both the current contract date and the original signing date, so a report can choose the one its question needs. Other reports can reuse that decision rather than rebuilding the same history.

The layers are useful because of the distinctions they preserve. One particularly consequential distinction appears when a report tries to identify customers who have not connected the product to anything.

## Establish what “nothing found” means

Here, a connection links the product to another system, such as a bank, payroll provider, or ERP. A customer with no connections might need help with setup. To find those customers, the report needs a count of connections for each account.

Suppose there are 300 accounts, but the source supplying connection records observes only 30 of them. It says nothing about the remaining 270. If an account has no connection record, there are therefore two possible explanations: it was observed and had none, or it was outside the source's coverage.

Simply counting the records cannot distinguish those explanations. A report that assigns zero whenever it finds no matching connection would tell the customer team that all 270 unobserved accounts have connected nothing. That could turn a gap in measurement into a long, misleading list of customers needing setup help.

The missing information is a list of accounts the source actually observes. Store that list separately from the connections themselves. An account stays on the observation list even when it has no connections, which makes a measured zero distinguishable from an unknown count.

That distinction then determines the query. Silver calculates counts for accounts on the observation list. The business-facing account view adds those counts to the full account list with a `LEFT JOIN`: accounts outside coverage remain present, but their connection count is `NULL`, meaning unknown. Measured accounts with no connections receive zero.

If six of the observed accounts have no connections and the other 24 have at least one, the report should show six zeros, 24 positive counts, and 270 unknowns. Without the observation list, it would show 276 apparent zeros. The customer team can distinguish evidence of an incomplete setup from a question that requires more information.

Keeping that distinction in the shared view means other reports inherit it. A separate warning beside a zero would require every reader to remember an exception. Here the value itself preserves the uncertainty—as long as a later query does not replace `NULL` with zero again.

## Add information without losing customers

Connection setup is one reason a customer might need help. Another is low ongoing use. To investigate that, we need a definition of weak adoption. Suppose we want to find current customers with fewer than three reports viewed per active user in 30 days, or no active users at all.

Assuming activity is measured for these customers, the query first summarizes users active in the last 30 days. An account with no active users has no row in that summary. Here, the missing row follows from filtering activity records to active users. We have already established that these customers are measured, so the absence can be interpreted as no active users.

That creates a different trap. If the report keeps only customers with a matching activity-summary row, it excludes those with nobody active. In SQL, that is what an `INNER JOIN` does. Customers with no active users disappear before the report even evaluates whether adoption is weak.

The intended operation was to add activity information to the customer list. It was not to narrow the list. Make that intention explicit by declaring whether each query step adds information or deliberately filters customers. Then compare customer IDs before and after the step. Checking identities matters because equal row counts can conceal one customer disappearing and another arriving.

A left join preserves customers without active users, allowing the adoption rule to include them. This keeps two decisions separate: adding what we know about a customer, and deciding whether that customer belongs in the result.

There is a related reason to check the other direction: joins can repeat records as well as remove them. A $100 contract matched to two line items appears twice, and summing it after grouping produces $200. Checking table keys against join relationships can reveal where that repetition is possible. Combining records needs to preserve both the people represented and the values attached to them.

## Keep shared definitions open to correction

Shared definitions reduce repeated work, but they also spread mistakes. Recall the distinction between the first contract date and the current one. An onboarding report measures days from the customer's first signing to going live. Using the latest renewal date as its start can make that duration negative.

A date-order check can flag that impossible ordering. Instead of silently changing a negative duration to zero, record a finding that someone can investigate. Once the cause is established, the correction is to calculate from the first signing date.

That correction can follow a reviewable process: a person approves it, then the system applies the change and reruns the check in one database transaction. Save the change only if the check passes. Keeping one open finding per check also prevents repeated failures from creating duplicate work.

This does not prove that every definition is right. It gives a broken assumption a visible path from evidence to a reviewed correction, and lets reports using that definition benefit from the fix.

## Make the next question easier to answer

For the person deciding which customers need help, the benefit is a more useful list: customers are not labeled as having no connections merely because they were unobserved, and they do not disappear because nobody was active.

For the next report, the benefit is work already done. Customer history, coverage, and activity definitions can be reused and improved in one place. People spend less effort rebuilding the same logic and reconciling different interpretations.

A warehouse earns trust by retaining the distinctions people need to make decisions. Start with the decision, establish what the available observations can support, and make sure that meaning survives every step into the answer.

The [Trustworthy Warehouse repository](https://github.com/Geofflew/trustworthy-warehouse) contains a runnable implementation of these ideas, with synthetic data, SQL, and tests.
