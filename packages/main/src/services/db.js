const sqlite3 = require('sqlite3').verbose();

const db = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './TestKnexDB.sqlite',
  },
  debug: true,
});

db.schema.hasTable('recipes').then((res) => {
  if (!res) {
    db.schema
      .createTable('recipes', (table) => {
        table.increments();
        table.string('name').notNullable();
        table.integer('servings');
        table.integer('prep_time');
        table.integer('cook_time');
        table.string('photo_url');
        table.text('instructions');
      })
      .then(() => console.log("Table 'recipes' created"))
      .catch((error) => {
        console.log(error);
        throw error;
      })
      .finally(() => db.destroy());
  } else {
    console.log("Table 'recipes' already exists.");
  }
});

export default db;
