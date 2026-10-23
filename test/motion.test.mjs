import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const css = await readFile(new URL('../assets/style.css', import.meta.url), 'utf8');
const home = await readFile(new URL('../index.html', import.meta.url), 'utf8');
test('introduces the journal before the author with one masthead and heading', () => {
 assert.equal((home.match(/class="masthead"/g)||[]).length,1);
 assert.ok(home.indexOf('<h1>')<home.indexOf('class="author"'));
 assert.match(home, /class="author">Geoffrey Lew<\/h2>/);
});
test('motion is brief, optional and never hides content or depends on JavaScript', () => {

 assert.match(css, /@media\(prefers-reduced-motion:reduce\)/);
 assert.match(css, /transition:none!important/);
 assert.ok(!/opacity:\s*0(?:[;}])|visibility:\s*hidden|infinite|transition:\s*all/.test(css));
 assert.match(home, /<script src="\/assets\/motion.js" defer><\/script>/);
 assert.match(css, /\.button:focus-visible/);
 assert.match(css, /@media\(hover:hover\) and \(pointer:fine\)/);
});
