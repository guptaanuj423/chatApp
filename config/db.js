const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://chat_app:LDkoDzecAug87XUpBRee8C0g6H8zmrLM@dpg-d7lgqjv7f7vs73b36ovg-a.oregon-postgres.render.com/chatdb_ftu4",
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;