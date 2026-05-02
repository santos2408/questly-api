export default {
  databaseUrl: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5433/questly",
  port: process.env.PORT || 4000,
};
