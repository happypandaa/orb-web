---
title: "Local-First and cloud sync"
description: "Data is stored locally first in Core Data and synced through your own private iCloud database, not through a public cloud."
updatedAt: "2026-08-17"
category: "Security & Privacy"
order: 30
productVersion: "OrbNote 3.0"
image: "/images/appstore/en/09-icloud.jpg"
imageAlt: "OrbNote iCloud sync on Mac"
summary:
  - "All note data is stored on-device first and synced via your own private iCloud database across devices."
  - "Regular notes do not pass through any public cloud server; only AI features send necessary content to the backend."
  - "Remote changes are merged incrementally via Persistent History Tracking to ensure multi-device consistency."
relatedWiki:
  - "conversation-password"
  - "message-expiration"
translationKey: "local-first-sync"
draft: false
---

OrbNote uses a Local-First architecture. Data is stored on your device first and synced across devices through your own private iCloud database, with regular notes never passing through a public cloud server.

## Where data is stored

| Data type | Storage location | Details |
| --- | --- | --- |
| Notes, Threads, attachments | Device-local Core Data + iCloud private database | Does not pass through OrbNote servers |
| AI feature content | OrbNote AI backend (only when using AI) | Used for AI save and organization processing |
| Voice transcription | Processed on-device | Apple Speech or WhisperKit, audio not sent to servers |

## How cloud sync works

OrbNote uses Apple's CloudKit framework for multi-device sync:

1. **Local write**: Messages and attachments are first written to the Core Data database on the device.
2. **CloudKit sync**: `NSPersistentCloudKitContainer` automatically pushes changes to your private iCloud database.
3. **Incremental merge**: Other devices receive remote change notifications and merge incrementally via Persistent History Tracking.
4. **History tokens**: `NSPersistentHistoryToken` records the merge position, resuming from the last point next time.

| Sync characteristic | Description |
| --- | --- |
| Automatic | Runs in the background without manual action |
| Conflict handling | New-value-wins policy (NSMergeByPropertyObjectTrumpMergePolicy) |
| Retry on failure | Automatic retry with a 4-second delay |
| Sync alerts | Categorized alerts when sync anomalies occur |

## Data flow for AI features

When you use AI features, some content is sent to the OrbNote AI backend:

- AI Save: The user's input text and attachment metadata are sent to the backend for processing.
- AI Organization: Quick Jot message content is sent to get an organization suggestion.
- Authentication: Uses subscription credentials to obtain a temporary access token with Bearer authentication.
- Device identity: An anonymous device identifier used only for AI services, not linked to personal identity.

When AI features are not in use, regular notes work entirely on the Local-First + iCloud model.

## Data export

OrbNote supports exporting Threads as Markdown files with attachment folders, and this is a free feature:

- Export format: Markdown + attachment folder + article folder.
- Attachments are saved with original filenames and time-prefixed.
- Exported files can be viewed in any text editor.

For more on privacy, read [Thread password protection](/en/wiki/conversation-password/) and [Message expiration](/en/wiki/message-expiration/).
