---
title: "[Faction Name]"
type: faction
world: Example World
alignment: Neutral
status: active
tags:
  - faction
created: 2026-01-01
---

# [Faction Name]

> [!info]
> **Alignment:** `=this.alignment` | **Status:** `=this.status`

## Overview
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

## Goals
- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
- Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
- Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

## Methods
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.

## Resources & Reach
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.

## Leadership
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.

## History
Sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

---

## Members

```dataview
TABLE role, status, location
FROM "Worlds/Example World/NPCs"
WHERE type = "npc" AND faction = "[Faction Name]"
SORT role ASC
```

## Session Appearances

```dataview
TABLE date, campaign, session_number
FROM "Worlds/Example World/Campaigns"
WHERE type = "session" AND contains(file.content, "[Faction Name]")
SORT date ASC
```
