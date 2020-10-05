// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './knex/db.sqlite'
    },
    migrations: {
      directory: './knex/migrations'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'your_database_user',
      password: 'your_database_password',
      database: 'myapp_test'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './knex/migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'your_database_user',
      password: 'your_database_password',
      database: 'myapp_test'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './knex/migrations'
    }
  }

}
