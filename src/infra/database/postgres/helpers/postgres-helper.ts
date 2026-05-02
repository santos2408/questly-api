import pg from "pg";

const { Pool } = pg;

export const PostgresHelper = {
  pool: null as unknown as pg.Pool,

  async connect(config: pg.PoolConfig) {
    this.pool = new Pool({ ...config });
    await this.pool.query("SELECT 1");
  },

  async disconnect() {
    await this.pool.end();
  },

  getConnection() {
    return this.pool;
  },

  async getClient() {
    return await this.pool.connect();
  },
};
