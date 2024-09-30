import postgres from "postgres";

const sql = postgres("postgres://postgres:postgres@db:5432/itdocs", {
  onnotice: () => false,
});

// await sql`DROP TABLE IF EXISTS "public"."files"`;
// await sql`DROP TABLE IF EXISTS "public"."users"`;
// await sql`DROP TABLE IF EXISTS "public"."groups"`;
// await sql`DROP SEQUENCE IF EXISTS files_id_seq`;
// await sql`DROP SEQUENCE IF EXISTS users_id_seq`;
// await sql`DROP SEQUENCE IF EXISTS groups_id_seq`;

await sql`CREATE SEQUENCE IF NOT EXISTS users_id_seq`;
await sql`CREATE TABLE IF NOT EXISTS "public"."users" (
	    "id" int8 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
	    "username" text NOT NULL,
	    "password" text NOT NULL,
	    "role" text NOT NULL DEFAULT 'user'::bpchar,
		"created_at" timestamptz NOT NULL DEFAULT now()
	)`;
await sql`CREATE UNIQUE INDEX IF NOT EXISTS users_id ON public.users USING btree (id)`;
await sql`CREATE UNIQUE INDEX IF NOT EXISTS users_username ON public.users USING btree (username)`;

await sql`CREATE SEQUENCE IF NOT EXISTS groups_id_seq`;
await sql`CREATE TABLE IF NOT EXISTS "public"."groups" (
	    "id" int8 NOT NULL DEFAULT nextval('groups_id_seq'::regclass),
	    "name" text NOT NULL,
		"created_at" timestamptz NOT NULL DEFAULT now()
	)`;
await sql`CREATE UNIQUE INDEX IF NOT EXISTS groups_id ON public.groups USING btree (id)`;

await sql`CREATE SEQUENCE IF NOT EXISTS files_id_seq`;
await sql`CREATE TABLE IF NOT EXISTS "public"."files" (
		"id" int8 NOT NULL DEFAULT nextval('files_id_seq'::regclass),
		"user_id" int8 NOT NULL,
		"group_id" int8 DEFAULT NULL,
		"name" text NOT NULL,
		"size" text NOT NULL,
		"type" text NOT NULL,
		"download_count" int8 NOT NULL DEFAULT 0,
		"created_at" timestamptz NOT NULL DEFAULT now(),
		CONSTRAINT "files_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id"),
		CONSTRAINT "files_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id")
	)`;
await sql`CREATE UNIQUE INDEX IF NOT EXISTS files_id ON public.files USING btree (id)`;
// await sql`CREATE UNIQUE INDEX IF NOT EXISTS files_id ON public.files USING btree (id)`;

// await sql`INSERT INTO "public"."users" ("username", "password", "role") VALUES ('admin', '1234', 'admin')`;
// await sql`INSERT INTO "public"."users" ("username", "password", "role") VALUES ('user', '123', 'user')`;

export { sql };
