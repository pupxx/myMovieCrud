exports.up = function(knex) {
  return knex.schema.createTable('movies', (table) => {
    table.increments();
    table.string('title').notNullable().defaultTo('');
    table.string('director').notNullable().defaultTo('');
    table.integer('year').notNullable();
    table.integer('rating').notNullable();
    table.text('poster_url');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('movies');
};
