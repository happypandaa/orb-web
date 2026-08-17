---
title: "MCP 协议服务"
description: "通过 MCP 协议让外部 AI 工具（Claude Code、Codex 等）读写 OrbNote 笔记数据，支持消息查询、创建和会话重组，每次重组可回滚。"
updatedAt: "2026-08-17"
category: "高级功能"
order: 20
productVersion: "OrbNote 3.0"
image: "/images/appstore/zh/04-ai-organization.jpg"
imageAlt: "Mac 上的 OrbNote AI 集成"
summary:
  - "OrbNote 内置 MCP 服务，嵌入在 OrbNote.app 中，通过 JSON-RPC over stdio 与外部 AI 工具通信。"
  - "支持 13 个工具，覆盖查询、写入、会话重组（可回滚），配合 Claude Code 或 Codex 等 MCP 客户端使用。"
  - "双重门控安全：全局开关 + 会话级 mcpAccessEnabled，新建会话默认不开放 MCP 访问。"
relatedWiki:
  - "conversation-and-reply"
  - "message-operations"
  - "local-first-sync"
translationKey: "mcp-protocol"
draft: false
---

OrbNote 内置 MCP（Model Context Protocol）服务，让外部 AI 工具可以通过标准协议读写你的笔记数据。MCP 服务是一个独立的命令行可执行文件，嵌入在 OrbNote.app 内部，通过 stdin/stdout 进行 JSON-RPC 通信。

## 工作原理

MCP 服务以 stdio 模式运行：外部 AI 工具（MCP 客户端）启动 `OrbNoteMCP` 进程，通过标准输入发送 JSON-RPC 请求，通过标准输出接收响应。MCP 服务直接读取 App Group（`group.com.youran.orbnote`）内的 Core Data 数据库，与主应用共享同一份数据。

| 特性 | 说明 |
| --- | --- |
| 通信协议 | JSON-RPC 2.0 over stdio |
| MCP 协议版本 | `2024-11-05` |
| 服务信息 | `orbnote-mcp` v0.1.0 |
| 数据访问 | 直接读取 App Group 内的 Core Data 存储 |
| 二进制位置 | `OrbNote.app/Contents/Library/OrbNoteMCP` |
| 沙盒 | App Sandbox 启用，仅声明 App Group 权限，无网络访问 |

## 启用与配置

### 第一步：在 OrbNote 中启用 MCP

1. 打开 OrbNote 设置 → **MCP Access**。
2. 确认全局开关已开启（默认开启）。
3. 在 **Allowed Threads** 中，为你希望开放 MCP 访问的会话逐个启用 `mcpAccessEnabled`。

> 新建的会话默认不开放 MCP 访问。只有显式启用的会话才能被 MCP 工具读取和操作。

### 第二步：获取配置 JSON

在设置 → MCP Access → Configuration 面板中，OrbNote 会生成可直接复制的配置 JSON：

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

点击 **Copy Config** 按钮复制这段 JSON。`command` 路径指向你安装的 OrbNote.app 内嵌的 OrbNoteMCP 二进制文件。

> 如果你使用 Xcode 开发构建而非 App Store 安装版，路径会是 DerivedData 中的 Debug 构建产物，例如 `/Users/<用户名>/Library/Developer/Xcode/DerivedData/OrbNote-xxx/Build/Products/Debug/OrbNote.app/Contents/Library/OrbNoteMCP`。以 Configuration 面板显示的路径为准。

### 第三步：配置 MCP 客户端

#### Claude Code

Claude Code 支持三种方式注册 MCP 服务：

**方式一：项目级配置（推荐）**

在项目根目录创建 `.mcp.json` 文件，粘贴配置 JSON：

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

在该项目目录下启动 Claude Code 时，OrbNote 工具自动可用。

**方式二：用户级配置**

编辑 `~/.claude.json`，在 `mcpServers` 键下添加 `orbnote` 条目，格式同上。这样所有项目都能使用 OrbNote 工具。

**方式三：CLI 命令**

```bash
claude mcp add orbnote -- "/Applications/OrbNote.app/Contents/Library/OrbNoteMCP"
```

#### Claude Desktop

编辑配置文件 `~/Library/Application Support/Claude/claude_desktop_config.json`，添加 `orbnote` 到 `mcpServers`：

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

保存后重启 Claude Desktop，在对话中即可调用 OrbNote 工具。

#### Codex 及其他 MCP 客户端

任何支持 MCP stdio 协议的客户端都可以使用相同方式注册 OrbNote。将上方的 `mcpServers.orbnote` 配置块添加到对应客户端的 MCP 配置文件中即可。

### 第四步：验证连接

启动 MCP 客户端后，让它调用 `orbnote_status` 工具验证连接是否正常。如果返回了存储状态和工具列表，说明配置成功。如果返回空结果，检查：

- OrbNote.app 是否已安装并至少运行过一次（确保数据库已初始化）
- 设置中 `mcp.enabled` 是否开启
- 目标会话是否已启用 `mcpAccessEnabled`
- `command` 路径是否指向正确的二进制文件

## 工具列表

MCP 服务提供 13 个工具，覆盖查询、写入和重组三类操作。

### 查询类

| 工具 | 必填参数 | 可选参数 | 说明 |
| --- | --- | --- | --- |
| `orbnote_status` | — | — | 返回存储状态、计数、MCP 开关和工具列表。不需要会话级 MCP 开启 |
| `orbnote_list_groups` | — | `limit` | 列出所有 MCP 可访问的分组 |
| `orbnote_list_threads` | — | `group_id`, `limit` | 列出会话，可按分组过滤 |
| `orbnote_search` | `query` | `limit` | 跨会话全文搜索消息、文章和附件（含 OCR 和转写文本） |
| `orbnote_get_thread` | `thread_id` | `message_limit` | 获取会话详情和消息列表 |
| `orbnote_get_article` | `article_id` | — | 获取长文本消息中的文章内容 |

### 写入类

| 工具 | 必填参数 | 可选参数 | 说明 |
| --- | --- | --- | --- |
| `orbnote_add_note` | `content` | `thread_id`, `url`, `title` | 向指定会话追加一条笔记 |
| `orbnote_create_thread` | `name` | `group_id`, `initial_note` | 创建新会话，可带初始笔记 |
| `orbnote_open_thread` | `thread_id` | — | 通过 `orbnote://conversation/{id}` 深链接在 OrbNote 中打开会话 |

### 重组类

| 工具 | 必填参数 | 可选参数 | 说明 |
| --- | --- | --- | --- |
| `orbnote_get_reorg_snapshot` | — | `message_limit_per_thread` | 获取分组+会话+最近消息的紧凑快照，用于规划重组 |
| `orbnote_validate_reorg_plan` | `operations` | `plan_id` | 校验重组计划但不执行 |
| `orbnote_apply_reorg_plan` | `operations` | `plan_id` | 执行重组并写 rollback journal |
| `orbnote_rollback_reorg_plan` | `plan_id` | — | 按计划 ID 反向回滚已执行的重组 |

## 会话重组

重组工具是 MCP 服务的核心能力，支持 6 种操作：

| 操作 | 说明 |
| --- | --- |
| `create_group` | 创建新分组 |
| `rename_group` | 重命名分组 |
| `create_thread` | 创建新会话 |
| `rename_thread` | 重命名会话 |
| `move_thread` | 将会话移动到另一个分组 |
| `move_messages` | 将消息移动到另一个会话 |

### 重组工作流

1. **获取快照**：调用 `orbnote_get_reorg_snapshot` 获取当前分组和会话结构。
2. **规划并验证**：AI 规划重组操作，调用 `orbnote_validate_reorg_plan` 校验计划是否可行（不修改数据）。
3. **执行**：用户确认后，调用 `orbnote_apply_reorg_plan` 执行。每次执行会自动写一份 rollback journal 到 `MCPReorgHistory/{planId}.json`。
4. **回滚（如需要）**：如果结果不满意，用 `orbnote_rollback_reorg_plan` 按计划 ID 反向回滚。回滚按 journal 条目逆序执行。

### 别名引用

重组操作支持 `ref` / `client_id` 别名引用机制。例如，第一步创建了一个分组并标记 `ref: "work"`，后续创建会话时可以用 `group_ref: "work"` 引用这个新建的分组，无需等待创建后获取真实 ID。

## 安全机制

MCP 服务有双重门控保护：

| 安全层级 | 机制 | 默认值 | 配置位置 |
| --- | --- | --- | --- |
| 全局开关 | `mcp.enabled`（App Group UserDefaults） | 默认开启 | 设置 → MCP Access → 全局开关 |
| 会话级开关 | `mcpAccessEnabled`（Core Data 字段） | 默认关闭 | 设置 → MCP Access → Allowed Threads |

### 内容隔离规则

- 未启用 `mcpAccessEnabled` 的会话不出现在 `list_threads`、`search` 等任何查询结果中。
- 锁定会话（设置了[会话密码保护](/zh/wiki/conversation-password/)的会话）只返回元数据（名称、时间戳等），不返回消息内容。
- `orbnote_status` 是唯一不需要会话级 MCP 开启的工具，用于验证连接状态。
- 所有通过 MCP 创建的内容都会标记 `source = "mcp"`，便于追踪来源。

## 实用示例

### 用 Claude Code 搜索笔记

配置完成后，在 Claude Code 对话中：

> 搜索我的 OrbNote 里关于"项目计划"的内容

Claude Code 会调用 `orbnote_search`，搜索消息正文、文章、附件 OCR 和语音转写文本，返回匹配结果。

### 用 AI 批量重组会话

> 帮我把所有关于"设计"的会话移到一个叫"设计参考"的分组里

AI 会先调用 `orbnote_get_reorg_snapshot` 获取结构，规划重组计划，调用 `orbnote_validate_reorg_plan` 验证，确认后执行 `orbnote_apply_reorg_plan`。如果结果不对，可以让它回滚。

### 通过 AI 快速记录

> 在我的"工作日志"会话里加一条笔记：今天完成了 MCP 文档编写

AI 会调用 `orbnote_add_note` 向指定会话追加消息。如果会话不存在或未开放 MCP 访问，会返回错误提示。

## 关闭 MCP 服务

1. **完全关闭**：在 OrbNote 设置 → MCP Access 中关闭全局开关。所有 MCP 工具（`orbnote_status` 除外）都会拒绝请求。
2. **关闭单个会话**：在 Allowed Threads 列表中关闭对应会话的 `mcpAccessEnabled`。该会话立即从 MCP 查询结果中消失。
3. **关闭 MCP 客户端**：在 Claude Code 或其他客户端的配置中移除 `orbnote` 条目，或删除 `.mcp.json` 文件。

了解更多关于会话组织的内容，可以阅读[会话、分组与回复](/zh/wiki/conversation-and-reply/)和[消息操作](/zh/wiki/message-operations/)。关于数据存储和隐私，可以阅读 [Local-First 与云同步](/zh/wiki/local-first-sync/)。
