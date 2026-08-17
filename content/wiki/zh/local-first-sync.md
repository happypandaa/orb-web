---
title: "Local-First 与云同步"
description: "数据优先存储在本地 Core Data，并通过 Apple CloudKit 中属于当前 iCloud 账户的私有数据库同步。"
updatedAt: "2026-08-17"
category: "安全与隐私"
order: 30
productVersion: "OrbNote 3.0"
image: "/images/appstore/zh/09-icloud.jpg"
imageAlt: "Mac 上的 OrbNote iCloud 同步"
summary:
  - "所有笔记数据优先存储在设备本地，通过你自己的 iCloud 私有数据库在多设备间同步。"
  - "普通笔记不写入 OrbNote 自建的内容数据库；启用同步时，数据会交给 Apple CloudKit。"
  - "基于 Persistent History Tracking 增量合并远程变更，保证多端一致性。"
relatedWiki:
  - "conversation-password"
  - "message-expiration"
translationKey: "local-first-sync"
draft: false
---

OrbNote 采用 Local-First 架构。数据优先存储在设备上，并通过 Apple CloudKit 中属于当前 iCloud 账户的私有数据库在多设备间同步。普通笔记不写入 OrbNote 自建的内容数据库，但 CloudKit 本身仍然是 Apple 提供的云服务。

## 数据存储在哪里

| 数据类型 | 存储位置 | 说明 |
| --- | --- | --- |
| 笔记、会话、附件 | 设备本地 Core Data + iCloud 私有数据库 | 不经过 OrbNote 服务器 |
| AI 功能内容 | OrbNote AI 服务端（仅在使用 AI 时） | 用于处理 AI 保存和智能整理 |
| 语音转写 | iPhone 或 Mac | WhisperKit 使用本地模型；Apple Speech 是否在线处理由系统能力决定 |

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

- AI 保存：当前输入、路由所需的分组/会话信息，以及符合限制的图片内容可能发送到服务端处理。
- AI 智能整理：当前消息、附件摘要或派生文本，以及现有分组和会话名称会用于生成归档建议。
- 认证方式：使用订阅凭证换取临时 access token，Bearer Token 认证。

不使用 AI 功能时，普通笔记按照 Local-First + CloudKit 私有同步方式工作，不会自动发送到 OrbNote AI 服务。

## 数据导出

OrbNote 支持将会话导出为 Markdown 文件和附件文件夹，这是免费功能：

- 导出格式：Markdown + 附件文件夹 + 文章文件夹。
- 附件按原始文件名保存，带时间前缀。
- 导出后可在任意文本编辑器中查看。

了解更多关于隐私保护的内容，可以阅读[会话密码保护](/zh/wiki/conversation-password/)和[消息过期策略](/zh/wiki/message-expiration/)。
