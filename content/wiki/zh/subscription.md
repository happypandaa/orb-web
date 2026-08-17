---
title: "订阅与功能边界"
description: "了解 OrbNote 免费版和 Pro 版的功能区别，以及订阅的技术实现方式。"
updatedAt: "2026-08-17"
category: "Pro 功能"
order: 10
productVersion: "OrbNote 3.0"
image: "/images/appstore/zh/10-watch.jpg"
imageAlt: "OrbNote 多平台"
summary:
  - "免费版涵盖核心笔记功能、自动 iCloud 同步和数据导出。"
  - "Pro 版增加 AI 保存与整理、高级搜索、自动转写、密码保护和 watchOS 等功能。"
  - "订阅通过 StoreKit 2 验证，AI 服务端用订阅凭证换取临时 access token。"
relatedWiki:
  - "ai-organization"
  - "conversation-password"
  - "message-expiration"
  - "global-search"
  - "audio-transcription"
translationKey: "subscription"
draft: false
---

OrbNote 分为免费版和 Pro 版。核心笔记功能对所有人开放，Pro 版增加 AI 能力和高级隐私功能。

## 免费与 Pro 功能对照

| 功能 | 免费 | Pro |
| --- | --- | --- |
| 消息记录和会话管理 | ✅ | ✅ |
| [随手记](/zh/wiki/quick-jot/)快速捕获 | ✅ | ✅ |
| [消息编辑、转发、合并、移动](/zh/wiki/message-operations/) | ✅ | ✅ |
| 自动 iCloud 同步 | ✅ | ✅ |
| 数据导出（Markdown + 附件） | ✅ | ✅ |
| [AI 智能整理](/zh/wiki/ai-organization/) | — | ✅ |
| AI 保存 | — | ✅ |
| [全局全文搜索](/zh/wiki/global-search/)（OCR、转写、文章） | — | ✅ |
| [自动语音转写](/zh/wiki/audio-transcription/) | 手动 | 自动 |
| [会话密码保护](/zh/wiki/conversation-password/) | — | ✅ |
| [消息过期自动清理](/zh/wiki/message-expiration/) | — | ✅ |
| 自定义主题 | — | ✅ |
| watchOS 完整使用 | — | ✅ |

## 订阅方式

OrbNote Pro 通过 Apple App Store 订阅，使用 StoreKit 2：

- **月度订阅**：按月付费。
- **年度订阅**：按年付费，比月付更优惠。

订阅管理和取消在 App Store 账户设置中完成，OrbNote 不存储你的支付信息。

## AI 服务认证

使用 AI 功能时，OrbNote 用你的订阅凭证向服务端换取临时 access token：

1. App 向 Apple 验证订阅状态，获得 JWS（JSON Web Signature）。
2. 将 JWS 发送给 OrbNote AI 服务端。
3. 服务端验证后返回临时 access token（过期前 60 秒自动刷新）。
4. 后续 AI 请求使用 Bearer Token 认证。

不使用 AI 功能时，订阅仅用于本地功能解锁（密码保护、过期清理、自定义主题等），不与服务端通信。

更多关于各功能的技术细节，可以阅读对应的 wiki 页面：[AI 智能整理](/zh/wiki/ai-organization/)、[会话密码保护](/zh/wiki/conversation-password/)、[消息过期策略](/zh/wiki/message-expiration/)。
