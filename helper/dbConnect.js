let conn = null;
// Connecting to DB
const getConnection = async () => {
  if (!conn) {
    const Sequelize = require("sequelize");
    const {
      SQL_DB_HOST,
      SQL_DB_NAME,
      SQL_DB_USER,
      SQL_DB_PORT,
      SQL_DB_PASSWORD,
      DATABASE_TYPE,
      ADDITIONAL_CONFIG,
      POOL_MAX,
      POOL_MIN,
      POOL_IDLE_TIME,
      POOL_ACQUIRE,
      LOGGING,
    } = JSON.parse(process.env.SQL);

    const config = {
      database: SQL_DB_NAME,
      host: SQL_DB_HOST,
      username: SQL_DB_USER,
      port: SQL_DB_PORT,
      password: SQL_DB_PASSWORD,
      dialect: DATABASE_TYPE,
      dialectOptions: {
        multipleStatements: true,
      },
      pool: {
        max: POOL_MAX,
        min: POOL_MIN,
        idle: POOL_IDLE_TIME,
        acquire: POOL_ACQUIRE,
      },
      logging: false, // To avoid sql query logs,
      ...ADDITIONAL_CONFIG
    };

    if (DATABASE_TYPE === "sqlite") {
      if (DB_CONFIG.SQL_STORAGE) {
        config.storage = DB_CONFIG.SQL_STORAGE;
      }
      else {
        config.storage = ":memory"
      }
    }

    conn = new Sequelize(config);
  }

  return conn;
};

module.exports.getConnection = getConnection;