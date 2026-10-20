# A conversational answer can become a place to work

*Conversation helps someone ask for information. A small interactive view can help them examine the answer without turning every follow-up into another message.*

“How much did we spend in September?” is a useful starting question. A person wants an overview, so a total and a breakdown by category may be enough to orient them. But the answer often creates a more specific question: what is inside the travel total?

At that point, the category is already visible. Asking the person to type another sentence means translating an obvious selection back into language. They may also have to reconcile the new response with the earlier one, especially if the conversation now contains several summaries and lists.

An interactive view can keep that investigation together. The person sees the summary, selects a category, and inspects its contributing records. The challenge is connecting that interaction to the same data and calculation that produced the original answer.

![A tool returns text and structured data to an interactive view; selecting a category requests its contributing records through the host.](/assets/conversation-app-flow.png)

## Give the answer a structure the interface can use

A sentence such as “Travel accounted for part of September spending” is understandable to a reader, but it is a weak interface contract. A chart needs a category identifier, an amount, a currency, and perhaps the number of records behind the amount. A follow-up request needs to name the same category unambiguously.

Return those values as structured data alongside readable text. Both presentations should come from one calculation. If the text describes one total while the interface calculates another from a different selection, a polished chart only makes the inconsistency harder to notice.

For spending, integer cents offer a simple representation. The server sums the records and returns each category's total and record count. The interface formats those amounts and uses the proportions to draw bars. It does not assign transactions to categories or infer detail from the shape of the chart.

The text remains useful. A client without support for interactive views can still show the answer. Someone inspecting the protocol can read it directly. Structured data adds another presentation without requiring the ordinary answer to disappear.

## Connect a tool to an application resource

The Model Context Protocol, or MCP, gives a host a way to discover and invoke tools. MCP Apps extends that interaction by associating a tool with a user interface resource. The tool declares a resource URI in its metadata; the server registers the HTML available at that URI. An app-capable host can read the resource and display it when the tool returns. The [official MCP Apps quickstart](https://apps.extensions.modelcontextprotocol.io/api/documents/Quickstart.html) describes this tool-and-resource relationship.

This separates three responsibilities. The server calculates the answer. The resource supplies the interface that knows how to present it. The host connects them, delivers the tool result, and manages the app's communication.

The HTML can include its bundled JavaScript, so displaying the view does not require it to download a charting library from another site. A few category buttons with proportional bars are enough for the spending question. The value lies in what someone can do with the answer, rather than in the complexity of the visualization.

The host still matters. Registering an HTML resource does not make every MCP client capable of rendering it. A text-only client receives the ordinary response; an app-capable host also carries the interaction. Keeping those paths separate makes the integration easier to reason about and test.

## Let a selection request its own evidence

When the person selects Travel, the view sends a tool request through the host. The request names the category. The server validates that value, selects the matching records, and returns their IDs, dates, descriptions, and amounts.

The view should not manufacture those records from the summary or assume that a cached list belongs to the selected category. A total can be represented in many ways; only the underlying records explain why it has that value.

A useful check is to compare the returned detail total with the selected summary total before displaying it. In a fixed dataset they should agree exactly. If they differ, show that disagreement rather than displaying records as though they explain the earlier number. A live system might need a version or snapshot identifier as well, because its data can change between requests.

This makes a category button more than a navigation device. It carries the person's selection into a specific server operation, and the response provides evidence that can be checked against the answer they started from.

The server should also reject categories it does not recognize. Silently treating an invalid value as “all expenses” would produce plausible rows for the wrong request. A narrow input schema is useful here because the permitted action is narrow: inspect one known category, without changing any records.

## Keep the latest interaction in charge

Even this small view has asynchronous behavior. Someone can select Travel and then Software before the first request returns. If the travel response arrives last and blindly replaces the table, the interface shows the wrong evidence under the person's latest choice.

Give each request a sequence number. When a response returns, compare its number with the most recent request and ignore it if it has been superseded. This does not cancel the server's read; it prevents an old result from becoming the current presentation.

Clear the previous rows when a new selection starts. Otherwise, an error or slow response can leave old records visible beneath a new heading. A loading message and a visible error state are part of explaining what the interface currently knows, rather than decorative status indicators.

The same care applies to layout. If selecting a category makes the app taller, the host needs to accommodate that change so the bottom records do not vanish inside an unexpectedly clipped view. An app-to-host size notification gives the host a concrete signal to resize its frame.

These decisions are small, but they preserve the connection between the person's action and the evidence on screen. Without them, the server can return the correct data while the overall interaction still misleads.

## Preserve the connection back to the server

The view does not need direct access to a database. It asks the host to call the permitted inspection tool. The host can restrict which tools the app may request, while the server independently validates the arguments it receives. Tool visibility metadata expresses the intended caller; it should not be mistaken for a replacement for validation.

That division also makes testing concrete. Discover the tool, read its declared resource, call the summary, and inspect every category through the actual protocol. Verify that the detail records reconcile to their category totals and that those totals reconcile to the summary. Then inspect the browser interaction separately: the protocol result and the rendered state are related, but they are not the same test.

For the person using it, the benefit is continuity. They can begin with a question, follow a surprising amount into its records, and compare the evidence without restating the task at every step. Conversation opens the investigation; the interface gives it somewhere to continue.

The [Conversation as an App companion repository](https://github.com/Geofflew/conversation-as-an-app) contains a genuine MCP server, an interactive HTML resource, and a local learning host over seeded synthetic spending. The host makes a fixed initial tool call rather than running an LLM, so the complete tool-to-view-to-records flow runs without an external account or model key.
