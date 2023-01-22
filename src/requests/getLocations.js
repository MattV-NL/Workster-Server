const getLocations = async (app, pool, url) => {
  app.post(url, async (req, res) => {
    const body = req.body;
    try {
      const locations = await pool.query(
        'SELECT latitude, longitude, location_id FROM work_locations WHERE user_id = $1',
        [body.user_id]
      );
      res.send(locations.rows);
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: 'oops, something went wrong', status: 500 });
    }
  });
};

module.exports = getLocations;
