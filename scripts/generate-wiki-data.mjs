import { globby } from 'globby'
import { readFileSync, writeFileSync } from 'fs'
import matter from 'gray-matter'
import path from 'path'

const CONTENT = 'content'
const OUT = 'content/wiki-data.json'

// Quartz slugifies spaces as hyphens, preserves case and brackets.
const toHref = (file) => file
  .replace(`${CONTENT}/`, '')
  .replace(/\.md$/, '')
  .split('/')
  .map(s => s.replace(/ /g, '-'))
  .join('/')

// ── Campaigns ────────────────────────────────────────────────────────────────

const campaignFiles = await globby(`${CONTENT}/Worlds/**/Campaigns/**/*.md`, {
  ignore: [`${CONTENT}/**/Sessions/**`, `${CONTENT}/templates/**`],
})

const campaigns = []

for (const file of campaignFiles) {
  const { data } = matter(readFileSync(file, 'utf-8'))
  if (data.type !== 'campaign') continue

  const sessionFiles = await globby(path.join(path.dirname(file), 'Sessions', '*.md'))

  campaigns.push({
    slug:     path.basename(file, '.md').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title:    data.title   || path.basename(file, '.md'),
    world:    data.world   || '',
    setting:  data.world   || '',
    tagline:  data.tagline || '',
    status:   data.status  || 'active',
    system:   data.system  || 'D&D 5e',
    sessions: sessionFiles.length,
    party:    Array.isArray(data.players) ? data.players : [],
    cover:    data.cover   || null,
    href:     toHref(file),
  })
}

campaigns.sort((a, b) => {
  if (a.status !== b.status) return a.status === 'active' ? -1 : 1
  return a.world.localeCompare(b.world) || a.title.localeCompare(b.title)
})

// ── Recent sessions (updates feed) ───────────────────────────────────────────

const sessionFiles = await globby(`${CONTENT}/Worlds/**/Sessions/*.md`, {
  ignore: [`${CONTENT}/templates/**`],
})

const sessions = []
for (const file of sessionFiles) {
  const { data } = matter(readFileSync(file, 'utf-8'))
  if (data.type !== 'session') continue
  sessions.push({
    campaignTitle:  data.campaign || '',
    title:          data.title || path.basename(file, '.md'),
    date:           data.date  || '',
    session_number: data.session_number || 0,
  })
}

sessions.sort((a, b) => new Date(b.date) - new Date(a.date))

const campaignByTitle = Object.fromEntries(campaigns.map(c => [c.title, c]))

const recentSessions = sessions.slice(0, 10).map(s => ({
  campaign: campaignByTitle[s.campaignTitle]?.slug ?? s.campaignTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  kind:     'Session',
  title:    s.title,
  when:     relativeDate(s.date),
}))

function relativeDate(dateStr) {
  if (!dateStr) return 'recently'
  const days = Math.floor((Date.now() - new Date(dateStr)) / 86_400_000)
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days <  7) return `${days} days ago`
  if (days < 14) return '1 week ago'
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  if (days < 60) return '1 month ago'
  return `${Math.floor(days / 30)} months ago`
}

// ── World entities (NPCs, Locations, Factions, Items) ────────────────────────

const ENTITY_FOLDERS = [
  { folder: 'NPCs',      type: 'npc'      },
  { folder: 'Locations', type: 'location' },
  { folder: 'Factions',  type: 'faction'  },
  { folder: 'Items',     type: 'item'     },
]

const entities = []

for (const { folder, type } of ENTITY_FOLDERS) {
  const files = await globby(`${CONTENT}/Worlds/**/${folder}/*.md`, {
    ignore: [`${CONTENT}/templates/**`],
  })
  for (const file of files) {
    const { data } = matter(readFileSync(file, 'utf-8'))
    if (data.type !== type) continue
    entities.push({
      type,
      title: data.title || path.basename(file, '.md'),
      world: data.world || '',
      href:  toHref(file),
    })
  }
}

entities.sort((a, b) => a.type.localeCompare(b.type) || a.title.localeCompare(b.title))

// ── Write ────────────────────────────────────────────────────────────────────

writeFileSync(OUT, JSON.stringify({ campaigns, recentSessions, entities }, null, 2))
console.log(`✓ wiki-data.json — ${campaigns.length} campaign(s), ${recentSessions.length} recent session(s), ${entities.length} entity(ies)`)
