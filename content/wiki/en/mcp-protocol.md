---
title: "MCP protocol service"
description: "Let external AI tools (Claude Code, Codex, etc.) read and write OrbNote data via MCP, with message queries, creation, and Thread reorganization with rollback support."
updatedAt: "2026-08-17"
category: "Advanced"
order: 20
productVersion: "OrbNote 3.0"
image: "/images/appstore/en/04-ai-organization.jpg"
imageAlt: "OrbNote AI integration on Mac"
summary:
  - "OrbNote ships with a built-in MCP service embedded in OrbNote.app, communicating via JSON-RPC over stdio with external AI tools."
  - "13 tools cover querying, writing, and Thread reorganization (with rollback), compatible with Claude Code, Codex, and other MCP clients."
  - "Dual-gate security: global toggle + per-Thread mcpAccessEnabled, off by default for new Threads."
relatedWiki:
  - "conversation-and-reply"
  - "message-operations"
  - "local-first-sync"
translationKey: "mcp-protocol"
draft: false
---

OrbNote includes a built-in MCP (Model Context Protocol) service that lets external AI tools read and write your note data through a standard protocol. The MCP service is a standalone command-line executable embedded inside OrbNote.app, communicating via stdin/stdout using JSON-RPC.

## How it works

The MCP service runs in stdio mode: an external AI tool (MCP client) launches the `OrbNoteMCP` process, sends JSON-RPC requests via standard input, and receives responses via standard output. The MCP service reads the Core Data database from the shared App Group (`group.com.youran.orbnote`) directly, sharing the same data as the main app.

| Characteristic | Details |
| --- | --- |
| Protocol | JSON-RPC 2.0 over stdio |
| MCP protocol version | `2024-11-05` |
| Server info | `orbnote-mcp` v0.1.0 |
| Data access | Reads the Core Data store in the App Group directly |
| Binary location | `OrbNote.app/Contents/Library/OrbNoteMCP` |
| Sandbox | App Sandbox enabled, App Group entitlement only, no network access |

## Enabling and configuring

### Step 1: Enable MCP in OrbNote

1. Open OrbNote Settings → **MCP Access**.
2. Confirm the global toggle is on (enabled by default).
3. In **Allowed Threads**, enable `mcpAccessEnabled` for each Thread you want to make accessible via MCP.

> New Threads do not have MCP access enabled by default. Only Threads you explicitly opt in are visible to MCP tools.

### Step 2: Get the configuration JSON

In Settings → MCP Access → Configuration, OrbNote generates a ready-to-copy configuration JSON:

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

Click **Copy Config** to copy this JSON. The `command` path points to the OrbNoteMCP binary embedded inside your installed OrbNote.app.

> If you are using an Xcode development build rather than the App Store version, the path will point to the Debug build in DerivedData, e.g. `/Users/<username>/Library/Developer/Xcode/DerivedData/OrbNote-xxx/Build/Products/Debug/OrbNote.app/Contents/Library/OrbNoteMCP`. Always use the path shown in the Configuration panel.

### Step 3: Configure your MCP client

#### Claude Code

Claude Code supports three ways to register an MCP server:

**Option A: Project-level config (recommended)**

Create a `.mcp.json` file in your project root and paste the config JSON:

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

When you start Claude Code in that project directory, OrbNote tools are automatically available.

**Option B: User-level config**

Edit `~/.claude.json` and add an `orbnote` entry under the `mcpServers` key with the same format. This makes OrbNote tools available across all projects.

**Option C: CLI command**

```bash
claude mcp add orbnote -- "/Applications/OrbNote.app/Contents/Library/OrbNoteMCP"
```

#### Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json` and add `orbnote` to `mcpServers`:

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

Restart Claude Desktop after saving. OrbNote tools become available in conversations.

#### Codex and other MCP clients

Any client that supports the MCP stdio protocol can register OrbNote the same way. Add the `mcpServers.orbnote` config block to the client's MCP configuration file.

### Step 4: Verify the connection

After starting your MCP client, ask it to call the `orbnote_status` tool to verify the connection. If it returns store status and a tool list, configuration is successful. If you get empty results, check:

- OrbNote.app is installed and has been run at least once (to initialize the database)
- `mcp.enabled` is on in Settings
- Target Threads have `mcpAccessEnabled` enabled
- The `command` path points to the correct binary

## Tool reference

The MCP service provides 13 tools across three categories: query, write, and reorganize.

### Query tools

| Tool | Required params | Optional params | Description |
| --- | --- | --- | --- |
| `orbnote_status` | — | — | Returns store status, counts, MCP toggle state, and tool list. Does not require per-Thread MCP access |
| `orbnote_list_groups` | — | `limit` | Lists all MCP-accessible groups |
| `orbnote_list_threads` | — | `group_id`, `limit` | Lists Threads, optionally filtered by group |
| `orbnote_search` | `query` | `limit` | Cross-Thread full-text search across messages, articles, and attachments (including OCR and transcripts) |
| `orbnote_get_thread` | `thread_id` | `message_limit` | Fetches Thread details and message list |
| `orbnote_get_article` | `article_id` | — | Fetches article content within a long-text message |

### Write tools

| Tool | Required params | Optional params | Description |
| --- | --- | --- | --- |
| `orbnote_add_note` | `content` | `thread_id`, `url`, `title` | Appends a note to the specified Thread |
| `orbnote_create_thread` | `name` | `group_id`, `initial_note` | Creates a new Thread, optionally with an initial note |
| `orbnote_open_thread` | `thread_id` | — | Opens a Thread in OrbNote via `orbnote://conversation/{id}` deep link |

### Reorganization tools

| Tool | Required params | Optional params | Description |
| --- | --- | --- | --- |
| `orbnote_get_reorg_snapshot` | — | `message_limit_per_thread` | Returns a compact snapshot of groups + Threads + recent messages for planning |
| `orbnote_validate_reorg_plan` | `operations` | `plan_id` | Validates a reorganization plan without modifying data |
| `orbnote_apply_reorg_plan` | `operations` | `plan_id` | Executes the plan and writes a rollback journal |
| `orbnote_rollback_reorg_plan` | `plan_id` | — | Reverses a previously applied plan by plan ID |

## Thread reorganization

Reorganization is the core capability of the MCP service, supporting 6 operations:

| Operation | Description |
| --- | --- |
| `create_group` | Create a new group |
| `rename_group` | Rename an existing group |
| `create_thread` | Create a new Thread |
| `rename_thread` | Rename an existing Thread |
| `move_thread` | Move a Thread to a different group |
| `move_messages` | Move messages to a different Thread |

### Reorganization workflow

1. **Get snapshot**: Call `orbnote_get_reorg_snapshot` to get the current group and Thread structure.
2. **Plan and validate**: The AI plans reorganization operations and calls `orbnote_validate_reorg_plan` to check feasibility (without modifying data).
3. **Apply**: After user confirmation, call `orbnote_apply_reorg_plan` to execute. Each execution automatically writes a rollback journal to `MCPReorgHistory/{planId}.json`.
4. **Rollback (if needed)**: If the result is unsatisfactory, call `orbnote_rollback_reorg_plan` with the plan ID. Rollback replays journal entries in reverse order.

### Alias references

Reorganization operations support `ref` / `client_id` alias references. For example, if the first operation creates a group with `ref: "work"`, a subsequent `create_thread` operation can use `group_ref: "work"` to reference the newly created group without waiting for its real ID.

## Security model

The MCP service has dual-gate protection:

| Security layer | Mechanism | Default | Configuration location |
| --- | --- | --- | --- |
| Global toggle | `mcp.enabled` (App Group UserDefaults) | Enabled by default | Settings → MCP Access → Global toggle |
| Per-Thread toggle | `mcpAccessEnabled` (Core Data field) | Off by default | Settings → MCP Access → Allowed Threads |

### Content isolation rules

- Threads without `mcpAccessEnabled` do not appear in `list_threads`, `search`, or any other query results.
- Locked Threads (those with [password protection](/en/wiki/conversation-password/)) return metadata only (name, timestamps, etc.), never message content.
- `orbnote_status` is the only tool that does not require per-Thread MCP access, used for connection verification.
- All content created through MCP is tagged with `source = "mcp"` for provenance tracking.

## Practical examples

### Search notes with Claude Code

Once configured, in a Claude Code conversation:

> Search my OrbNote for content about "project plans"

Claude Code calls `orbnote_search`, which searches message text, articles, attachment OCR, and voice transcripts, returning matched results.

### Batch-reorganize Threads with AI

> Move all Threads about "design" into a group called "Design References"

The AI calls `orbnote_get_reorg_snapshot` to get the structure, plans the reorganization, calls `orbnote_validate_reorg_plan` to validate, and executes `orbnote_apply_reorg_plan` after confirmation. If the result is wrong, ask it to roll back.

### Quick capture via AI

> Add a note to my "Work Log" Thread: finished writing MCP documentation today

The AI calls `orbnote_add_note` to append a message to the specified Thread. If the Thread does not exist or MCP access is not enabled, an error is returned.

## Disabling MCP

1. **Fully disable**: Turn off the global toggle in OrbNote Settings → MCP Access. All MCP tools (except `orbnote_status`) will reject requests.
2. **Disable a single Thread**: Turn off `mcpAccessEnabled` for that Thread in the Allowed Threads list. The Thread immediately disappears from MCP query results.
3. **Disable from the client**: Remove the `orbnote` entry from your MCP client's config file, or delete the `.mcp.json` file.

For more on organizing Threads, read [Threads, groups, and replies](/en/wiki/conversation-and-reply/) and [Message operations](/en/wiki/message-operations/). For data storage and privacy, read [Local-First and cloud sync](/en/wiki/local-first-sync/).
