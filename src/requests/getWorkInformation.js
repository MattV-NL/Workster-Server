const getWorkInformation = async (app, pool, url) => {
  app.get(url, async (req, res) => {
    const location_id = req.params.location_id;
    const work_information = await pool.query(
      'SELECT * FROM work_information WHERE location_id = $1',
      [location_id]
    );

    res.send(work_information.rows);
  });
};

module.exports = getWorkInformation;
