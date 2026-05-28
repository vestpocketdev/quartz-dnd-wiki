import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Grimoire",
    pageTitleSuffix: " | Grimoire",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "umami",
    },
    locale: "en-US",
    baseUrl: "dungeons-and-dragons.org",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "EB Garamond",
        body: "EB Garamond",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          // manuscript light — aged parchment
          light: "#f5f0e2",
          lightgray: "#dfd5b8",
          gray: "#8c7e68",
          darkgray: "#4a3e30",
          dark: "#1c1a17",
          secondary: "#8a6010",
          tertiary: "#b03828",
          highlight: "rgba(138, 96, 16, 0.15)",
          textHighlight: "#8a601055",
        },
        darkMode: {
          // manuscript dark — matches homepage oklch palette
          light: "#1c1a17",
          lightgray: "#302b1f",
          gray: "#7a6e58",
          darkgray: "#a89880",
          dark: "#d5c9a8",
          secondary: "#c89415",
          tertiary: "#c04238",
          highlight: "rgba(200, 148, 21, 0.15)",
          textHighlight: "#c8941555",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.DataviewPlugin(),
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "rose-pine",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
