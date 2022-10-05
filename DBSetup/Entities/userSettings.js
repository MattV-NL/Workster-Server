const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
  name: 'user_settings',
  columns: {
    settings_id: {
      primary: true,
      generated: true,
      type: 'int4',
    },
    created_at: {
      type: 'timestamp without time zone',
      default: 'now()',
    },
    darkMode_on: {
      type: 'boolean',
    },
    email_notifications: {
      type: 'boolean',
    },
    measurement_unit: {
      type: 'varchar',
      precision: 255,
    },
    user_id: {
      type: 'int4',
    },
  },
});
