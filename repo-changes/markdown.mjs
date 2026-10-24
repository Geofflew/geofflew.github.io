import { marked } from 'marked';

const origin = 'https://geofflew.github.io';
const absolute = path => new URL(path, origin).href;
const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
const decode = text => text.replace(/&(amp|lt|gt|quot|apos|#39);/g,
  (_, name) => ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", '#39': "'" })[name]);
const escapeLabel = text => decode(text).replace(/([\\\[\]])/g, '\\$1');

// The article sources use HTML figures for layout. Keep their descriptive alt
// text and captions in the plain Markdown edition, without the layout markup.
function figureMarkdown(figure, slug, number) {
  if (/<svg\b/.test(figure)) {
    const label = attribute(figure.match(/<svg\b[^>]*>/)[0], 'aria-label');
    const caption = figure.match(/<figcaption>([\s\S]*?)<\/figcaption>/)?.[1];
    if (!label || !caption) throw new Error('SVG figure requires a description and caption');
    return `Diagram ${number}: ${escapeLabel(label)}\n\n${decode(caption)}\n\n[View original diagram](${origin}/${slug}/#diagram-${number})`;
  }
  const images = [...figure.matchAll(/<img\b[^>]*>/g)];
  const caption = figure.match(/<figcaption>([\s\S]*?)<\/figcaption>/)?.[1];
  if (images.length !== 1 || !caption) throw new Error('Expected one image and caption per figure');
  const src = attribute(images[0][0], 'src');
  const alt = attribute(images[0][0], 'alt');
  if (!src || !alt?.trim()) throw new Error('Every figure needs an image URL and descriptive alt text');
  const text = caption
    .replace(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g,
      (_, href, label) => `[${escapeLabel(label)}](${absolute(decode(href))})`)
    .replace(/<strong>([\s\S]*?)<\/strong>/g, '**$1**')
    .replace(/<em>([\s\S]*?)<\/em>/g, '*$1*');
  if (/<\/?[a-z][^>]*>/i.test(text)) throw new Error('Unsupported figure caption markup');
  return `![${escapeLabel(alt)}](${absolute(decode(src))})\n\n${decode(text)}`;
}

export function readableMarkdown(source, slug) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Invalid article slug');
  // This article's untouched inline SVGs contain blank lines, so Markdown's
  // block lexer can split a figure. Convert its known visual blocks first.
  if (slug === 'strategy-like-math') {
    let diagram = 0;
    source = source.replace(/<figure>[\s\S]*?<\/figure>/g,
      figure => figureMarkdown(figure, slug, ++diagram));
  }
  let figureNumber = 0;
  const body = marked.lexer(source).map(token => {
    // Do not alter examples inside fenced or indented code blocks.
    if (token.type === 'code') return token.raw;
    const rewrite = raw => raw
      .replace(/<figure\b[^>]*>[\s\S]*?<\/figure>/g, figure => figureMarkdown(figure, slug, ++figureNumber))
      .replace(/\]\((\/(?!\/)[^\s)]*)(?=[\s)])/g, (_, path) => `](${absolute(path)}`);
    const codeSpans = [];
    marked.walkTokens([token], child => {
      if (child.type === 'codespan') codeSpans.push(child.raw);
    });
    let cursor = 0;
    let result = '';
    for (const code of codeSpans) {
      const start = token.raw.indexOf(code, cursor);
      result += rewrite(token.raw.slice(cursor, start)) + code;
      cursor = start + code.length;
    }
    return result + rewrite(token.raw.slice(cursor));
  }).join('');
  const title = body.match(/^# .+\n/);
  if (!title) throw new Error('Article must start with a Markdown title');
  const canonical = `${origin}/${slug}/`;
  return `${title[0]}\nBy Geoffrey Lew\n\nCanonical article: [${canonical}](${canonical})\n\n${body.slice(title[0].length).trimStart().trimEnd()}\n`;
}
