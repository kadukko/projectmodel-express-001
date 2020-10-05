/* eslint-disable space-before-function-paren */
import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
    table.increments()
    table.string('username').notNullable().unique()
    table.string('email').notNullable().unique()
    table.string('password').notNullable()
    table.timestamps()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users')
}
