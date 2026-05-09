import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const makeTimestamp = () => {
  const now = new Date();
  const fullyear = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return [fullyear, month, day, hours, minutes, seconds].join("");
};

const makeTemplate = (migrationName: string) => {
  return `import type pg from "pg";  
  
    export const name = "${migrationName}";

    export async function up(client: pg.PoolClient): Promise<void> {
      await client.query(\`
        -- TODO: write your migration here
    \`);
    }

    export async function down(client: pg.PoolClient): Promise<void> {
      await client.query(\`
        -- TODO: write your rollback here
    \`);
    }
  `;
};

try {
  const migrationArg = process.argv[2];

  if (!migrationArg) {
    throw new Error("Migration name is required. Example: npm run [migration script] create_users_table");
  }

  const timestamp = makeTimestamp();
  const migrationName = `${timestamp}_${migrationArg}`;
  const filename = `${migrationName}.ts`;
  const filePath = path.resolve(__dirname, "..", "migrations", filename);
  const template = makeTemplate(migrationName);

  await fs.writeFile(filePath, template, { flag: "wx" });
  console.log("Migration created:", { name: migrationName, path: filePath });
  process.exitCode = 0;
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
