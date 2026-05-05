import pg from "pg";

const { Pool } = pg;

export const PostgresHelper = {
  pool: null as unknown as pg.Pool,
  config: null as unknown as pg.PoolConfig,

  async connect(config: pg.PoolConfig) {
    this.pool = new Pool({ ...config });
    this.config = { ...config };
    await this.pool.query("SELECT 1");
  },

  async disconnect() {
    await this.pool.end();
  },

  async getConnection() {
    const isConnected = this.isConnected();

    if (!isConnected) {
      await this.connect(this.config);
    }

    return this.pool;
  },

  async getClient() {
    return await this.pool.connect();
  },

  isConnected() {
    return this.pool.ended ? false : true;
  },
};
