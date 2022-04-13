module.exports = {

  development: {
    client: 'mssql',
    connection: {
        host : 'localhost',
        port : 1433,
        database: "clean-node-api",
        user: "samuel.almeida",
        password: "",
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/infra/db/mssqldb/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/infra/db/mssqldb/database/seeds`
    }
  }
};

