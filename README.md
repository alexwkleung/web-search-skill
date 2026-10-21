# web-search-skill

A web search and page-reading skill for coding agents. It drives a real Chrome over the DevTools protocol instead of a search API: there are no keys, and nothing to self-host.

```bash
node web.mjs search "vitest fake timers"
node web.mjs read https://vitest.dev/guide/mocking
```

Searches go through Brave, which links results directly where Google and Bing route every link through a tracking redirect. The browser runs minimized on a profile of its own, which is what keeps bot checks rare. When a check does appear, the window comes up for you to solve it once, and the same search then finishes. `read` loads the page in that browser and turns it into markdown with [defuddle](https://github.com/kepano/defuddle).

macOS first. On Linux it works, but the Chrome window is visible.

## Install

Clone it into a folder named `web-search` in a directory your agent loads skills from:

```bash
# pi and OpenCode both load ~/.agents/skills/
git clone https://github.com/alexwkleung/web-search-skill ~/.agents/skills/web-search

# Claude Code (OpenCode reads this one too)
git clone https://github.com/alexwkleung/web-search-skill ~/.claude/skills/web-search
```

Then run `npm install` in it once, which `read` needs. `search` has no dependencies. Requires Node 22 or newer.

It's most useful in agents with no web search of their own, which is most local-model setups. Where the agent has a built-in search tool (Claude Code does), the agent will usually use that instead, and this skill is still there for pages that block plain fetching, or when you ask for it.

See [`SKILL.md`](SKILL.md) for what the agent reads.

## Status and bugs

This is new, and so far it's been tested on one machine: macOS with Chrome. It drives a real browser and reads a live search page, so it can break when Chrome, macOS or Brave change. If something doesn't work, [open an issue](https://github.com/alexwkleung/web-search-skill/issues) and include:

- your OS and Chrome (or Chromium) version, and your Node version
- the command you ran, its output and its exit code
- which agent ran it, if it wasn't you

Reports from Linux, and from agents running local models, are especially useful.

## Support

If this is useful to you, you can [buy me a coffee on Ko-fi](https://ko-fi.com/U6U21EB7NZ). It came out of [Reika](https://github.com/alexwkleung/reika), a coding agent designed for small local models.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/U6U21EB7NZ)
