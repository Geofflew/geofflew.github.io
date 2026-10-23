import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
const source=await readFile(new URL('../assets/motion.js',import.meta.url),'utf8');
const css=await readFile(new URL('../assets/style.css',import.meta.url),'utf8');
test('compatibility script has no observers, animations, focus cancellation or browser dependencies',()=>{
 vm.runInNewContext(source,{});
 assert.ok(!/IntersectionObserver|\.animate\(|addEventListener|\.cancel\(/.test(source));
});
test('no position, scaling, opacity reset or layout properties are animated',()=>{
 assert.ok(!/(?<![-\w])transform\s*:|\btranslate[XY]?\(|\bscale\(|@keyframes|opacity\s*:/.test(css));
 const declarations=[...css.matchAll(/transition:([^;}]+)/g)].map(m=>m[1]);
 for(const value of declarations){
  const properties=value.split(/,(?![^()]*\))/).map(v=>v.trim().split(/\s/)[0]);
  for(const property of properties)assert.ok(['color','text-decoration-color','background-color','box-shadow','border-color','none!important'].includes(property),property);
 }
});
test('font loading avoids late swap and reduced-motion disables feedback transitions',()=>{
 assert.match(css,/display=optional/);assert.ok(!css.includes('display=swap'));
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);assert.match(css,/transition:none!important/);
});
