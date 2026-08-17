---
title: "用 MCP 让 Claude 或 Codex 读写 OrbNote"
description: "在 macOS 上连接 OrbNote MCP 服务，按会话开放搜索和写入权限，并用可验证、可回滚的方式整理笔记结构。"
publishedAt: "2026-08-17"
updatedAt: "2026-08-17"
author: "OrbNote 团队"
category: "进阶玩法"
tags:
  - "MCP"
  - "Claude Code"
  - "Codex"
  - "AI 集成"
image: "/images/appstore/zh/04-ai-organization.jpg"
imageAlt: "Mac 上的 OrbNote MCP 访问设置"
summary:
  - "OrbNoteMCP 是 macOS App 内的本地 stdio 服务，提供 13 个搜索、读取、写入和结构整理工具。"
  - "全局 MCP 开关默认开启，但每个会话默认不开放；只有显式允许的会话内容会被工具返回。"
  - "MCP 二进制自身没有网络权限，但 Claude、Codex 等客户端可能把工具结果发送给模型服务，客户端仍是独立的信任边界。"
relatedArticles:
  - "private-by-design"
  - "conversational-note-taking"
  - "what-kind-of-notes-you-need"
relatedWiki:
  - "mcp-protocol"
  - "conversation-and-reply"
  - "local-first-sync"
translationKey: "connect-notes-to-ai"
draft: false
---

当笔记已经多到无法记住“写在哪个会话、哪一天”时，AI 最有价值的能力不是替你续写，而是调用确定的工具完成搜索、读取和整理。

OrbNote 的 macOS App 内嵌了一个 MCP 服务。Claude Code、Codex 或其他支持 stdio MCP 的客户端可以启动这个本地进程，再根据你的授权调用 OrbNote 工具。

## 连接中实际有三个参与者

理解边界比复制配置更重要：

1. **OrbNote 数据库**：保存本地笔记，并通过你的 iCloud 私有数据库同步。
2. **OrbNoteMCP 进程**：从 App Group 读取数据，通过 stdin/stdout 返回 JSON-RPC 结果；沙盒只声明 App Group 权限，没有网络权限。
3. **外部 AI 客户端**：接收工具结果，并决定如何交给本地或远程模型处理。

因此，“OrbNoteMCP 无网络权限”只说明这个辅助进程不能自行联网，并不代表工具返回的数据一定不会被 Claude、Codex 或其模型提供方处理。开放会话前，仍应了解所用客户端的模型、日志和数据保留设置。

> MCP 服务目前仅随 macOS 版 OrbNote 提供。iOS、iPadOS 和 watchOS 不能直接充当 MCP 服务端。

## 第一步：只开放需要的会话

打开 OrbNote 设置 → **MCP Access**：

1. 确认全局开关已开启。当前实现中它首次默认开启。
2. 在 **Allowed Threads** 中逐个启用需要访问的会话。
3. 不要为了省事一次性开放包含私人日记、财务或凭证的会话。

会话级 `mcpAccessEnabled` 默认是关闭的。全局开关决定 MCP 是否可用，会话开关决定具体数据是否可读写；两层条件同时满足，除 `orbnote_status` 外的工具才会正常工作。

设置了密码的会话还会受到内容门控：MCP 可以返回该会话的有限元数据，但不会返回消息或文章正文。这里检查的是会话是否设置了密码，不会继承主 App 当前的临时解锁状态。

## 第二步：复制 App 生成的配置

设置页会根据当前安装位置生成配置。App Store 版本通常类似：

```json
{
  "mcpServers": {
    "orbnote": {
      "type": "stdio",
      "command": "/Applications/OrbNote.app/Contents/Library/OrbNoteMCP",
      "args": [],
      "env": {}
    }
  }
}
```

优先复制设置页显示的内容，不要手写路径。通过 Xcode 或其他目录安装时，二进制并不一定在 `/Applications`。

把这段配置放进客户端的 MCP 配置中。不同客户端的文件位置和命令可能变化，最新位置见[MCP 协议服务教程](/zh/wiki/mcp-protocol/)。文章只保留稳定的数据和权限模型，避免把容易过时的客户端路径复制到多处。

## 第三步：先做只读验证

连接后先让客户端调用：

```text
orbnote_status
```

返回值会包含 MCP 是否启用、存储路径、分组/会话/消息数量、可访问会话数量和工具列表。接着调用 `orbnote_list_threads`，确认结果中只有你刚才开放的会话。

如果可访问数量是 0，通常不是连接失败，而是还没有打开任何会话级开关。

## 三个值得使用的工作流

### 1. 不记得位置时搜索原句

可以直接要求：

> 搜索我的 OrbNote，找出提到“首次启动解释太多概念”的内容，并告诉我命中了消息正文、附件还是转写。

客户端会调用 `orbnote_search`。实现会分别搜索会话、消息、长文本文章和附件，并为附件 OCR、语音转写、描述或元数据提供命中原因。得到结果后，再用 `orbnote_get_thread` 或 `orbnote_get_article` 读取必要上下文，避免一次取回整库内容。

### 2. 把外部工作结果追加回会话

例如：

> 在“工作日志”中追加：完成设置页首次启动测试，并附上 https://example.com/report

`orbnote_add_note` 支持正文和可选 URL。通过 MCP 创建的消息会写入 `source = "mcp"`，便于在 App 内识别来源。如果目标会话没有开放访问，写入会失败，而不是绕过权限。

### 3. 先验证，再批量整理

结构整理不应该从一句模糊指令直接跳到执行。较安全的流程是：

1. `orbnote_get_reorg_snapshot` 获取分组、会话和有限的近期消息 ID。
2. 让客户端给出具体操作清单。
3. `orbnote_validate_reorg_plan` 检查引用和操作是否合法，但不修改数据。
4. 由你审核后调用 `orbnote_apply_reorg_plan`。
5. 保存返回的 `plan_id`；需要时用 `orbnote_rollback_reorg_plan` 回滚。

支持的操作包括创建或重命名分组、创建或重命名会话、移动会话和移动消息。回滚能力不是无限撤销：如果后续修改让创建对象不再满足回滚条件，回滚也可能失败，因此仍然需要先审阅计划。

## 常见问题

| 表现 | 可能原因 | 处理方式 |
| --- | --- | --- |
| 找不到 `OrbNoteMCP` | App 不在配置所写路径 | 回到设置页重新复制配置 |
| `orbnote_status` 显示关闭 | 全局 MCP 开关关闭 | 在 MCP Access 中开启 |
| 能连接但没有会话 | 没有启用会话级访问 | 只为需要的会话打开 Allowed Threads |
| 能看到会话但没有正文 | 会话设置了密码 | 这是内容门控的预期行为 |
| 写入提示无权限 | 目标会话未开放或 ID 错误 | 先列出可访问会话并确认 ID |
| 整理计划无法执行 | 计划引用失效或操作不合法 | 重新获取快照并再次验证 |

## 最小授权比“接入 AI”更重要

MCP 的价值在于把自然语言意图转换为可检查的工具调用。它并不会自动让外部 AI 变得可信，也不会替你选择应该开放的数据。

一个稳妥的使用方式是：只开放当前任务需要的会话，先运行只读查询，写入前查看目标，结构调整前验证计划，完成后关闭不再需要的会话权限。
