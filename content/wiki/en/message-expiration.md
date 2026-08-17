---
title: "Message expiration"
description: "Set a retention period at the Thread level. Expired messages are cleaned up automatically by a background timer for temporary notes and privacy scenarios."
updatedAt: "2026-08-17"
category: "Security & Privacy"
order: 20
productVersion: "OrbNote 3.0 · Pro"
image: "/images/appstore/en/01-capture.jpg"
imageAlt: "OrbNote message capture on Mac"
summary:
  - "A Thread-level expiration policy drives each message's expiry time, with automatic deletion on schedule."
  - "Presets range from no expiration to one day, one week, one month, or one year."
  - "A background timer cleans up expired messages every five minutes; policy changes recompute all messages."
relatedWiki:
  - "conversation-password"
  - "local-first-sync"
translationKey: "message-expiration"
draft: false
---

Message expiration lets messages in a Thread auto-delete after a specified duration. It is an OrbNote Pro feature, useful for recording temporary information and reducing long-term retention of privacy-sensitive content.

## How expiration is calculated

Each Thread can have an expiration policy (in seconds). When a new message is sent, its expiration time = creation time + policy duration.

| Preset | Duration | Use case |
| --- | --- | --- |
| No expiration | None | Long-term notes and Threads |
| One day | 86400 seconds | Daily reminders, meeting notes |
| One week | 604800 seconds | Weekly tasks, temporary project notes |
| One month | 2592000 seconds | Phase-based work, monthly plans |
| One year | 31536000 seconds | Annual references, time-boxed archives |

## Automatic cleanup

Once an expiration policy is set, OrbNote cleans up expired messages in the background:

- First run 5 seconds after launch, then every 5 minutes.
- Each batch processes 200 messages, querying with `expirationDate < now`.
- Cleanup runs on a background serial queue without affecting daily operations.

## Handling policy changes

When you change a Thread's expiration policy:

1. The system recomputes the expiration time for all messages in that Thread.
2. Messages that are already expired under the new policy are deleted immediately.
3. Remaining messages get updated expiration times and await the next periodic cleanup.

## Combining with password protection

Expiration and [Thread password protection](/en/wiki/conversation-password/) work well together:

- Password protection controls access, while expiration controls retention.
- For highly sensitive content, using both reduces long-term exposure risk.

For data storage and sync details, read [Local-First and cloud sync](/en/wiki/local-first-sync/).
