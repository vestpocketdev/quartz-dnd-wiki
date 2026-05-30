// Campaign data for the homepage index.
//
// href format: "Worlds/[World Name]/Campaigns/[Campaign Name]/[Campaign Name]"
// Use %20 for spaces, or encode with encodeURIComponent if needed.
// Example: "Worlds/Forgotten%20Realms/Campaigns/Storm%20Kings%20Thunder/Storm%20Kings%20Thunder"
//
// Add one entry per campaign. The wiki page for each campaign is the .md file
// at content/Worlds/<World>/Campaigns/<Campaign>/<Campaign>.md
const CAMPAIGNS = [
  {
    slug: "example-campaign",
    title: "Example Campaign",
    setting: "Example World",
    tagline: "Replace this with your campaign's one-line pitch.",
    status: "active",
    sessions: 0,
    party: [],
    href: "Worlds/Example%20World/Campaigns/Example%20Campaign/Example%20Campaign",
  },
];

const STATUS_LABEL = {
  active:    "active",
  concluded: "concluded",
};

// Recent updates feed - add entries here as you create wiki content.
// kind: "Session" | "NPC" | "Location" | "Item" | "Lore" | "Map" | "Entry"
// when: freeform relative date string (displayed as-is)
const UPDATES = [
  { campaign: "example-campaign", kind: "Entry", title: "Wiki initialized", when: "today" },
];

Object.assign(window, { CAMPAIGNS, STATUS_LABEL, UPDATES });
