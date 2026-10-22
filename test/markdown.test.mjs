import test from 'node:test';
import assert from 'node:assert/strict';
import { readableMarkdown } from '../markdown.mjs';

test('preserves article text and makes asset links portable', () => {
  const source = '# A field note\n\nSome **important** text.\n\n![A useful diagram](/assets/flow.svg)\n';
  const result = readableMarkdown(source, 'field-note');
  assert.ok(result.startsWith('# A field note\n\nBy Geoffrey Lew\n'));
  assert.ok(result.includes('Canonical article: [https://geofflew.github.io/field-note/](https://geofflew.github.io/field-note/)'));
  assert.ok(result.endsWith('Some **important** text.\n\n![A useful diagram](https://geofflew.github.io/assets/flow.svg)\n'));
});

test('retains figure alt text, captions and full-size links without layout HTML', () => {
  const result = readableMarkdown('# A field note\n\n<figure class="screen">\n<a href="/assets/flow.png"><img src="/assets/flow.png" alt="A &amp; B [review]"></a>\n<figcaption><strong>Review.</strong> Keep the evidence. <a href="/assets/flow.png">Full size</a></figcaption>\n</figure>\n', 'field-note');
  assert.ok(result.includes('![A & B \\[review\\]](https://geofflew.github.io/assets/flow.png)'));
  assert.ok(result.includes('**Review.** Keep the evidence. [Full size](https://geofflew.github.io/assets/flow.png)'));
  assert.ok(!result.includes('<figure'));
  assert.ok(!result.includes('<img'));
});

test('does not modify fenced code or external links', () => {
  const example = '```md\n![Example](/assets/example.svg)\n```';
  const result = readableMarkdown(`# A field note\n\n${example}\n\n[External](https://example.com/a?q=1)\n`, 'field-note');
  assert.ok(result.includes(example));
  assert.ok(result.includes('[External](https://example.com/a?q=1)'));
});

test('does not modify inline-code examples of Markdown links', () => {
  const example = '`![Example](/assets/example.svg)`';
  const result = readableMarkdown(`# A field note\n\nUse ${example}, then [read on](/next/).\n`, 'field-note');
  assert.ok(result.includes(example));
  assert.ok(result.includes('[read on](https://geofflew.github.io/next/)'));
});

test('rejects invalid slugs and figures without descriptive alt text', () => {
  assert.throws(() => readableMarkdown('# Title\n', '../bad'), /Invalid article slug/);
  assert.throws(() => readableMarkdown('# Title\n\n<figure><img src="/a.png"><figcaption>A caption</figcaption></figure>\n', 'field-note'), /descriptive alt/);
});
