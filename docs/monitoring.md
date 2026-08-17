# Website monitoring

OrbNote uses four complementary signals. No single dashboard represents both people and crawlers.

## Google Analytics 4

The production site currently uses measurement ID `G-DGFF5BZYBP`. Standard page views are collected by the Google tag. App Store links also emit an `app_store_click` event with the current page path, link URL, and visible link text.

## Google Search Console

Create or confirm the Domain Property for `orbnote.app`, submit `https://www.orbnote.app/sitemap.xml`, and review:

- Search results: queries, pages, countries, devices, impressions, clicks, and CTR.
- Page indexing: indexed and excluded URLs.
- Crawl stats: Googlebot requests and response health.

Domain verification should use a DNS TXT record in the existing Cloudflare DNS zone so it covers both the apex domain and `www`.

## Cloudflare crawler traffic

The public domain is already proxied through Cloudflare. Use Analytics & Logs → HTTP Traffic to monitor requests that do not execute browser JavaScript.

Track these user-agent families where plan-level filters permit it:

- Googlebot and Bingbot
- OAI-SearchBot, GPTBot, and ChatGPT-User
- ClaudeBot and Claude-User
- PerplexityBot and Perplexity-User

Store or export only the fields required for aggregation: day, bot family, path, response status, country, and verified-bot status. Avoid retaining full IP addresses or query strings for this report.

## GEO visibility

Crawler requests prove discovery, not citation. Maintain a small fixed query set and periodically record whether ChatGPT, Gemini, Claude, or Perplexity mentions OrbNote, cites an OrbNote URL, and describes the product accurately.
