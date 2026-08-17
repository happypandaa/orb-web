---
title: "Thread password protection"
description: "Lock sensitive Threads with a password. Locked content is isolated from search and lists, and re-locks after app restart."
updatedAt: "2026-08-17"
category: "Security & Privacy"
order: 10
productVersion: "OrbNote 3.0 · Pro"
image: "/images/appstore/en/07-password.jpg"
imageAlt: "OrbNote Thread password protection on Mac"
summary:
  - "Thread passwords are stored as SHA256 hashes; locked content is isolated from global search and lists."
  - "Unlock state is in-process only and re-locks automatically after app restart."
  - "Password protection is an access control layer, not end-to-end encryption; message content itself is not encrypted."
relatedWiki:
  - "message-expiration"
  - "local-first-sync"
translationKey: "conversation-password"
draft: false
---

Thread password protection is an OrbNote Pro feature that prevents others from browsing sensitive Threads on the same device.

## How it works

When you set a password for a Thread:

1. The password is hashed with SHA256 and stored in the local database, syncing via iCloud.
2. The Thread enters a locked state, showing a lock icon in the sidebar.
3. You must enter the password to verify before viewing messages and attachments inside the Thread.

| Password protection does | Password protection does not do |
| --- | --- |
| Exclude locked Thread content from global search | Encrypt message content end-to-end |
| Isolate locked Threads in message lists and attachment queries | Encrypt attachment files themselves |
| Re-lock automatically after app restart | Prevent someone with database file access from reading content |
| Sync lock state across devices via iCloud | Add an extra encryption layer beyond transport security |

## Setting and removing a password

1. Open the Thread's inspector panel or settings.
2. Choose to set a password, enter and confirm it.
3. The Thread locks immediately.
4. Removing the password requires verifying the current password first.

After unlocking, the Thread stays unlocked while the app is running. When you quit and reopen the app, the Thread re-locks automatically.

## Limitations

Thread password is an **access control** mechanism, not content encryption. Be aware of the following:

- The password hash uses raw SHA256 without salt, so identical passwords produce identical hashes.
- Message content is stored as plaintext in the Core Data database.
- If someone gains direct access to the database file, both the password hash and message content can be read.

For stronger privacy, combine with [Message expiration](/en/wiki/message-expiration/) to auto-delete sensitive messages, or learn about [Local-First and cloud sync](/en/wiki/local-first-sync/) for data storage details.
