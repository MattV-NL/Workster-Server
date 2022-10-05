const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
  name: 'work_locations',
  columns: {
    location_id: {
      primary: true,
      type: 'int4',
      generated: true,
    },
    created_at: {
      type: 'time without time zone',
      default: 'now()',
    },
    latitude: {
      type: 'float8',
    },
    longitude: {
      type: 'float8',
    },
    user_id: {
      type: 'int4',
    },
  },
});
