'use server'

import postgres from 'postgres'
export const sql = postgres('postgres://postgres:postgres@127.0.0.1:5432/itdocs')

sql`
DROP TABLE IF EXISTS "public"."files";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS files_id_seq;

-- Table Definition
CREATE TABLE "public"."files" (
    "id" int8 NOT NULL DEFAULT nextval('files_id_seq'::regclass),
    "user_id" int8 NOT NULL,
    "name" bpchar(64) NOT NULL,
    CONSTRAINT "files_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id")
);

DROP TABLE IF EXISTS "public"."users";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int8 NOT NULL DEFAULT nextval('untitled_table_212_id_seq'::regclass),
    "name" text,
    "password" bpchar(32) NOT NULL DEFAULT NULL::bpchar,
    "role" bpchar(10) NOT NULL DEFAULT 'user'::bpchar
);


-- Indices
CREATE UNIQUE INDEX id ON public.users USING btree (id);

INSERT INTO "public"."users" ("id", "name", "password", "role") VALUES
(1, 'admin', 'admin                           ', 'user      ');
INSERT INTO "public"."users" ("id", "name", "password", "role") VALUES
(2, 'user', 'user                            ', 'user      ');
`.execute()