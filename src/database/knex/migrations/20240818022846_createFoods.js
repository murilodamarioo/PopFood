
exports.up = knex => knex.schema.createTable('foods', table => {
  table.increments('id')
  table.text('image').default(null)
  table.text('name')
  table.text('category')
  table.integer('price')
  table.text('description')
})

exports.down = knex => knex.schema.dropTable('foods')
