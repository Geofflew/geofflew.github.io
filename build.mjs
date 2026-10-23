import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { marked } from 'marked';
import { readableMarkdown } from './markdown.mjs';

const entries = [
  ['running-the-month-end-close-with-agents', 'AI in accounting', 'The seats stay. Every task still has a preparer and a reviewer, and the sign-off still carries a name and a timestamp.', null],
  ['building-the-trust-layer-for-ai', 'AI Perspectives · Field guide', 'Canonical records, explicit rules, and human review: a practical guide to customer context that people and AI can inspect.', null],
  ['state-of-ai', 'AI in accounting', 'What turns capable models into dependable accounting work: context, evidence, and authority.', null],
  ['conversation-as-an-app', 'Conversational interfaces', 'Turn an answer into an interactive view of the records behind it.'],
  ['trustworthy-warehouse', 'Data systems', 'Shared definitions that preserve what customer data means.'],
  ['ask-the-warehouse', 'AI and data', 'Carry business context from a question into a useful, inspectable answer.'],
  ['automation-system', 'Automation', 'Carry requests through planning, approval, execution, and recovery.'],
  ['call-transcript-search', 'Search and AI', 'Use HyDE to find how customers express an idea—and distinguish a shortlist from coverage.'],
  ['customer-solutions-platform', 'Customer systems', 'Turn customer records into explainable signals, meaningful changes, and specific follow-up.'],
];
const escape = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const shell = (title, description, body, article = false, markdownUrl = null) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escape(title)} · Geoffrey Lew</title><meta name="description" content="${escape(description)}">
<link rel="stylesheet" href="/assets/style.css"><link rel="icon" href="data:,">${markdownUrl ? `\n<link rel="alternate" type="text/markdown" title="Markdown" href="${markdownUrl}">` : ''}
</head><body><div class="page"><header><a class="brand" href="/"><span>g.</span> geoffrey_lew / notes</a><nav aria-label="Main navigation"><a href="/">Writing</a><a href="https://github.com/Geofflew">GitHub ↗</a></nav></header>
<main class="${article ? 'reading' : 'notebook'}">${body}</main><footer><span>© 2026 Geoffrey Lew</span><span>Data · AI · Automation</span></footer></div><script src="/assets/motion.js" defer></script></body></html>`;
const posts = [];
for (const [slug, category, description, repo = slug] of entries) {
  const source = await readFile(`posts/${slug}.md`, 'utf8');
  const title = source.match(/^# (.+)$/m)[1];
  const minutes = Math.ceil(source.split(/\s+/).length / 200);
  await mkdir(slug, { recursive: true });
  const markdownUrl = `/${slug}/index.md`;
  const body = `<a class="back" href="/">← All field notes</a><div class="eyebrow">${category} · ${minutes} min read · <a href="${markdownUrl}" type="text/markdown">Read Markdown</a></div><article${slug === 'running-the-month-end-close-with-agents' ? ' class="close-agents"' : ''}>${marked.parse(source)}</article><a class="back" href="/">← More field notes</a>`;
  await writeFile(`${slug}/index.html`, shell(title, description, body, true, markdownUrl));
  await writeFile(`${slug}/index.md`, readableMarkdown(source, slug));
  posts.push({ slug, category, description, title, minutes, repo });
}
const featured = posts.find(p => p.slug === 'building-the-trust-layer-for-ai');
if (!featured) throw new Error('The featured article is missing.');
const otherPosts = posts.filter(p => p.slug !== featured.slug);
const feature = `<section class="featured" aria-labelledby="featured-title"><div class="featured-copy"><div class="eyebrow feature-label">Featured field note</div><div class="eyebrow">${featured.category} · ${featured.minutes} min read</div><h2 id="featured-title"><a href="/${featured.slug}/">${escape(featured.title)}</a></h2><p>Reliable AI needs reliable information. How canonical records, explicit rules, and human review turn scattered customer data into answers people and agents can inspect.</p><a class="button" href="/${featured.slug}/">Read article <span aria-hidden="true">→</span></a></div><figure class="featured-visual"><a href="/assets/trust-layer-1.png" aria-label="View the trust-layer diagram at full size"><img src="/assets/trust-layer-1.png" alt="Source systems feed a trust layer of seven customer entities, with evidence receipts, shared by reports, AI agents, internal apps, and operations review." width="1536" height="1024" fetchpriority="high" decoding="async"></a><figcaption>A shared customer model, with evidence behind each record. <a href="/assets/trust-layer-1.png">View diagram <span aria-hidden="true">↗</span></a></figcaption></figure></section>`;
const listing = otherPosts.map((p, i) => `<section class="entry"><span class="number" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><div><div class="eyebrow">${p.category} · ${p.minutes} min read</div><h3><a href="/${p.slug}/">${escape(p.title)}</a></h3><p>${p.description}</p><a class="read-link" href="/${p.slug}/">Read article <span aria-hidden="true">→</span></a>${p.repo ? `<a class="repo" href="https://github.com/Geofflew/${p.repo}">Code / ${p.repo} ↗</a>` : ''}</div></section>`).join('\n');
const home = `<section class="masthead" aria-label="About this journal"><div class="writing"><div class="eyebrow">A working journal</div><h1>How it works.<br><em>Why it matters.</em></h1></div><aside><h2 class="author">Geoffrey Lew</h2><p>Notes on building data systems and automation that people can use.</p><a href="https://github.com/Geofflew">Code ↗</a></aside></section>${feature}<section class="more-notes" aria-labelledby="more-notes-title"><h2 id="more-notes-title" class="eyebrow">More field notes</h2>${listing}</section>`;
await writeFile('index.html', shell('Field notes', 'Engineering field notes on data, AI, and automation by Geoffrey Lew.', home));
await writeFile('.nojekyll', '');
console.log(`Built homepage and ${posts.length} full articles in HTML and Markdown.`);

