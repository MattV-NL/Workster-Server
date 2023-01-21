const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

const saveWorkInformation = async (app, pool, url) => {
  app.post(url, async (req, res) => {
    const body = req.body;
    const timestamp = dayjs.utc().format('YYYY-MM-DD HH:mm:ss').toString();
    const date = body.date + ' 00:00:00';

    try {
      await pool.query(
        'INSERT into work_information (created_at, location_id, date, is_outside, is_welding, is_scaffolding, work_details) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [
          timestamp,
          body.workLocation.location_id,
          date,
          body.isOutside,
          body.isWelding,
          body.isScaffolding,
          body.workDetails,
        ]
      );
      res.send({ message: 'work information logged to database' });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: 'opps something went wrong', error: err });
    }
  });
};

module.exports = saveWorkInformation;
