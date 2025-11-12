import { env } from "~/env";

/** Minimal local config type for drizzle-kit (PG). This avoids depending on
 * the upstream Config shape which can differ between drizzle-kit versions.
 */
type DrizzlePgConfig = {
  schema: string;
  driver?: "pg" | string;
  dbCredentials?: {
    connectionString?: string;
    [key: string]: unknown;
  };
  tablesFilter?: string[];
};

const config: DrizzlePgConfig = {
  schema: "./src/server/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: env.POSTGRES_URL,
  },
  tablesFilter: ["phish-guard_*"],
};

export default config;
