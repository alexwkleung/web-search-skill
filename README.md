# web-search-skill

A web search and page-reading skill for coding agents. It drives a real Chrome over the DevTools protocol instead of a search API: there are no keys, and nothing to self-host.

```bash
./web.sh search "vitest fake timers"
./web.sh read https://vitest.dev/guide/mocking
```

Searches go through Brave, which links results directly where Google and Bing route every link through a tracking redirect. The browser runs minimized on a profile of its own, which is what keeps bot checks rare. When a check does appear, the window comes up for you to solve it once, and the same search then finishes. `read` loads the page in that browser and turns it into markdown with [defuddle](https://github.com/kepano/defuddle), which runs inside the page. Its browser bundle is vendored in `vendor/` (see [Updating defuddle](#updating-defuddle)).

macOS first. Linux should work, but it's untested, and the Chrome window is visible there. Windows isn't supported yet.

## Install

Clone it into a folder named `web-search` in a directory your agent loads skills from:

```bash
# pi and OpenCode both load ~/.agents/skills/
git clone https://github.com/alexwkleung/web-search-skill ~/.agents/skills/web-search

# Claude Code (OpenCode reads this one too)
git clone https://github.com/alexwkleung/web-search-skill ~/.claude/skills/web-search
```

There's nothing to install beyond that, and no packages.

### Requirements

- Chrome or Chromium
- Node 22 or newer, **or** Python 3.9 or newer (the Python version is experimental)

### Node or Python

The agent runs `web.sh`, which picks one for it:

- Node 22 or newer installed: `web.mjs`
- otherwise: `python/web.py`

To always use one, set `WEB_SEARCH_RUNTIME` in the environment your agent runs in:

```bash
export WEB_SEARCH_RUNTIME=python   # or node, in ~/.zshrc or ~/.bashrc

WEB_SEARCH_RUNTIME=python claude   # or for one session (pi, opencode, ...)
```

Restart the agent after changing it. If your agent isn't started from a terminal (a desktop app or IDE extension), set it in the agent's own settings instead, for example `env` in Claude Code's `settings.json`.

Both give the same output and share the same Chrome profile, so switching doesn't bring back bot checks you've already solved. They also run the same code inside the page (`shared/extract.js` and `vendor/defuddle.js`).

## Using it

It's most useful in agents with no web search of their own, which is most local-model setups. Where the agent has a built-in search tool (Claude Code does), the agent will usually use that instead, and this skill is still there for pages that block plain fetching, or when you ask for it.

See [`SKILL.md`](SKILL.md) for what the agent reads.

## Updating defuddle

`vendor/defuddle.js` is defuddle's browser bundle, currently 0.19.5 (MIT, see `vendor/defuddle.LICENSE`). To update it, download a newer version over it:

```bash
curl -fL https://unpkg.com/defuddle@<version>/dist/index.full.js -o vendor/defuddle.js
```

Then check that `read` still works. A major version could change defuddle's API, and then the small wrapper that calls it, in both `web.mjs` and `python/web.py`, has to change too.

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
