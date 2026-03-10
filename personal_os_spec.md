# MASTER PROMPT: Personal OS Product Requirements Document

*Instructions for the AI Assistant: You are acting as the Lead Engineer. This document is the comprehensive Product Requirements Document (PRD) for my Personal OS. Read this document carefully. Your goal is to implement this system step-by-step into my existing Astro repository (bhaskarkotakonda.github.io). Follow the architecture, constraints, and phased implementation strictly.*

---

## 1. Product Vision & Principles

The goal is to build a "Personal Backend OS" integrated directly into my existing public portfolio website. 
*   **Zero-Friction Capture:** I must be able to send ideas, links, and media to my OS from my phone (via Telegram) in seconds.
*   **Design Parity:** The OS must use the exact same aesthetic, fonts, and Tailwind design variables as my current public portfolio. No generated, generic "AI UI". It must feel like a hidden, premium extension of my site.
*   **Mobile-First:** The Dashboard and Library views must be entirely responsive and usable on the go.
*   **Cost Efficiency:** Maximize free-tier services. Do not introduce recurring paid APIs unless explicitly stated.

---

## 2. Global Pre-requisites & Account Setup
*Before writing code, the user will need to configure the following services. The system relies on these environment variables.*

### 2.1 Services Required
1.  **Hosting**: Vercel. We are migrating the Astro site from GitHub Pages (static) to Vercel (SSR) to support server APIs.
2.  **Database**: Supabase (Free Tier: 500MB DB). If data exceeds 500MB long-term, older raw text data can be archived, though 500MB is enough for ~100,000 text bookmarks.
3.  **Authentication**: Clerk (Free Tier). 
4.  **AI Engine**: Google Gemini API (Use the most capable stable model available at implementation time natively, but access it through an abstraction layer).
5.  **Messaging Portal**: Telegram Bot API (100% Free).

### 2.2 Environment Variables (To be stored in `.env`)
```env
# Clerk Auth
PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# App AuthZ
PERSONAL_OS_ALLOWED_USER_IDS=user_...

# Operational Security
CRON_SECRET=replace_with_long_random_value
TELEGRAM_ALLOWED_CHAT_ID=123456789

# Supabase
PUBLIC_SUPABASE_URL=https://...supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Telegram Bot
TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234...
TELEGRAM_WEBHOOK_SECRET=your_custom_secret

# AI
GEMINI_API_KEY=AIza...
```

---

## 3. Architecture & Security Requirements

*   **Framework**: Astro (configured for `output: 'server'` with the Vercel adapter).
*   **Frontend UI**: React components styled with the existing `tailwind.config.js`.
*   **Security & Execution Boundary**: 
    *   `/` (Public Portfolio) -> Remains accessible to the world.
    *   `/os/*` (The Brain) -> Protected by Clerk middleware AND a server-side authorization check against `PERSONAL_OS_ALLOWED_USER_IDS`. Any unauthenticated access must return 401 Unauthorized.
    *   `/api/webhooks/telegram` -> Publicly reachable by Telegram only. Must NOT use Clerk auth. Protected by webhook secret validation and Telegram chat allowlist checks.
    *   `/api/process-queue` -> Non-public operational endpoint invoked by Vercel triggers or Queues. Protected by a verification secret.
*   **Processing State Model**: Inbox rows must move through explicit states: `pending`, `processing`, `processed`, `failed`.
*   **Idempotency Requirement**: All ingestion and processing handlers must be safe to retry without creating duplicate records or double-processing the same row.

---

## 4. Core Modules & Workflows

### Module A: The Capture Layer (Ingestion)

*How data enters the system without opening the app.*

1.  **Telegram Bot (Primary Mobile Interface)**:
    *   *Workflow*: I message my private Telegram bot with a link, text, or audio note. Telegram hits our Vercel API endpoint (`/api/webhooks/telegram`). 
    *   *Processing*: The API extracts the payload, validates the webhook secret, verifies the sender chat, and inserts the normalized message into the Supabase `Raw_Inbox` table.
    *   *UX Feedback (Crucial)*: The webhook must synchronously reply with an immediate acknowledgment (e.g., "✅ Received", or an error message if parsing fails) before closing the connection, preventing a "black hole" user experience.
    *   *Multi-URL Handling*: If a text message contains multiple links, the ingestion layer must split them and insert them as independent `Raw_Inbox` rows.
2.  **Platform Scraping Constraints & Costs**:
    *   *Twitter/Reddit/LinkedIn*: Fallback to manual ingestion via Telegram (sharing the tweet/post to the bot).
    *   *YouTube*: When a YouTube link is sent, attempt to use `youtube-transcript-api`. If retrieval fails (due to IP blocks or unavailable captions), do not crash. Fallback to sending the raw YouTube URL to the Gemini API, leveraging its native multimodal video understanding capabilities.
3.  **Raw Inbox Schema Requirements**:
    *   Each row must capture at minimum: `id`, `source`, `source_message_id`, `source_chat_id`, `content_text`, `canonical_url`, `processing_status`, `retry_count`, `last_error`, `received_at`.
    *   Add uniqueness constraints on source identifiers to prevent duplicate ingestion during webhook retries.

### Module B: The AI Processing Agent

*How data is synthesized.*

1.  **Event-Driven & On-Demand Processing**: 
    *   Processing should be triggerable near real-time. Do not rely exclusively on a 6-hour cron.
    *   Implement an asynchronous task queue trigger (e.g., Vercel background functions, Inngest, or a Supabase Webhook) upon new Telegram ingestion.
    *   Provide a explicit "Process Now" button in the Dashboard UI to manually flush the `pending` queue.
2.  **Deduplication**: Simple URL canonicalization plus source-level uniqueness checks.
3.  **LLM Processing Engine**: 
    *   The script fetches `pending` rows from `Raw_Inbox` and atomically marks them `processing`.
    *   *AIService Abstraction*: Do not hardcode direct Gemini API class calls in the processing loop. Build a generic `AIService` interface boundary (`src/os/lib/ai.ts`). If we swap to Claude tomorrow, only the adapter changes.
    *   *Token Limit Safety*: Implement rough token estimation during pre-processing. If the input exceeds the context window (or output chunking), implement truncation or map-reduce patterns, and gracefully handle malformed JSON schema rejections from the LLM.
4.  **Data Extraction**: The AIService returns:
    *   `Title`, `Summary` (TL;DR).
    *   `Tags` (e.g., "Engineering", "Life", "Finance").
    *   `Importance_Score` (1-10): This rubric must be evaluated dynamically by querying a `User_Preferences` Supabase table. The definition of "what is important to me" should live in the DB, not a static codebase file, allowing changes via a future Settings UI.
    *   `Actionable_Takeaways`: List of bullet points.
5.  **Study Mode Generation**: If `Importance_Score` > 8, generate a deep-dive "Study Guide" (markdown formatted). 
6.  **Failure Handling**: If processing fails, row moves to `failed`, stores a sanitized `last_error`, and increments `retry_count`. Retries must be bounded.

### Module C: The Frontend OS (UI Specifications)

*How data is consumed. Must use exact existing Tailwind classes for typography and colors.*

*   **Command Center (`/os/dashboard`)**:
    *   A mobile-optimized, feed-style view showing recently processed items with `Importance_Score` > 6.
    *   Visuals: Clean cards with the original context link, tags, and the TL;DR.
    *   UI Element: "Process Pending Queue" trigger button.
*   **The Library (`/os/library`)**:
    *   A searchable data table/grid of all processed content.
    *   Filter dropdowns for Tags and Importance thresholds.
*   **Study Mode (`/os/study/[id]`)**:
    *   A focused, distraction-free reading view using Astro's typography plugin to render the AI-generated markdown Study Guides beautifully.

---

## 5. Execution Instructions (For the AI)

*Start implementation in this exact order. Do not skip steps.*

*   **Phase 1: Foundation & Auth**
    1.  Update `astro.config.mjs` to standard Vercel SSR.
    2.  Install `@clerk/astro` and implement middleware.
    3.  Add definitive server-side authorization checks against `PERSONAL_OS_ALLOWED_USER_IDS` to harden the private OS routes.
    4.  Build a wireframe `/os/dashboard` that proves auth works.
*   **Phase 2: Database Layer**
    1.  Provide the exact SQL commands to run in Supabase to create `Raw_Inbox`, `Processed_Nodes`, and `User_Preferences` tables, including state fields and uniqueness constraints.
    2.  Write a Supabase generic client utility logically separating Admin/Service roles.
*   **Phase 3: Telegram Webhook**
    1.  Build `/pages/api/webhooks/telegram.ts`.
    2.  Implement synchronous Telegram chat acknowledgments to fix the UX "black hole".
    3.  Write logic to split multi-URL messages into explicit individual queue rows.
*   **Phase 4: The Brain (AI Processing)**
    1.  Build the generic `AIService` abstraction boundary in `src/os/lib/ai.ts`.
    2.  Build `/pages/api/process-queue.ts` (Event-driven worker) that fetches user priorities from the DB, calls the `AIService`, and updates states.
    3.  Implement token-limit truncation strategies and bounded retries.
*   **Phase 5: UI & UX**
    1.  Implement the React components for the Dashboard, mapping the existing Tailwind design variables to the new OS cards.
    2.  Implement the on-demand "Process Now" queue trigger in the UI.
    3.  Implement the Study Mode renderer.
