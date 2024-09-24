import postgres from "postgres";

const sql = postgres("postgres://postgres:postgres@localhost:5432/itdocs");

await sql`DROP TABLE IF EXISTS "public"."files"`;
await sql`DROP TABLE IF EXISTS "public"."users"`;
await sql`DROP SEQUENCE IF EXISTS files_id_seq`;
await sql`DROP SEQUENCE IF EXISTS users_id_seq`;

await sql`CREATE SEQUENCE IF NOT EXISTS users_id_seq`;
await sql`CREATE TABLE "public"."users" (
	    "id" int8 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
	    "username" text,
	    "password" text NOT NULL DEFAULT NULL::bpchar,
	    "role" text NOT NULL DEFAULT 'user'::bpchar
	)`;
await sql`CREATE UNIQUE INDEX users_id ON public.users USING btree (id)`;
await sql`CREATE UNIQUE INDEX users_username ON public.users USING btree (username)`;

await sql`CREATE SEQUENCE IF NOT EXISTS files_id_seq`;
await sql`CREATE TABLE "public"."files" (
		"id" int8 NOT NULL DEFAULT nextval('files_id_seq'::regclass),
		"user_id" int8 NOT NULL,
		"name" text NOT NULL,
		"size" text NOT NULL,
		"type" text NOT NULL,
		"created_at" timestamptz NOT NULL DEFAULT now(),
		CONSTRAINT "files_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id")
	)`;
await sql`CREATE UNIQUE INDEX files_id ON public.files USING btree (id)`;
await sql`CREATE UNIQUE INDEX files_name ON public.files USING btree (name)`;
// await sql`CREATE UNIQUE INDEX files_id ON public.files USING btree (id)`;

await sql`INSERT INTO "public"."users" ("username", "password", "role") VALUES ('admin', 'admin', 'admin')`;
await sql`INSERT INTO "public"."users" ("username", "password", "role") VALUES ('user', 'user', 'user')`;

export { sql };
