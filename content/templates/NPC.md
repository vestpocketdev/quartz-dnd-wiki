---
title: <% tp.file.title %>
type: npc
world: <% tp.system.prompt("World name") %>
role: neutral
status: alive
location: 
faction: 
tags:
  - npc
created: <% tp.date.now("YYYY-MM-DD") %>
---

# <% tp.file.title %>

> [!info]
> **Role:** `=this.role` | **Status:** `=this.status` | **Faction:** `=this.faction` | **Location:** `=this.location`

## Description

### Appearance

### Personality

### Voice / Mannerisms

## Background

## Goals & Motivations

## Relationship to Party

## Secrets

---

## Session Appearances

```dataview
TABLE date, session_number, campaign
FROM "Worlds/<% tp.frontmatter.world %>/Campaigns"
WHERE type = "session" AND contains(file.content, "<% tp.file.title %>")
SORT date ASC
```
