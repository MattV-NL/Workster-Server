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
    darkmode_on: {
      type: 'boolean',
    },
    email_notifications: {
      type: 'boolean',
    },
    measurement_unit: {
      type: 'varchar',
      precision: 255,
    },
    precip_limit: {
      type: 'float8',
    },
    wind_limit: {
      type: 'float8',
    },
    user_id: {
      type: 'int4',
    },
  },
});
