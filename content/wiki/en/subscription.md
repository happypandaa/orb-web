---
title: "Subscription and feature boundaries"
description: "Understand the difference between the free and Pro versions of OrbNote, and how subscriptions work technically."
updatedAt: "2026-08-17"
category: "Pro Features"
order: 10
productVersion: "OrbNote 3.0"
image: "/images/appstore/en/10-watch.jpg"
imageAlt: "OrbNote multi-platform"
summary:
  - "The free tier covers core note-taking, automatic iCloud sync, and data export."
  - "Pro adds AI save and organization, advanced search, automatic transcription, password protection, and watchOS."
  - "Subscriptions are verified via StoreKit 2; the AI backend exchanges subscription credentials for a temporary access token."
relatedWiki:
  - "ai-organization"
  - "conversation-password"
  - "message-expiration"
  - "global-search"
  - "audio-transcription"
translationKey: "subscription"
draft: false
---

OrbNote comes in a free tier and a Pro tier. Core note-taking features are available to everyone, while Pro adds AI capabilities and advanced privacy features.

## Free vs. Pro feature comparison

| Feature | Free | Pro |
| --- | --- | --- |
| Message recording and Thread management | ✅ | ✅ |
| [Quick Jot](/en/wiki/quick-jot/) fast capture | ✅ | ✅ |
| [Message edit, forward, merge, move](/en/wiki/message-operations/) | ✅ | ✅ |
| Automatic iCloud sync | ✅ | ✅ |
| Data export (Markdown + attachments) | ✅ | ✅ |
| [AI Organization](/en/wiki/ai-organization/) | — | ✅ |
| AI Save | — | ✅ |
| [Global full-text search](/en/wiki/global-search/) (OCR, transcripts, articles) | — | ✅ |
| [Automatic voice transcription](/en/wiki/audio-transcription/) | Manual | Automatic |
| [Thread password protection](/en/wiki/conversation-password/) | — | ✅ |
| [Message expiration auto-cleanup](/en/wiki/message-expiration/) | — | ✅ |
| Custom themes | — | ✅ |
| Full watchOS access | — | ✅ |

## Subscription options

OrbNote Pro is subscribed through the Apple App Store using StoreKit 2:

- **Monthly subscription**: Billed monthly.
- **Annual subscription**: Billed yearly, offering a discount compared to monthly.

Subscription management and cancellation are handled in your App Store account settings. OrbNote does not store your payment information.

## AI service authentication

When using AI features, OrbNote exchanges your subscription credentials for a temporary access token with the backend:

1. The app verifies the subscription status with Apple and obtains a JWS (JSON Web Signature).
2. The JWS is sent to the OrbNote AI backend.
3. The backend verifies it and returns a temporary access token (auto-refreshed 60 seconds before expiry).
4. Subsequent AI requests use Bearer Token authentication.

When AI features are not in use, the subscription is only used for unlocking local features (password protection, expiration cleanup, custom themes, etc.) and does not communicate with the backend.

For technical details on individual features, see the corresponding wiki pages: [AI Organization](/en/wiki/ai-organization/), [Thread password protection](/en/wiki/conversation-password/), [Message expiration](/en/wiki/message-expiration/).
