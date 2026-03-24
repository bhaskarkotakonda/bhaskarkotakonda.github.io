-- OS Database Schema Initialization 
-- Copy and run this in your Supabase SQL Editor

-- 1. Create Enums
CREATE TYPE processing_status AS ENUM ('pending', 'processing', 'processed', 'failed');

-- 2. Create User_Preferences Table
CREATE TABLE public."User_Preferences" (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id text NOT NULL UNIQUE, 
    -- 'user_id' matches the Clerk id defined in env PERSONAL_OS_ALLOWED_USER_IDS
    importance_criteria jsonb NOT NULL DEFAULT '{}'::jsonb,
    updated_at timestamptz DEFAULT now()
);

-- 3. Create Raw_Inbox Table
CREATE TABLE public."Raw_Inbox" (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    source text NOT NULL,
    source_message_id text,
    source_chat_id text,
    content_text text,
    raw_payload jsonb,
    detected_urls text[],
    canonical_url text,
    content_type text,
    telegram_file_id text,
    media_mime_type text,
    processing_status processing_status DEFAULT 'pending',
    retry_count integer DEFAULT 0,
    last_error text,
    received_at timestamptz DEFAULT now(),
    processed_at timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),

    -- Prevent duplicate webhook ingestion (idempotency)
    UNIQUE(source, source_message_id)
);

-- 4. Create Processed_Nodes Table
CREATE TABLE public."Processed_Nodes" (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    raw_inbox_id uuid UNIQUE REFERENCES public."Raw_Inbox"(id) ON DELETE CASCADE,
    title text,
    summary text,
    tags text[],
    importance_score integer CHECK (importance_score >= 1 AND importance_score <= 10),
    actionable_takeaways jsonb,
    study_guide_markdown text,
    model_name text,
    prompt_version text,
    source_url text,
    canonical_url text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 5. Enable Row Level Security (RLS)
-- We use standard security but our Astro backend uses Service Role to bypass it when processing.
ALTER TABLE public."User_Preferences" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Raw_Inbox" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Processed_Nodes" ENABLE ROW LEVEL SECURITY;
