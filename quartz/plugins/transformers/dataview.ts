import { QuartzTransformerPlugin } from "../types"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

interface DvColumn {
  field: string
  alias?: string
}

interface DvQuery {
  columns: DvColumn[]
  from: string
  where?: { key: string; value: string }
  sort?: { field: string; direction: "ASC" | "DESC" }
}

function parseQuery(raw: string): DvQuery | null {
  const lines = raw
    .trim()
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
  if (!lines[0]) return null

  const tableMatch = lines[0].match(/^TABLE\s+(.*)/i)
  if (!tableMatch) return null

  const colStr = tableMatch[1].trim()
  const columns: DvColumn[] = colStr.split(",").map((col) => {
    col = col.trim()
    const asMatch = col.match(/^(.+?)\s+AS\s+"([^"]+)"$/i)
    if (asMatch) return { field: asMatch[1].trim(), alias: asMatch[2] }
    return { field: col }
  })

  let from = ""
  let whereKey = ""
  let whereVal = ""
  let sortField = ""
  let sortDir: "ASC" | "DESC" = "ASC"

  for (const line of lines.slice(1)) {
    const fromM = line.match(/^FROM\s+"([^"]+)"/i)
    if (fromM) { from = fromM[1]; continue }

    const whereM = line.match(/^WHERE\s+([\w.]+)\s*=\s*"([^"]+)"/i)
    if (whereM) { whereKey = whereM[1]; whereVal = whereM[2]; continue }

    const sortM = line.match(/^SORT\s+([\w.]+)\s*(ASC|DESC)?/i)
    if (sortM) {
      sortField = sortM[1]
      sortDir = ((sortM[2] ?? "ASC").toUpperCase() as "ASC" | "DESC")
      continue
    }
  }

  if (!from) return null

  return {
    columns,
    from,
    where: whereKey ? { key: whereKey, value: whereVal } : undefined,
    sort: sortField ? { field: sortField, direction: sortDir } : undefined,
  }
}

type FileRecord = Record<string, unknown> & {
  _fileName: string
  _filePath: string
  _mtime: Date
}

// module-level cache so we only walk the vault once per build
let cache: Map<string, FileRecord> | null = null
let cacheDir: string | null = null

function getCache(contentDir: string): Map<string, FileRecord> {
  if (cache && cacheDir === contentDir) return cache

  cache = new Map()
  cacheDir = contentDir

  function walk(dir: string) {
    let entries: fs.Dirent[]
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const entry of entries) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(full)
      } else if (entry.name.endsWith(".md")) {
        try {
          const raw = fs.readFileSync(full, "utf-8")
          const { data } = matter(raw)
          const stat = fs.statSync(full)
          const rel = path.relative(contentDir, full).replace(/\\/g, "/")
          const fileName = path.basename(entry.name, ".md")
          cache!.set(rel, {
            ...(data as Record<string, unknown>),
            _fileName: fileName,
            _filePath: rel,
            _mtime: stat.mtime,
          })
        } catch {
          // skip unreadable files
        }
      }
    }
  }

  walk(contentDir)
  return cache
}

function getField(record: FileRecord, field: string): string {
  if (field === "file.name") return record._fileName
  if (field === "file.mtime") return record._mtime.toLocaleDateString("en-US")
  const val = record[field]
  if (val === undefined || val === null) return ""
  if (Array.isArray(val)) return val.join(", ")
  return String(val)
}

function renderTable(query: DvQuery, contentDir: string): string {
  const all = getCache(contentDir)

  // collect matching records
  let records: FileRecord[] = []
  for (const [relPath, rec] of all.entries()) {
    if (!relPath.startsWith(query.from + "/")) continue
    // skip template-like placeholder files (filenames that start/end with brackets)
    if (rec._fileName.startsWith("[") || rec._fileName.endsWith("]")) continue
    records.push(rec)
  }

  // apply WHERE
  if (query.where) {
    const { key, value } = query.where
    records = records.filter(
      (r) => String(r[key] ?? "").toLowerCase() === value.toLowerCase(),
    )
  }

  // apply SORT
  if (query.sort) {
    const { field, direction } = query.sort
    records.sort((a, b) => {
      const av = getField(a, field)
      const bv = getField(b, field)
      return direction === "ASC" ? av.localeCompare(bv) : bv.localeCompare(av)
    })
  }

  if (records.length === 0) {
    return "*No entries found.*\n"
  }

  // build header row
  const headers = ["File", ...query.columns.map((c) => c.alias ?? c.field)]
  const sep = headers.map(() => "---")

  const rows = records.map((r) => {
    const link = `[[${r._fileName}]]`
    const cols = query.columns.map((c) => getField(r, c.field))
    return [link, ...cols]
  })

  const lines = [
    "| " + headers.join(" | ") + " |",
    "| " + sep.join(" | ") + " |",
    ...rows.map((row) => "| " + row.join(" | ") + " |"),
  ]

  return lines.join("\n") + "\n"
}

export const DataviewPlugin: QuartzTransformerPlugin = () => ({
  name: "DataviewPlugin",
  textTransform(ctx, src) {
    if (!src.includes("```dataview")) return src

    const contentDir = path.resolve(ctx.argv.directory)
    // We don't know the current file path at textTransform time, pass empty string
    return src.replace(/```dataview\n([\s\S]*?)```/g, (_, queryStr: string) => {
      try {
        const query = parseQuery(queryStr)
        if (!query) return "*[Dataview: could not parse query]*\n"
        return renderTable(query, contentDir)
      } catch {
        return "*[Dataview: query error]*\n"
      }
    })
  },
})
