const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
  name: 'work_information',
  columns: {
    information_id: {
      primary: true,
      generated: true,
      type: 'int4',
    },
    created_at: {
      type: 'time without time zone',
      default: 'now()',
    },
    location_id: {
      type: 'int4',
    },
    date: {
      type: 'time without time zone',
    },
    is_outside: {
      type: 'boolean',
    },
    is_welding: {
      type: 'boolean',
    },
    is_outside: {
      type: 'boolean',
    },
    work_details: {
      type: 'varchar',
      precision: 255,
    },
  },
});
