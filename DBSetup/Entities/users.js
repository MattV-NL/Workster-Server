const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
  name: 'users',
  columns: {
    user_id: {
      primary: true,
      type: 'int4',
      generated: true,
    },
    username: {
      type: 'varchar',
      precision: 50,
      unique: true,
    },
    password: {
      type: 'varchar',
      precision: 256,
    },
    email: {
      type: 'varchar',
      precision: 255,
      unique: true,
    },
    created_on: {
      type: 'timestamp without time zone',
    },
    last_login_attempt: {
      type: 'timestamp without time zone',
      nullable: true,
    },
    is_deleted: {
      type: 'boolean',
      nullable: true,
    },
  },
});
