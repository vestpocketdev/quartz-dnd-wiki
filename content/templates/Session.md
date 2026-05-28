---
title: <% tp.file.title %>
type: session
campaign: <% tp.system.prompt("Campaign name") %>
world: <% tp.system.prompt("World name") %>
session_number: <% tp.system.prompt("Session number") %>
date: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - session
created: <% tp.date.now("YYYY-MM-DD") %>
---

# Session <% tp.system.prompt("Session number") %> — <% tp.file.title %>

**Date played:** <% tp.date.now("MMMM Do, YYYY") %>

## The Story So Far

> [!summary] Previously...
> One-sentence recap of last session.

## What Happened

## Key Decisions Made

## Cliffhanger / Next Time

---

## NPCs Encountered

```dataview
TABLE role, status
FROM "Worlds/<% tp.frontmatter.world %>/Campaigns/<% tp.frontmatter.campaign %>/NPCs"
WHERE contains(sessions, this.file.name)
```

## Locations Visited

## Items Found

## XP & Rewards
