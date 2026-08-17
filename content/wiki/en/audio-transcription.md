---
title: "Voice transcription"
description: "Transcribe recordings to text on-device using Apple Speech or WhisperKit, with automatic engine routing and searchable transcripts."
updatedAt: "2026-08-17"
category: "Advanced"
order: 10
productVersion: "OrbNote 3.0"
image: "/images/appstore/en/03-rich-content.jpg"
imageAlt: "OrbNote voice message on Mac"
summary:
  - "Dual-engine transcription: Apple Speech is built in; WhisperKit requires a model download but offers higher accuracy."
  - "Automatic routing: WhisperKit is preferred when available, falling back to Apple Speech otherwise."
  - "Transcript text is stored in attachment metadata and indexed for global search."
relatedWiki:
  - "global-search"
  - "message-operations"
translationKey: "audio-transcription"
draft: false
---

OrbNote supports transcribing voice messages to text after recording. Transcription runs on-device, with audio never sent to a server.

## Dual-engine architecture

OrbNote uses two transcription engines and automatically selects the best option:

| Engine | Characteristics | Use case |
| --- | --- | --- |
| Apple Speech | Built into the system, no download needed, multilingual | First-time use, quick transcription |
| WhisperKit | Requires local model download, higher accuracy | High-precision transcription needs |

## Engine selection logic

The system selects a transcription engine in the following order:

1. If the user manually specifies an engine, that engine is used.
2. If the platform does not support WhisperKit (e.g., watchOS or Share Extension), Apple Speech is used.
3. If the WhisperKit model is downloaded and ready, WhisperKit is used.
4. Otherwise, Apple Speech is used, with a prompt to download the Whisper model for better accuracy.

When the engine is not manually specified, a WhisperKit failure automatically falls back to Apple Speech. A manually specified WhisperKit failure reports an error directly.

## How transcripts are stored

After transcription, the text is stored in the attachment's metadata:

- `transcribedText`: The final transcript text.
- `transcription_status`: Status marker (in progress / completed / failed).
- The transcript is included in the message's search index and can be found via [global search](/en/wiki/global-search/).

## Automatic vs. manual transcription

| User type | Transcription method |
| --- | --- |
| Free user | Manually trigger transcription |
| Pro user | Automatic transcription after recording completes |

For more on message editing and operations, read [Message operations](/en/wiki/message-operations/).
