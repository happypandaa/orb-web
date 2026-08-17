# Wiki documentation layout — design QA

## Evidence

- Source visual truth: `/var/folders/xq/h5rbpzrs7710csq2h8mk3h180000gn/T/codex-clipboard-ae6ace30-77ab-44d7-8e80-19778501db3e.png`
- Desktop implementation: `/Users/ethan/dev/xc/orb-web/design-qa-implementation-desktop.png`
- Detail implementation: `/Users/ethan/dev/xc/orb-web/design-qa-implementation-detail.png`
- Mobile implementation: `/Users/ethan/dev/xc/orb-web/design-qa-implementation-mobile.png`
- Combined comparison: `/Users/ethan/dev/xc/orb-web/design-qa-comparison.png`
- Route and state: `/zh/wiki/`, Wiki home selected; `/zh/wiki/quick-jot/`, Quick Jot selected; mobile documentation menu open.
- Desktop viewport: 1316 × 707 CSS px at device scale 1.
- Source pixels: 2626 × 1414, normalized to 1316 × 707 for comparison.
- Desktop implementation pixels: 1316 × 707.
- Mobile viewport and pixels: 390 × 844.

## Full-view comparison

The implementation preserves the reference's defining information architecture: a persistent grouped sidebar, a selected navigation row, a compact top navigation, and a separate text-first documentation canvas. OrbNote's existing light palette and product typography are intentional brand adaptations; the dark API-console styling and code sample are not appropriate product content for this Wiki.

## Focused-region comparison

- Sidebar: group labels, route density, active state, and independent vertical scrolling match the reference pattern. The slightly wider track accommodates longer Simplified Chinese guide titles.
- Content header: title, description, and quick-answer panel establish a clear documentation hierarchy without the previous marketing-card layout.
- Detail page: breadcrumb, language switch, compact metadata, quick answer, restrained product screenshot, Markdown body, tables, and related links remain in one readable column.
- Mobile: the persistent sidebar becomes a native collapsible documentation menu; the same routes and selected state remain available.

## Required fidelity surfaces

- Fonts and typography: existing OrbNote system font stack retained; heading, UI-label, body, and metadata weights remain distinct and readable.
- Spacing and layout rhythm: left navigation and right document canvas are visually separated; content width stays near 760 px for reading; vertical rhythm is consistent.
- Colors and tokens: OrbNote orange, blue links, neutral grays, and white canvas retained with sufficient contrast.
- Image quality and assets: current OrbNote 3.0 App Store screenshots are used on guide pages without placeholders or synthetic replacements.
- Copy and content: Chinese terminology remains “会话” and “AI 智能整理”; menu and guide labels describe real routes.

## Interaction and responsive checks

- Sidebar route navigation to Quick Jot passed.
- Active-route state passed on desktop and mobile navigation instances.
- Mobile menu visibility, open state, and navigation to AI Organization passed.
- Desktop and mobile layouts showed no clipped persistent controls.
- Browser console: no errors were reported in the verified routes.

## Findings

No actionable P0, P1, or P2 visual mismatches remain. The reference's dark theme and API-specific demo card are intentionally not copied because the requested target is its documentation structure, not its brand or API content.

## Comparison history

- Initial implementation replaced the card-grid Wiki with the documentation shell and passed the structural comparison.
- Mobile verification confirmed the responsive sidebar conversion and route behavior; no P0/P1/P2 fix loop was required.

## Final result

final result: passed
