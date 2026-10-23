# web-search-skill

A web search and page-reading skill for coding agents. It drives a real Chrome over the DevTools protocol instead of a search API: there are no keys, and nothing to self-host.

```bash
./web search "vitest fake timers"
./web read https://vitest.dev/guide/mocking
```

Searches go through Brave, which links results directly where Google and Bing route every link through a tracking redirect. The browser runs minimized on a profile of its own, which is what keeps bot checks rare. When a check does appear, the window comes up for you to solve it once, and the same search then finishes. `read` loads the page in that browser and turns it into markdown with [defuddle](https://github.com/kepano/defuddle), which runs inside the page. Its browser bundle is vendored in `vendor/` (MIT, see `vendor/defuddle.LICENSE`). To update it, copy `dist/index.full.js` from a newer `defuddle` package over `vendor/defuddle.js`.

macOS first. Linux should work, but it's untested, and the Chrome window is visible there. Windows isn't supported yet.

## Install

Clone it into a folder named `web-search` in a directory your agent loads skills from:

```bash
# pi and OpenCode both load ~/.agents/skills/
git clone https://github.com/alexwkleung/web-search-skill ~/.agents/skills/web-search

# Claude Code (OpenCode reads this one too)
git clone https://github.com/alexwkleung/web-search-skill ~/.claude/skills/web-search
```

There's nothing to install beyond that. It needs either Node 22 or newer, or Python 3.9 or newer, and no packages for either.

The agent runs `web`, a small launcher that uses `web.mjs` on Node and falls back to `python/web.py` (experimental) when Node 22+ isn't there. To always use one, set `WEB_SEARCH_RUNTIME=node` or `WEB_SEARCH_RUNTIME=python` in the environment your agent runs in. Both versions give the same output, and share the code that runs inside the page (`shared/extract.js` and `vendor/defuddle.js`) and the same Chrome profile.

It's most useful in agents with no web search of their own, which is most local-model setups. Where the agent has a built-in search tool (Claude Code does), the agent will usually use that instead, and this skill is still there for pages that block plain fetching, or when you ask for it.

See [`SKILL.md`](SKILL.md) for what the agent reads.

## Status and bugs

This is new, and so far it's been tested on one machine: macOS with Chrome. It drives a real browser and reads a live search page, so it can break when Chrome, macOS or Brave change. If something doesn't work, [open an issue](https://github.com/alexwkleung/web-search-skill/issues) and include:

- your OS and Chrome (or Chromium) version, and your Node version (or Python version, if you used `python/web.py`)
- the command you ran, its output and its exit code
- which agent ran it, if it wasn't you

Reports from Linux, and from agents running local models, are especially useful.

It's maintained on a best-effort basis, so replies and fixes may take a while.

## Support

If this is useful to you, you can [buy me a coffee on Ko-fi](https://ko-fi.com/U6U21EB7NZ). It came out of [Reika](https://github.com/alexwkleung/reika), a coding agent designed for small local models.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/U6U21EB7NZ)
