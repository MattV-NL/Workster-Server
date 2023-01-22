const deleteRow = require('../utilFunc/deleteRow');

const deleteLocation = async (app, pool, url) => {
  app.post(url, async (req, res) => {
    const location_id = req.body.location_id;
    res.send(
      await deleteRow(pool, 'work_locations', 'location_id', location_id)
    );
  });
};

module.exports = deleteLocation;
