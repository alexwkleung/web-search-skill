# web-search-skill

A web search and page-reading skill for coding agents. It drives a real Chrome over the DevTools protocol instead of a search API: there are no keys, and nothing to self-host.

```bash
node web.mjs search "vitest fake timers"
node web.mjs read https://vitest.dev/guide/mocking
```

Searches go through Brave, which links results directly where Google and Bing route every link through a tracking redirect. The browser runs minimized on a profile of its own, which is what keeps bot checks rare. When a check does appear, the window comes up for you to solve it once, and the same search then finishes. `read` loads the page in that browser and turns it into markdown with [defuddle](https://github.com/kepano/defuddle).

macOS first. On Linux it works, but the Chrome window is visible.

## Install

Copy this directory to wherever your agent loads skills from (for Claude Code, `~/.claude/skills/web-search/`). Then run `npm install` in it once, which `read` needs. `search` has no dependencies. Requires Node 22 or newer.

See [`SKILL.md`](SKILL.md) for what the agent reads.

## Support

If this is useful to you, you can [buy me a coffee on Ko-fi](https://ko-fi.com/alexwkleung). It came out of [Reika](https://github.com/alexwkleung/reika), a coding agent designed for small local models.

[![Ko-fi](https://img.shields.io/badge/Ko--fi-support-FF5E5B?logo=ko-fi&logoColor=white)](https://ko-fi.com/alexwkleung)
