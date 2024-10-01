import postgres from "postgres";

const sql = postgres("postgres://postgres:postgres@localhost:5432/itdocs", {
  onnotice: () => false,
  idle_timeout: 20,
  max_lifetime: 60 * 30,
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
		"download_count" int8 NOT NULL DEFAULT 0,
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

await sql`create OR REPLACE view users_files
            (user_id, user_username, user_password, user_role, user_download_count, user_created_at, file_id,
             file_user_id, file_group_id, file_name, file_size, file_type, file_download_count, file_created_at,
             files_count, group_files_count)
as
SELECT users.id                             AS user_id,
       users.username                       AS user_username,
       users.password                       AS user_password,
       users.role                           AS user_role,
       users.download_count                 AS user_download_count,
       users.created_at                     AS user_created_at,
       files.id                             AS file_id,
       files.user_id                        AS file_user_id,
       files.group_id                       AS file_group_id,
       files.name                           AS file_name,
       files.size                           AS file_size,
       files.type                           AS file_type,
       files.download_count                 AS file_download_count,
       files.created_at                     AS file_created_at,
       (SELECT count(files_1.id) AS count
        FROM files files_1
        WHERE files_1.user_id = users.id
          AND files_1.group_id IS NULL)     AS files_count,
       (SELECT count(files_1.id) AS count
        FROM files files_1
        WHERE files_1.user_id = users.id
          AND files_1.group_id IS NOT NULL) AS group_files_count
FROM users
         LEFT JOIN files ON files.user_id = users.id;`;

// await sql`INSERT INTO "public"."users" ("username", "password", "role") VALUES ('admin', '1234', 'admin')`;
// await sql`INSERT INTO "public"."users" ("username", "password", "role") VALUES ('user', '123', 'user')`;

export { sql };
