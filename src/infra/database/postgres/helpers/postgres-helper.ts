import pg from "pg";

const { Pool } = pg;

export const PostgresHelper = {
  pool: null as unknown as pg.Pool,

  async connect(config: pg.PoolConfig) {
    this.pool = new Pool({ ...config });
    this.pool.query("SELECT 1");
  },

  async disconnect() {
    await this.pool.end();
  },

  getConnection() {
    return this.pool;
  },

  getClient() {
    return this.pool.connect();
  },
};
