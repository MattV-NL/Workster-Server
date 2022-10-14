import { DateTime } from 'luxon';

export const replaceDate = (time) =>
  parseInt(new DateTime.fromMillis(time).toISODate().replace(/-/g, ''));
