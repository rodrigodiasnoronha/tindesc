/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments();

      table.string('name', 100).notNullable();
      table.string('username', 50).notNullable().unique();
      table.string('email', 254).notNullable().unique();
      table.string('password', 254).notNullable();
      table.string('gender', 2).default('M');
      table.string('bio', 254);

      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
