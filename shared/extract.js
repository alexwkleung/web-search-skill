// Runs in the search results page. web.mjs and python/web.py both evaluate it as `(<this file>)(max)`.
//
// Structure-agnostic on purpose: every visible link, filtered, deduped, two per host. No
// result-card selectors, so a redesign degrades quality instead of silently emptying the results.
max => {
  const clean = s => (s || '').replace(/\s+/g, ' ').trim();
  const visible = el => {
    const r = el.getBoundingClientRect();
    const st = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && st.display !== 'none' && st.visibility !== 'hidden';
  };
  const own = /(^|\.)(brave\.com|search\.brave\.com)$/;
  // Brave ends some result anchors with a date line, which would otherwise be read as the title.
  const dateLine =
    /^(?:(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\.? \d{1,2},? \d{4}|\d+ (?:second|minute|hour|day|week|month|year)s? ago)$/i;
  const titleOf = a => {
    const lines = (a.innerText || '').split('\n').map(clean).filter(Boolean);
    const named = lines.filter(l => !dateLine.test(l));
    return named.length ? named[named.length - 1] : '';
  };
  const snippetFor = (a, title) => {
    const anchorText = clean(a.innerText || '');
    let node = a.parentElement;
    for (let depth = 0; node && depth < 4; depth++, node = node.parentElement) {
      if (node.querySelectorAll('a[href]').length > 3) break;
      const full = clean(node.innerText || '');
      if (full.length <= anchorText.length + 40) continue;
      const body = clean(full.split(anchorText).join(' ').split(title).join(' '));
      if (body.length >= 20) return body.slice(0, 300);
    }
    return '';
  };
  const seen = new Set();
  const perHost = new Map();
  const results = [];
  for (const a of document.querySelectorAll('a[href]')) {
    if (results.length >= max) break;
    if (!visible(a)) continue;
    const title = titleOf(a);
    if (title.length < 8) continue;
    let u;
    try { u = new URL(a.href); } catch { continue; }
    if (!/^https?:$/.test(u.protocol) || own.test(u.hostname)) continue;
    const key = u.hostname + u.pathname;
    if (seen.has(key)) continue;
    const used = perHost.get(u.hostname) || 0;
    if (used >= 2) continue;
    perHost.set(u.hostname, used + 1);
    seen.add(key);
    results.push({ title: title.slice(0, 180), url: u.href, snippet: snippetFor(a, title) });
  }
  return JSON.stringify({
    results,
    anchors: document.querySelectorAll('a[href]').length,
    blocked: /verifying you|not a bot|unusual traffic|are you a robot|verify you are human|complete the security check|captcha/i
      .test(document.body ? document.body.innerText : ''),
  });
}
