create extension if not exists vector with schema public;
create table documents (
    id text primary key,
    content text,
    embedding vector (1536),
    user_id text,
    dataset_id text,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);