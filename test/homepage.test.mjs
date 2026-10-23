import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

const home = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../assets/style.css', import.meta.url), 'utf8');
const feature = home.match(/<section class="featured"[\s\S]*?<\/section>/)?.[0];
const sourceFiles = (await readdir(new URL('../posts/', import.meta.url))).filter(p => p.endsWith('.md'));

test('features the trust-layer article once, with an image and a clear article link', () => {
  assert.ok(feature);
  assert.equal((home.match(/class="featured"/g) || []).length, 1);
  assert.match(feature, /id="featured-title"/);
  assert.match(feature, /<h2[^>]*><a href="\/building-the-trust-layer-for-ai\/">Building the trust layer for AI<\/a><\/h2>/);
  assert.match(feature, /<img [^>]*alt="[^"]+"[^>]*width="1536"[^>]*height="1024"/);
  assert.match(feature, /class="button" href="\/building-the-trust-layer-for-ai\/">Read article/);
  assert.match(feature, /href="\/assets\/trust-layer-1.png"/);
  assert.ok(!home.slice(home.indexOf('class="more-notes"')).includes('building-the-trust-layer-for-ai'));
});

test('keeps all nine articles in the index and their HTML and Markdown editions', async () => {
  assert.equal(sourceFiles.length, 9);
  assert.equal((home.match(/class="entry"/g) || []).length, 8);
  assert.equal((home.match(/<h1>/g) || []).length, 1);
  for (const filename of sourceFiles) {
    const slug = filename.slice(0, -3);
    assert.ok(home.includes(`href="/${slug}/"`));
    const html = await readFile(new URL(`../${slug}/index.html`, import.meta.url), 'utf8');
    assert.ok(html.includes(`href="/${slug}/index.md"`));
    const md = await readFile(new URL(`../${slug}/index.md`, import.meta.url), 'utf8');
    assert.ok(md.includes(`Canonical article: [https://geofflew.github.io/${slug}/]`));
  }
});

test('retains every companion-repository link', () => {
  for (const slug of ['conversation-as-an-app', 'trustworthy-warehouse', 'ask-the-warehouse', 'automation-system', 'call-transcript-search', 'customer-solutions-platform']) {
    assert.ok(home.includes(`href="https://github.com/Geofflew/${slug}"`));
  }
});

test('provides a responsive uncropped image and keyboard focus styling', () => {
  assert.match(css, /\.featured-visual img\{[^}]*width:100%;height:auto/);
  assert.ok(!css.includes('object-fit:cover'));
  assert.match(css, /@media\(max-width:700px\)/);
  assert.match(css, /a:focus-visible\{[^}]*outline:/);
});
