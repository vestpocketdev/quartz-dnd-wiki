---
title: <% tp.file.title %>
type: location
world: <% tp.system.prompt("World name") %>
region: <% tp.system.prompt("Region or parent location") %>
tags:
  - location
created: <% tp.date.now("YYYY-MM-DD") %>
---

# <% tp.file.title %>

> [!info]
> **Region:** `=this.region` | **World:** `=this.world`

## Description

### Atmosphere

### Notable Features

## History

## Points of Interest

## NPCs Here

```dataview
TABLE role, status, faction
FROM "Worlds/<% tp.frontmatter.world %>/NPCs"
WHERE type = "npc" AND location = "<% tp.file.title %>"
```

## Sessions Visited

```dataview
TABLE date, campaign, session_number
FROM "Worlds/<% tp.frontmatter.world %>/Campaigns"
WHERE type = "session" AND contains(file.content, "<% tp.file.title %>")
SORT date ASC
```
