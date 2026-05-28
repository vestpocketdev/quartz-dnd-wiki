---
title: <% tp.file.title %>
type: faction
world: <% tp.system.prompt("World name") %>
alignment: 
status: active
tags:
  - faction
created: <% tp.date.now("YYYY-MM-DD") %>
---

# <% tp.file.title %>

> [!info]
> **Alignment:** `=this.alignment` | **Status:** `=this.status`

## Overview

## Goals

## Methods

## Resources & Reach

## Leadership

## History

---

## Members

```dataview
TABLE role, status, location
FROM "Worlds/<% tp.frontmatter.world %>/NPCs"
WHERE type = "npc" AND faction = "<% tp.file.title %>"
SORT role ASC
```

## Session Appearances

```dataview
TABLE date, campaign, session_number
FROM "Worlds/<% tp.frontmatter.world %>/Campaigns"
WHERE type = "session" AND contains(file.content, "<% tp.file.title %>")
SORT date ASC
```
