---
title: <% tp.file.title %>
type: world
status: active
tags:
  - world
created: <% tp.date.now("YYYY-MM-DD") %>
---

# <% tp.file.title %>

> [!info] World Summary
> Brief description of this world — tone, setting, era.

## Overview

## Cosmology & Planes

## History

## Geography

---

## Campaigns

```dataview
TABLE status, system
FROM "Worlds/<% tp.file.title %>/Campaigns"
WHERE type = "campaign"
SORT status ASC
```

## Locations

```dataview
TABLE region
FROM "Worlds/<% tp.file.title %>/Locations"
WHERE type = "location"
SORT file.name ASC
```

## Factions

```dataview
TABLE alignment, status
FROM "Worlds/<% tp.file.title %>/Factions"
WHERE type = "faction"
SORT file.name ASC
```

## NPCs

```dataview
TABLE role, location, faction, status
FROM "Worlds/<% tp.file.title %>/NPCs"
WHERE type = "npc"
SORT role ASC
```

## Items

```dataview
TABLE rarity, owner
FROM "Worlds/<% tp.file.title %>/Items"
WHERE type = "item"
SORT rarity ASC
```
