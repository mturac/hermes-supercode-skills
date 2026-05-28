# Design: hermes-skills CLI

**Date:** 2026-05-28  
**Status:** Approved

## Summary

An npm-published Node.js CLI (`npx hermes-skills`) that installs, updates, and manages Hermes SuperCode Skills into Claude Code's skills directory. Zero dependencies, ESM, cross-platform.

## Architecture

```
hermes-supercode-skills/
├── bin/
│   └── hermes-skills.js      ← CLI entry point (#!/usr/bin/env node)
├── lib/
│   ├── installer.js           ← install/add/remove logic
│   ├── updater.js             ← GitHub fetch + version check
│   ├── config.js              ← ~/.hermesrc read/write
│   └── registry.js            ← skill manifest (names, paths, descriptions)
└── package.json               ← bin: { "hermes-skills": "./bin/hermes-skills.js" }
```

## Commands

| Command | Action |
|---------|--------|
| `npx hermes-skills install` | Install all 13 skills → `~/.claude/skills/` |
| `npx hermes-skills install --local` | Install to `./.claude/skills/` |
| `npx hermes-skills add <skill>` | Install single skill globally |
| `npx hermes-skills add <skill> --local` | Install single skill locally |
| `npx hermes-skills list` | Show installed skills + versions |
| `npx hermes-skills update` | Pull latest from GitHub, update all installed |
| `npx hermes-skills update <skill>` | Update specific skill |
| `npx hermes-skills remove <skill>` | Remove a skill |
| `npx hermes-skills info <skill>` | Show skill description + trigger phrases |

## Config (~/.hermesrc)

```json
{
  "version": "1.0.0",
  "installed": {
    "db-whisperer": { "installedAt": "2026-05-28", "target": "global", "sha": "abc123" },
    "auth-architect": { "installedAt": "2026-05-28", "target": "local", "sha": "def456" }
  }
}
```

## Data Flow

install → fetch manifest from GitHub API → copy SKILL.md + references/ → write ~/.hermesrc entry → confirm

update → compare stored SHA vs latest GitHub SHA → download changed skills only

## Error Handling

- Missing target dir → auto-create with mkdir -p
- Network failure → graceful error, suggest manual install
- Skill not found → list available skills
- Already installed → show current version, suggest `update`

## npm Publishing

```json
"bin": { "hermes-skills": "./bin/hermes-skills.js" },
"version": "1.0.0",
"type": "module",
"engines": { "node": ">=18" }
```

`npm publish` → `npx hermes-skills` works immediately.
