---
title: "语音转文字"
description: "使用 Apple Speech 或 WhisperKit 在设备本地将录音转为文字，双引擎自动选路，转录文本可直接搜索。"
updatedAt: "2026-08-17"
category: "高级功能"
order: 10
productVersion: "OrbNote 3.0"
image: "/images/appstore/zh/03-rich-content.jpg"
imageAlt: "Mac 上的 OrbNote 语音消息"
summary:
  - "双引擎转写：Apple Speech 系统自带，WhisperKit 需下载模型但精度更高。"
  - "自动选路：优先使用 WhisperKit，不可用时回退到 Apple Speech。"
  - "转录文本存储在附件元数据中，可被全局搜索命中。"
relatedWiki:
  - "global-search"
  - "message-operations"
translationKey: "audio-transcription"
draft: false
---

OrbNote 支持在录音后将语音消息转为文字。转录过程在设备本地完成，不发送音频到服务器。

## 双引擎架构

OrbNote 使用两种转写引擎，自动选择最合适的方案：

| 引擎 | 特点 | 适用场景 |
| --- | --- | --- |
| Apple Speech | 系统自带，无需下载，支持多语言 | 首次使用、快速转录 |
| WhisperKit | 需下载本地模型，精度更高 | 高精度转录需求 |

## 引擎选择逻辑

系统按以下顺序选择转写引擎：

1. 如果用户手动指定了引擎，优先使用指定的引擎。
2. 如果平台不支持 WhisperKit（如 watchOS 或分享扩展），使用 Apple Speech。
3. 如果 WhisperKit 模型已下载就绪，使用 WhisperKit。
4. 否则使用 Apple Speech，并提示可以下载 Whisper 模型以获得更好的精度。

当非用户手动指定时，WhisperKit 失败会自动回退到 Apple Speech。手动指定 WhisperKit 失败则直接报错。

## 转录结果如何存储

转录完成后，文本存储在附件的元数据中：

- `transcribedText`：最终转录文本。
- `transcription_status`：状态标记（进行中/已完成/失败）。
- 转录文本会被纳入消息的搜索索引，可通过[全局搜索](/zh/wiki/global-search/)检索。

## 自动与手动转写

| 用户类型 | 转写方式 |
| --- | --- |
| 免费用户 | 手动触发转写 |
| Pro 用户 | 录音完成后自动转写 |

了解更多关于消息编辑和操作的内容，可以阅读[消息操作](/zh/wiki/message-operations/)。
