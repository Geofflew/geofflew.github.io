import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { marked } from 'marked';

const entries = [
  ['trustworthy-warehouse', 'Data systems', 'Shared definitions that preserve what customer data means.'],
  ['ask-the-warehouse', 'AI and data', 'Carry business context from a question into a useful, inspectable answer.'],
  ['automation-system', 'Automation', 'Carry requests through planning, approval, execution, and recovery.'],
];
const escape = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const shell = (title, description, body, article = false) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escape(title)} · Geoffrey Lew</title><meta name="description" content="${escape(description)}">
<link rel="stylesheet" href="/assets/style.css"><link rel="icon" href="data:,">
</head><body><div class="page"><header><a class="brand" href="/"><span>g.</span> geoffrey_lew / notes</a><nav aria-label="Main navigation"><a href="/">Writing</a><a href="https://github.com/Geofflew">GitHub ↗</a></nav></header>
<main class="${article ? 'reading' : 'notebook'}">${body}</main><footer><span>© 2026 Geoffrey Lew</span><span>Data · AI · Automation</span></footer></div></body></html>`;
const posts = [];
for (const [slug, category, description] of entries) {
  const source = await readFile(`posts/${slug}.md`, 'utf8');
  const title = source.match(/^# (.+)$/m)[1];
  const minutes = Math.ceil(source.split(/\s+/).length / 200);
  await mkdir(slug, { recursive: true });
  const body = `<a class="back" href="/">← All field notes</a><div class="eyebrow">${category} · ${minutes} min read</div><article>${marked.parse(source)}</article><a class="back" href="/">← More field notes</a>`;
  await writeFile(`${slug}/index.html`, shell(title, description, body, true));
  posts.push({ slug, category, description, title, minutes });
}
const listing = posts.map((p, i) => `<section class="entry"><span class="number">0${i + 1}</span><div><div class="eyebrow">${p.category} · ${p.minutes} min read</div><h2><a href="/${p.slug}/">${escape(p.title)}</a></h2><p>${p.description}</p><a class="button" href="/${p.slug}/">Read the essay →</a><a class="repo" href="https://github.com/Geofflew/${p.slug}">Code / ${p.slug} ↗</a></div></section>`).join('\n');
const home = `<aside><div class="eyebrow">A working journal</div><h2 class="author">Geoffrey<br>Lew</h2><p>Notes on building data systems and automation that people can use.</p><a href="https://github.com/Geofflew">Code ↗</a></aside><div class="writing"><div class="eyebrow">Ideas with implementations</div><h1>How it works.<br><em>Why it matters.</em></h1>${listing}</div>`;
await writeFile('index.html', shell('Field notes', 'Engineering field notes on data, AI, and automation by Geoffrey Lew.', home));
await writeFile('.nojekyll', '');
console.log('Built homepage and three full articles.');
