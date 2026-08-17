---
title: "Local-First 与云同步"
description: "数据优先存储在本地 Core Data，通过你自己的 iCloud 私有数据库同步，不经过公共云。"
updatedAt: "2026-08-17"
category: "安全与隐私"
order: 30
productVersion: "OrbNote 3.0"
image: "/images/appstore/zh/09-icloud.jpg"
imageAlt: "Mac 上的 OrbNote iCloud 同步"
summary:
  - "所有笔记数据优先存储在设备本地，通过你自己的 iCloud 私有数据库在多设备间同步。"
  - "普通笔记不经过任何公共云服务器，只有 AI 功能会向服务端发送必要内容。"
  - "基于 Persistent History Tracking 增量合并远程变更，保证多端一致性。"
relatedWiki:
  - "conversation-password"
  - "message-expiration"
translationKey: "local-first-sync"
draft: false
---

OrbNote 采用 Local-First 架构。数据优先存储在你的设备上，通过你自己的 iCloud 私有数据库在多设备间同步，普通笔记不经过任何公共云服务器。

## 数据存储在哪里

| 数据类型 | 存储位置 | 说明 |
| --- | --- | --- |
| 笔记、会话、附件 | 设备本地 Core Data + iCloud 私有数据库 | 不经过 OrbNote 服务器 |
| AI 功能内容 | OrbNote AI 服务端（仅在使用 AI 时） | 用于处理 AI 保存和智能整理 |
| 语音转写 | 设备本地处理 | Apple Speech 或 WhisperKit，不发送音频到服务器 |

## 云同步如何工作

OrbNote 使用 Apple 的 CloudKit 框架实现多设备同步：

1. **本地写入**：消息和附件首先写入设备上的 Core Data 数据库。
2. **CloudKit 同步**：`NSPersistentCloudKitContainer` 自动将变更推送到你的 iCloud 私有数据库。
3. **增量合并**：其他设备收到远程变更通知后，通过 Persistent History Tracking 增量合并。
4. **历史令牌**：用 `NSPersistentHistoryToken` 记录合并位置，下次从上次位置继续。

| 同步特性 | 说明 |
| --- | --- |
| 自动同步 | 后台自动处理，无需手动操作 |
| 冲突处理 | 新值优先策略（NSMergeByPropertyObjectTrumpMergePolicy） |
| 失败重试 | 同步失败时自动重试，4 秒延迟 |
| 同步告警 | 同步异常时分类告警 |

## AI 功能的数据流

当你使用 AI 功能时，部分内容会发送到 OrbNote AI 服务端：

- AI 保存：用户输入的文本和附件元信息发送到服务端处理。
- AI 智能整理：随手记消息内容发送到服务端获得归档建议。
- 认证方式：使用订阅凭证换取临时 access token，Bearer Token 认证。
- 设备标识：仅用于 AI 服务的匿名设备标识，不关联个人身份。

不使用 AI 功能时，普通笔记完全按照 Local-First + iCloud 方式工作。

## 数据导出

OrbNote 支持将会话导出为 Markdown 文件和附件文件夹，这是免费功能：

- 导出格式：Markdown + 附件文件夹 + 文章文件夹。
- 附件按原始文件名保存，带时间前缀。
- 导出后可在任意文本编辑器中查看。

了解更多关于隐私保护的内容，可以阅读[会话密码保护](/zh/wiki/conversation-password/)和[消息过期策略](/zh/wiki/message-expiration/)。
