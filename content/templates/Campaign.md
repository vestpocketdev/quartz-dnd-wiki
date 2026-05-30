---
title: <% tp.file.title %>
type: campaign
world: <% tp.system.prompt("World name") %>
system: D&D 5e
status: active
dm: 
players: []
cover: 
started: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - campaign
created: <% tp.date.now("YYYY-MM-DD") %>
---

# <% tp.file.title %>

> [!info] Campaign Summary
> One-paragraph pitch for this campaign.

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
FROM "Worlds/<% tp.frontmatter.world %>/Campaigns/<% tp.file.title %>/Sessions"
WHERE type = "session"
SORT session_number ASC
```
