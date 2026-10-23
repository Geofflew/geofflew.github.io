/* Progressive enhancement: nothing is hidden while waiting for JavaScript. */
(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;
  const targets = document.querySelectorAll('.masthead .writing, .masthead aside, .featured-copy, .featured-visual, .more-notes>h2, .entry, .reading article>h1, .reading article>h2, .reading figure.screen, .reading article>img');
  const seen = new WeakSet();
  const active = new Map();
  let observer;
  const cancel = () => {
    observer?.disconnect();
    for (const animation of active.values()) animation.cancel();
    active.clear();
  };
  const start = () => {
    cancel();
    if (preference.matches) return;
    observer = new IntersectionObserver(entries => {
      if (preference.matches) return;
      let stagger = 0;
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting || seen.has(target)) continue;
        seen.add(target);
        observer.unobserve(target);
        if (target.contains(document.activeElement)) continue;
        const animation = target.animate([
          { opacity: 0.65, transform: 'translateY(14px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 600, delay: Math.min(stagger++ * 70, 210), easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'none' });
        active.set(target, animation);
        animation.onfinish = animation.oncancel = () => active.delete(target);
      }
    }, { threshold: 0.08 });
    for (const target of targets) if (!seen.has(target)) observer.observe(target);
  };
  // A focused link never moves under the keyboard user's attention.
  document.addEventListener('focusin', event => {
    for (const [target, animation] of active) if (target.contains(event.target)) animation.cancel();
  });
  preference.addEventListener('change', start);
  start();
})();
