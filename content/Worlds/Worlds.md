---
title: Worlds
type: hub
tags:
  - hub
---

# Worlds

All settings and campaign worlds.

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "Worlds"
WHERE type = "world"
SORT file.name ASC
```
