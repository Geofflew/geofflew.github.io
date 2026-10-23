import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
const source=await readFile(new URL('../assets/motion.js',import.meta.url),'utf8');
function setup(reduced=false,supported=true){
 const animations=[], observers=[], listeners={};
 const targets=Array.from({length:5},()=>({contains(node){return node===this},animate(frames,options){const a={frames,options,canceled:false,cancel(){this.canceled=true;this.oncancel?.()}};animations.push(a);return a}}));
 const pref={matches:reduced,addEventListener(_,fn){this.change=fn}};
 const document={activeElement:null,querySelectorAll(){return targets},addEventListener(event,fn){listeners[event]=fn}};
 class Observer{constructor(callback){this.callback=callback;this.observed=[];this.removed=[];observers.push(this)}observe(t){this.observed.push(t)}unobserve(t){this.removed.push(t)}disconnect(){this.disconnected=true}}
 const window={matchMedia(){return pref}};
 if(supported)window.IntersectionObserver=Observer;
 vm.runInNewContext(source,{window,document,Element:{prototype:{animate(){}}},IntersectionObserver:Observer,WeakSet,Map});
 return {animations,observers,targets,pref,document,listeners};
}
test('unsupported observer and initial reduced motion leave all content untouched',()=>{
 assert.equal(setup(false,false).observers.length,0);
 assert.equal(setup(true).observers.length,0);
});
test('visible sections reveal once with bounded stagger; offscreen sections remain untouched',()=>{
 const s=setup();const o=s.observers[0];
 o.callback([{target:s.targets[0],isIntersecting:false}]);assert.equal(s.animations.length,0);
 o.callback(s.targets.map(target=>({target,isIntersecting:true})));
 assert.deepEqual(s.animations.map(a=>a.options.delay),[0,70,140,210,210]);
 assert.ok(s.animations.every(a=>a.options.fill==='none'&&a.frames[0].opacity>0));
 o.callback([{target:s.targets[0],isIntersecting:true}]);assert.equal(s.animations.length,5);
});
test('changing reduced-motion preference cancels current animations and disconnects observation',()=>{
 const s=setup();const o=s.observers[0];o.callback([{target:s.targets[0],isIntersecting:true}]);
 s.pref.matches=true;s.pref.change();assert.ok(s.animations[0].canceled);assert.ok(o.disconnected);
 o.callback([{target:s.targets[1],isIntersecting:true}]);assert.equal(s.animations.length,1);
});
test('keyboard focus skips or cancels movement on the focused section',()=>{
 const s=setup();s.document.activeElement=s.targets[0];
 s.observers[0].callback(s.targets.slice(0,2).map(target=>({target,isIntersecting:true})));
 assert.equal(s.animations.length,1);s.listeners.focusin({target:s.targets[1]});assert.ok(s.animations[0].canceled);
});
