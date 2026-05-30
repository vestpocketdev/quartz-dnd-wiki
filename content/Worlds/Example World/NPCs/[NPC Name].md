---
title: "[NPC Name]"
type: npc
world: Example World
role: ally
status: alive
location: "[Location Name]"
faction: "[Faction Name]"
tags:
  - npc
created: 2026-01-01
---

# [NPC Name]

> [!info]
> **Role:** `=this.role` | **Status:** `=this.status` | **Faction:** `=this.faction` | **Location:** `=this.location`

## Description

### Appearance
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

### Personality
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

### Voice / Mannerisms
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

## Background
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

## Goals & Motivations
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.

## Relationship to Party
Sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Secrets
- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
- Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

---

## Session Appearances

```dataview
TABLE date, session_number, campaign
FROM "Worlds/Example World/Campaigns"
WHERE type = "session" AND contains(file.content, "[NPC Name]")
SORT date ASC
```
