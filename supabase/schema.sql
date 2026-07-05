-- Run this in the Supabase SQL editor (Dashboard -> SQL Editor -> New query).

create table if not exists public.contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  phone       text not null,
  issue_type  text,
  bureau      text,
  message     text not null,
  locale      text not null default 'en',
  user_agent  text,
  handled     boolean not null default false
);

-- Lock the table down: RLS on, no policies for anon/authenticated.
-- The website inserts using the service-role key (bypasses RLS) from the
-- server-side API route only — the key is never exposed to the browser.
alter table public.contact_submissions enable row level security;

-- Helpful index for the team dashboard / triage.
create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);
