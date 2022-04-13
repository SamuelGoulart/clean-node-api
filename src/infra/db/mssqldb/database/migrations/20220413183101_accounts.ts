import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable('accounts', (table) => {
        table.increments('id').unique()
        table.string('name').notNullable()
        table.string('email').notNullable().unique()
        table.string('password').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('accounts')
}



