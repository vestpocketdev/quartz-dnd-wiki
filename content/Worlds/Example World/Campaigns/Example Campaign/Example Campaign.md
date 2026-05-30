---
title: Example Campaign
type: campaign
world: Example World
system: D&D 5e
status: active
dm: 
players: []
started: 2026-01-01
tags:
  - campaign
created: 2026-01-01
---

# Example Campaign

> [!info] Campaign Summary
> This is a brief few liner

## Party

| Character | Player | Race | Class |
|-----------|--------|------|-------|
|           |        |      |       |

## Story Arc

## Themes

## House Rules

---

## Sessions

```dataview
TABLE session_number, date, title
FROM "Worlds/Example World/Campaigns/Example Campaign/Sessions"
WHERE type = "session"
SORT session_number ASC
```
