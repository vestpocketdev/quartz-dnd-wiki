---
title: Example World
type: world
status: active
tags:
  - world
created: 2026-01-01
---

# Example World

> [!info] World Summary
> Replace this with your world's tone, setting, and era. Delete this file when you create your real world using the World template.

## Overview

## Cosmology & Planes

## History

## Geography

---

## Campaigns

```dataview
TABLE status, system
FROM "Worlds/Example World/Campaigns"
WHERE type = "campaign"
SORT status ASC
```

## Locations

```dataview
TABLE region
FROM "Worlds/Example World/Locations"
WHERE type = "location"
SORT file.name ASC
```

## Factions

```dataview
TABLE alignment, status
FROM "Worlds/Example World/Factions"
WHERE type = "faction"
SORT file.name ASC
```

## NPCs

```dataview
TABLE role, location, faction, status
FROM "Worlds/Example World/NPCs"
WHERE type = "npc"
SORT role ASC
```

## Items

```dataview
TABLE rarity, owner
FROM "Worlds/Example World/Items"
WHERE type = "item"
SORT rarity ASC
```
