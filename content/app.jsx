const { useState, useMemo, useEffect, useRef } = React;

const STATUS_LABEL = {
  active:    "active",
  concluded: "concluded",
};

const ENTITY_LABEL = {
  npc:      "NPC",
  location: "Location",
  faction:  "Faction",
  item:     "Item",
};

// ────────────────────────────────────────────────────────────────────────────
// Masthead - title, opening incipit, search.
// ────────────────────────────────────────────────────────────────────────────
function Masthead({ query, setQuery, resultCount }) {
  const inputRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        setQuery("");
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setQuery]);

  return (
    <header style={mastheadStyles.root}>
      <h1 style={mastheadStyles.title}>Come&nbsp;Forthe</h1>

      <p style={mastheadStyles.incipit}>
        <span style={mastheadStyles.dropcap}>H</span>eroes, Villains, Delinquents and Simpletons. You stand before
        Legends of unknown Realms,. Herein lies the chronicles of poor sundry
        parties, and legends of unmarked graves.
      </p>

      <div style={{ margin: "32px 0 8px", maxWidth: 760 }}>
        <RuleDiamond />
      </div>

      <div style={mastheadStyles.searchRow}>
        <label style={mastheadStyles.searchLabel}>
          <SearchGlyph />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the archive - title, world, party, NPCs…"
            style={mastheadStyles.searchInput}
          />
          <kbd style={mastheadStyles.kbd}>/</kbd>
        </label>
        <div style={mastheadStyles.searchMeta}>
          {query
            ? <span>{resultCount} {resultCount === 1 ? "match" : "matches"}</span>
            : <span style={{ opacity: 0.6 }}>press <kbd style={mastheadStyles.kbdInline}>/</kbd> to search</span>}
        </div>
      </div>
    </header>
  );
}

const SearchGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" style={{ flex: "none" }}>
    <g fill="none" stroke="var(--vellum-dim)" strokeWidth="1.2">
      <circle cx="7" cy="7" r="5"/>
      <path d="M 11 11 L 15 15"/>
    </g>
  </svg>
);

const mastheadStyles = {
  root: { position: "relative", padding: "64px 0 16px" },
  eyebrow: {
    fontFamily: "var(--caps)",
    letterSpacing: "0.22em",
    fontSize: 12,
    color: "var(--vellum-mute)",
    textTransform: "uppercase",
    display: "flex", gap: 10, alignItems: "center",
    marginBottom: 18,
  },
  title: {
    fontFamily: "var(--black)",
    fontWeight: 700,
    fontSize: "clamp(64px, 9vw, 132px)",
    lineHeight: 0.95,
    margin: "0",
    color: "var(--bone)",
    letterSpacing: "-0.01em",
    textShadow: "0 1px 0 rgba(0,0,0,0.6), 0 0 28px oklch(0.55 0.08 70 / 0.18)",
  },
  incipit: {
    fontFamily: "var(--serif)",
    fontStyle: "italic",
    fontSize: 19,
    lineHeight: 1.55,
    color: "var(--vellum-dim)",
    maxWidth: 720,
    margin: "20px 0 0",
    textWrap: "pretty",
  },
  dropcap: {
    fontFamily: "var(--black)",
    fontStyle: "normal",
    fontSize: 56,
    lineHeight: 0.85,
    float: "left",
    paddingRight: 10,
    paddingTop: 6,
    color: "var(--gilt)",
  },
  searchRow: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    gap: 24, flexWrap: "wrap", marginTop: 18,
  },
  searchLabel: {
    flex: "1 1 420px",
    display: "flex", alignItems: "center", gap: 12,
    padding: "12px 16px",
    background: "var(--ink-2)",
    border: "1px solid var(--rule)",
    borderRadius: 2,
  },
  searchInput: {
    flex: 1,
    background: "transparent",
    border: 0, outline: 0,
    color: "var(--vellum)",
    fontFamily: "var(--serif)",
    fontSize: 17,
    fontStyle: "italic",
  },
  kbd: {
    fontFamily: "var(--caps)",
    fontSize: 11, letterSpacing: "0.15em",
    padding: "3px 7px",
    border: "1px solid var(--rule)",
    color: "var(--vellum-mute)",
    borderRadius: 2,
  },
  kbdInline: {
    fontFamily: "var(--caps)", fontSize: 11,
    padding: "2px 6px", border: "1px solid var(--rule)",
    color: "var(--vellum-mute)", borderRadius: 2,
  },
  searchMeta: {
    fontFamily: "var(--caps)",
    fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase",
    color: "var(--vellum-mute)",
  },
};

// ────────────────────────────────────────────────────────────────────────────
// Filter rail - status chips + count.
// ────────────────────────────────────────────────────────────────────────────
function FilterRail({ status, setStatus, counts }) {
  const items = [
    { key: "all",       label: "All chronicles" },
    { key: "active",    label: "Active"         },
    { key: "concluded", label: "Concluded"      },
  ];
  return (
    <div style={filterStyles.row}>
      <div style={filterStyles.label}>
        <SectionGlyph size={16} />
        <span>Filter by binding</span>
      </div>
      <div style={filterStyles.chips}>
        {items.map((it) => {
          const active = status === it.key;
          const n = counts[it.key];
          return (
            <button
              key={it.key}
              onClick={() => setStatus(it.key)}
              style={{
                ...filterStyles.chip,
                ...(active ? filterStyles.chipActive : null),
              }}
            >
              <span>{it.label}</span>
              <span style={{ ...filterStyles.chipCount, ...(active ? filterStyles.chipCountActive : null) }}>{n}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const filterStyles = {
  row: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    gap: 24, flexWrap: "wrap",
    padding: "20px 0 28px",
  },
  label: {
    fontFamily: "var(--caps)",
    fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase",
    color: "var(--vellum-mute)",
    display: "flex", alignItems: "center", gap: 10,
  },
  chips: { display: "flex", flexWrap: "wrap", gap: 8 },
  chip: {
    appearance: "none",
    fontFamily: "var(--caps)",
    fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase",
    color: "var(--vellum-dim)",
    background: "transparent",
    border: "1px solid var(--rule)",
    padding: "8px 14px",
    borderRadius: 2,
    cursor: "pointer",
    display: "inline-flex", alignItems: "center", gap: 10,
    transition: "all 200ms ease",
  },
  chipActive: {
    color: "var(--bone)",
    borderColor: "var(--gilt-dim)",
    background: "oklch(0.62 0.09 75 / 0.10)",
    boxShadow: "inset 0 0 0 1px oklch(0.62 0.09 75 / 0.15)",
  },
  chipCount: {
    fontFamily: "var(--serif)",
    fontSize: 12,
    color: "var(--vellum-mute)",
    minWidth: 18, textAlign: "center",
  },
  chipCountActive: { color: "var(--gilt)" },
};

function CoverPlaceholder({ title }) {
  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, var(--ink-3) 0%, var(--ink-2) 100%)",
    }}>
      <span style={{
        fontFamily: "var(--black)",
        fontSize: "clamp(28px, 3vw, 48px)",
        color: "var(--rule)",
        letterSpacing: "-0.01em",
        userSelect: "none",
        textAlign: "center",
        padding: "0 16px",
      }}>
        {title ? title.slice(0, 1) : "◆"}
      </span>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Campaign card - cover image, blackletter title, setting, tagline, meta.
// ────────────────────────────────────────────────────────────────────────────
function CampaignCard({ campaign, index, highlight, dim }) {
  const c = campaign;
  return (
    <a
      href={c.href}
      style={{
        ...cardStyles.root,
        opacity: dim ? 0.32 : 1,
        filter: dim ? "saturate(0.5)" : "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--gilt-dim)";
        e.currentTarget.style.transform   = "translateY(-2px)";
        e.currentTarget.style.boxShadow   = "0 24px 60px -28px oklch(0 0 0 / 0.8), 0 1px 0 0 oklch(0.62 0.09 75 / 0.18) inset";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--rule)";
        e.currentTarget.style.transform   = "translateY(0)";
        e.currentTarget.style.boxShadow   = "0 1px 0 0 oklch(1 0 0 / 0.02) inset";
      }}
    >
      <CornerBrackets size={14} inset={6} />

      <div style={cardStyles.cover}>
        {c.cover
          ? <img src={c.cover} alt={c.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          : <CoverPlaceholder title={c.title} />
        }
        <div style={cardStyles.coverScrim} />
        <div style={cardStyles.statusPill}>
          <StatusSigil status={c.status} />
          <span>{STATUS_LABEL[c.status]}</span>
        </div>
      </div>

      <div style={cardStyles.body}>
        <div style={cardStyles.setting}>{c.setting}</div>
        <h3 style={cardStyles.title}>
          <Mark text={c.title} q={highlight} />
        </h3>
        <p style={cardStyles.tagline}>
          <Mark text={c.tagline} q={highlight} />
        </p>

        <div style={{ margin: "18px 0 14px" }}>
          <RuleDiamond />
        </div>

        <div style={cardStyles.meta}>
          <div style={cardStyles.metaCell}>
            <span style={cardStyles.metaLabel}>Sessions</span>
            <span style={cardStyles.metaValue}>{romanize(c.sessions)}</span>
          </div>
          <div style={cardStyles.metaCell}>
            <span style={cardStyles.metaLabel}>Party</span>
            <span style={cardStyles.metaValue}>{c.party.length} souls</span>
          </div>
          <div style={{ ...cardStyles.metaCell, alignItems: "flex-end" }}>
            <span style={cardStyles.metaLabel}>Enter</span>
            <span style={cardStyles.metaValue}>
              ⟶
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

function Mark({ text, q }) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <span style={{ background: "oklch(0.62 0.09 75 / 0.22)", color: "var(--bone)", padding: "0 2px" }}>
        {text.slice(i, i + q.length)}
      </span>
      {text.slice(i + q.length)}
    </>
  );
}

function romanize(n) {
  const map = [
    [1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],
    [50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]
  ];
  let s = "", x = n;
  for (const [v,sym] of map) while (x >= v) { s += sym; x -= v; }
  return s;
}

const cardStyles = {
  root: {
    position: "relative",
    display: "block",
    background: "linear-gradient(180deg, var(--ink-2) 0%, var(--ink) 100%)",
    border: "1px solid var(--rule)",
    color: "var(--vellum)",
    transition: "transform 280ms cubic-bezier(.2,.7,.2,1), border-color 200ms, box-shadow 280ms, opacity 200ms, filter 200ms",
    overflow: "hidden",
    cursor: "pointer",
  },
  cover: {
    position: "relative",
    aspectRatio: "16 / 10",
    background: "var(--ink-3)",
    borderBottom: "1px solid var(--rule)",
    overflow: "hidden",
  },
  coverScrim: {
    position: "absolute", inset: 0,
    background: "linear-gradient(180deg, transparent 40%, oklch(0.06 0.005 60 / 0.55) 100%)",
    pointerEvents: "none",
  },
  statusPill: {
    position: "absolute", top: 12, left: 12,
    fontFamily: "var(--caps)",
    fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
    color: "var(--bone)",
    background: "oklch(0.08 0.005 60 / 0.78)",
    border: "1px solid var(--rule)",
    padding: "5px 9px",
    display: "inline-flex", alignItems: "center", gap: 7,
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  },
  folio: {
    position: "absolute", top: 12, right: 12,
    fontFamily: "var(--caps)",
    fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
    color: "var(--vellum-dim)",
  },
  body: { padding: "22px 24px 22px" },
  setting: {
    fontFamily: "var(--caps)",
    fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase",
    color: "var(--gilt-dim)",
    marginBottom: 12,
  },
  title: {
    fontFamily: "var(--black)",
    fontWeight: 700,
    fontSize: "clamp(30px, 2.6vw, 40px)",
    lineHeight: 1.0,
    margin: "0 0 14px",
    color: "var(--bone)",
    letterSpacing: "-0.005em",
  },
  tagline: {
    fontFamily: "var(--serif)",
    fontStyle: "italic",
    fontSize: 16,
    lineHeight: 1.5,
    color: "var(--vellum-dim)",
    margin: 0,
    textWrap: "pretty",
  },
  meta: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr auto",
    gap: 18,
  },
  metaCell: {
    display: "flex", flexDirection: "column", gap: 4,
  },
  metaLabel: {
    fontFamily: "var(--caps)",
    fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
    color: "var(--vellum-mute)",
  },
  metaValue: {
    fontFamily: "var(--serif)",
    fontSize: 16,
    color: "var(--vellum)",
  },
};

// ────────────────────────────────────────────────────────────────────────────
// Latest Inscriptions - recent updates feed.
// ────────────────────────────────────────────────────────────────────────────
function UpdatesFeed({ items, campaignsBySlug, query }) {
  return (
    <aside style={feedStyles.root}>
      <div style={feedStyles.head}>
        <SectionGlyph />
        <h2 style={feedStyles.title}>Latest Inscriptions</h2>
      </div>
      <div style={feedStyles.subtitle}>Only the Worthy</div>

      <div style={{ margin: "14px 0 4px" }}><RuleDiamond /></div>

      <ol style={feedStyles.list}>
        {items.map((u, i) => {
          const c = campaignsBySlug[u.campaign];
          return (
            <li key={i} style={feedStyles.item}>
              <a
                href={c?.href || "#"}
                style={feedStyles.itemLink}
                onMouseEnter={(e) => { e.currentTarget.style.background = "oklch(0.62 0.09 75 / 0.05)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <div style={feedStyles.itemKind}>
                  <span style={feedStyles.kindBadge}>{u.kind}</span>
                  <span style={feedStyles.itemWhen}>{u.when}</span>
                </div>
                <div style={feedStyles.itemTitle}>
                  <Mark text={u.title} q={query} />
                </div>
                <div style={feedStyles.itemCampaign}>
                  in <em>{c?.title || u.campaign}</em>
                </div>
              </a>
            </li>
          );
        })}
        {items.length === 0 && (
          <li style={{ padding: "20px 0", color: "var(--vellum-mute)", fontStyle: "italic" }}>
            No inscriptions match.
          </li>
        )}
      </ol>
    </aside>
  );
}

const feedStyles = {
  root: {
    position: "sticky", top: 24,
    border: "1px solid var(--rule)",
    background: "linear-gradient(180deg, var(--ink-2) 0%, var(--ink) 100%)",
    padding: "22px 22px 14px",
    alignSelf: "start",
  },
  head: { display: "flex", alignItems: "center", gap: 10 },
  title: {
    fontFamily: "var(--black)",
    fontWeight: 700,
    fontSize: 28,
    margin: 0,
    color: "var(--bone)",
    letterSpacing: "-0.005em",
  },
  subtitle: {
    fontFamily: "var(--serif)",
    fontStyle: "italic",
    fontSize: 14,
    color: "var(--vellum-mute)",
    marginTop: 6,
  },
  list: { listStyle: "none", padding: 0, margin: 0 },
  item: { borderTop: "1px solid var(--rule)" },
  itemLink: {
    display: "block",
    padding: "14px 8px",
    margin: "0 -8px",
    transition: "background 160ms ease",
    cursor: "pointer",
  },
  itemKind: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    marginBottom: 6,
  },
  kindBadge: {
    fontFamily: "var(--caps)",
    fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase",
    color: "var(--gilt)",
    border: "1px solid var(--gilt-dim)",
    padding: "2px 7px",
    borderRadius: 2,
  },
  itemWhen: {
    fontFamily: "var(--caps)",
    fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
    color: "var(--vellum-mute)",
  },
  itemTitle: {
    fontFamily: "var(--serif)",
    fontSize: 16,
    lineHeight: 1.4,
    color: "var(--vellum)",
    margin: "2px 0 4px",
  },
  itemCampaign: {
    fontFamily: "var(--serif)",
    fontSize: 13,
    color: "var(--vellum-mute)",
  },
};

// ────────────────────────────────────────────────────────────────────────────
// Colophon (footer)
// ────────────────────────────────────────────────────────────────────────────
function Colophon() {
  return (
    <footer style={{ padding: "64px 0 56px", textAlign: "center" }}>
      <div style={{ maxWidth: 520, margin: "0 auto 18px" }}>
        <RuleDiamond />
      </div>
      <div style={{
        fontFamily: "var(--caps)", fontSize: 12, letterSpacing: "0.28em",
        textTransform: "uppercase", color: "var(--vellum-mute)",
      }}>
        Set down by the keeper · bound in Quartz · all unkindnesses preserved
      </div>
      <div style={{
        fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 14,
        color: "var(--vellum-mute)", marginTop: 14,
      }}>
        Memento mori - the party, too, is mortal.
      </div>
    </footer>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// App root
// ────────────────────────────────────────────────────────────────────────────
function App() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [campaigns, setCampaigns] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    fetch("wiki-data.json")
      .then(r => r.json())
      .then(data => {
        setCampaigns(data.campaigns || []);
        setUpdates(data.recentSessions || []);
        setEntities(data.entities || []);
      })
      .catch(() => {});
  }, []);

  const [t, setTweak] = useTweaks(/*EDITMODE-BEGIN*/{
    "accent": "gilt",
    "showFeed": true,
    "density": "comfortable"
  }/*EDITMODE-END*/);

  // apply accent live
  useEffect(() => {
    const root = document.documentElement;
    if (t.accent === "blood") {
      root.style.setProperty("--gilt",     "oklch(0.55 0.16 28)");
      root.style.setProperty("--gilt-dim", "oklch(0.42 0.12 28)");
    } else if (t.accent === "verdigris") {
      root.style.setProperty("--gilt",     "oklch(0.62 0.07 175)");
      root.style.setProperty("--gilt-dim", "oklch(0.46 0.05 175)");
    } else {
      root.style.removeProperty("--gilt");
      root.style.removeProperty("--gilt-dim");
    }
  }, [t.accent]);

  const q = query.trim().toLowerCase();
  const matchesQuery = (c) => {
    if (!q) return true;
    if (!c) return false;
    return [c.title, c.setting, c.tagline, ...c.party]
      .join(" ").toLowerCase().includes(q);
  };

  const matchingEntities = useMemo(() => {
    if (!q) return [];
    return entities.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.world.toLowerCase().includes(q) ||
      e.type.toLowerCase().includes(q)
    );
  }, [q, entities]);

  const filtered = useMemo(() => campaigns.filter(matchesQuery), [q, campaigns]);
  const visibleStatus = (c) => status === "all" || c.status === status;
  const visible = filtered.filter(visibleStatus);

  const counts = useMemo(() => ({
    all:       filtered.length,
    active:    filtered.filter(c => c.status === "active").length,
    concluded: filtered.filter(c => c.status === "concluded").length,
  }), [filtered]);

  const campaignsBySlug = useMemo(
    () => Object.fromEntries(campaigns.map(c => [c.slug, c])),
    [campaigns]
  );

  const filteredUpdates = useMemo(() => {
    return updates.filter(u => {
      const c = campaignsBySlug[u.campaign];
      const inQuery = !q || matchesQuery(c) || u.title.toLowerCase().includes(q) || u.kind.toLowerCase().includes(q);
      const inStatus = status === "all" || c?.status === status;
      return inQuery && inStatus;
    });
  }, [q, status, campaignsBySlug, updates]);

  const gridGap = t.density === "tight" ? 18 : t.density === "airy" ? 40 : 28;
  const showFeed = t.showFeed;

  return (
    <div style={appStyles.shell}>
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1440, margin: "0 auto", padding: "0 48px" }}>
        <Masthead query={query} setQuery={setQuery} resultCount={visible.length} />

        <div style={{ marginTop: 8 }}>
          <FilterRail status={status} setStatus={setStatus} counts={counts} />
        </div>

        <main style={{
          display: "grid",
          gridTemplateColumns: showFeed ? "minmax(0, 1fr) 360px" : "minmax(0, 1fr)",
          gap: 40,
          alignItems: "start",
          marginTop: 8,
        }}>
          <section data-screen-label="Campaigns Grid">
            <div style={appStyles.sectionHead}>
              <SectionGlyph />
              <h2 style={appStyles.sectionTitle}>Chronicles, Bound & Open</h2>
              <span style={appStyles.sectionCount}>
                {visible.length} of {campaigns.length}
              </span>
            </div>

            {visible.length === 0 && matchingEntities.length === 0 ? (
              <EmptyState query={query} clear={() => { setQuery(""); setStatus("all"); }} />
            ) : (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
                gap: gridGap,
              }}>
                {campaigns.map((c, idx) => {
                  const isVisible = visible.includes(c);
                  if (!isVisible && q) return null;
                  if (!isVisible) return (
                    <CampaignCard key={c.slug} campaign={c} index={idx} highlight={q} dim />
                  );
                  return <CampaignCard key={c.slug} campaign={c} index={idx} highlight={q} />;
                })}
              </div>
            )}

            {matchingEntities.length > 0 && (
              <EntityResults entities={matchingEntities} query={q} />
            )}
          </section>

          {showFeed && (
            <UpdatesFeed
              items={filteredUpdates}
              campaignsBySlug={campaignsBySlug}
              query={q}
            />
          )}
        </main>
      </div>

      <footer style={{ position: "relative", zIndex: 1, padding: "80px 0 64px", textAlign: "center" }}>
        <div style={{ maxWidth: 420, margin: "0 auto 22px" }}>
          <RuleDiamond />
        </div>
        <div style={{
          fontFamily: "var(--black)",
          fontWeight: 700,
          fontSize: "clamp(36px, 4vw, 56px)",
          lineHeight: 1,
          color: "var(--vellum-dim)",
          letterSpacing: "-0.005em",
        }}>
          They Shall be Missed
        </div>
      </footer>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Accent">
          <TweakRadio
            value={t.accent}
            onChange={(v) => setTweak("accent", v)}
            options={[
              { value: "gilt",      label: "Gilt"      },
              { value: "blood",     label: "Blood"     },
              { value: "verdigris", label: "Verdigris" },
            ]}
          />
        </TweakSection>
        <TweakSection title="Density">
          <TweakRadio
            value={t.density}
            onChange={(v) => setTweak("density", v)}
            options={[
              { value: "tight",        label: "Tight"  },
              { value: "comfortable",  label: "Normal" },
              { value: "airy",         label: "Airy"   },
            ]}
          />
        </TweakSection>
        <TweakSection title="Updates feed">
          <TweakToggle
            value={t.showFeed}
            onChange={(v) => setTweak("showFeed", v)}
            label="Show Latest Inscriptions"
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

function EntityResults({ entities, query }) {
  return (
    <div style={{ marginTop: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <SectionGlyph size={16} />
        <span style={{
          fontFamily: "var(--caps)",
          fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase",
          color: "var(--vellum-mute)",
        }}>
          Also found in the archive
        </span>
      </div>
      <div style={{
        border: "1px solid var(--rule)",
        background: "linear-gradient(180deg, var(--ink-2) 0%, var(--ink) 100%)",
      }}>
        {entities.map((e, i) => (
          <a
            key={i}
            href={e.href}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "12px 18px",
              borderBottom: i < entities.length - 1 ? "1px solid var(--rule)" : "none",
              color: "var(--vellum)",
              transition: "background 140ms ease",
            }}
            onMouseEnter={e2 => { e2.currentTarget.style.background = "oklch(0.62 0.09 75 / 0.05)"; }}
            onMouseLeave={e2 => { e2.currentTarget.style.background = "transparent"; }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{
                fontFamily: "var(--caps)",
                fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
                color: "var(--gilt)",
                border: "1px solid var(--gilt-dim)",
                padding: "2px 7px", borderRadius: 2,
                flexShrink: 0,
              }}>
                {ENTITY_LABEL[e.type] || e.type}
              </span>
              <span style={{ fontFamily: "var(--serif)", fontSize: 16 }}>
                <Mark text={e.title} q={query} />
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{
                fontFamily: "var(--caps)", fontSize: 11, letterSpacing: "0.18em",
                color: "var(--vellum-mute)", textTransform: "uppercase",
              }}>
                {e.world}
              </span>
              <span style={{ color: "var(--gilt-dim)" }}>⟶</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function EmptyState({ query, clear }) {
  return (
    <div style={{
      border: "1px dashed var(--rule)",
      padding: "60px 24px",
      textAlign: "center",
      color: "var(--vellum-mute)",
    }}>
      <div style={{ fontFamily: "var(--black)", fontSize: 42, color: "var(--vellum-dim)" }}>
        Nil inveniri potest.
      </div>
      <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 16, marginTop: 10, color: "var(--vellum-mute)" }}>
        Nothing in this archive answers to <em style={{ color: "var(--vellum)" }}>“{query || "-"}”</em>.
      </div>
      <button
        onClick={clear}
        style={{
          marginTop: 22,
          background: "transparent",
          border: "1px solid var(--gilt-dim)",
          color: "var(--gilt)",
          fontFamily: "var(--caps)",
          fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase",
          padding: "8px 14px",
          cursor: "pointer",
        }}
      >
        Clear the binding
      </button>
    </div>
  );
}

const appStyles = {
  shell: { position: "relative", minHeight: "100vh" },
  sectionHead: {
    display: "flex", alignItems: "baseline", gap: 14,
    margin: "0 0 20px",
  },
  sectionTitle: {
    fontFamily: "var(--black)",
    fontWeight: 700,
    fontSize: 32,
    margin: 0,
    color: "var(--bone)",
  },
  sectionCount: {
    fontFamily: "var(--caps)",
    fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase",
    color: "var(--vellum-mute)",
    marginLeft: "auto",
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
