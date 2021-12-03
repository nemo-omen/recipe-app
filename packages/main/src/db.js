const sqlite3 = require('sqlite3').verbose();

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './TestKnexDB.sqlite',
  },
});

export function testDB() {
  console.log(knex);
}
