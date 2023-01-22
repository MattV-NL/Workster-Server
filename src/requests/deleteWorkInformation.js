const deleteRow = require('../utilFunc/deleteRow');

const deleteWorkInformation = async (app, pool, url) => {
  app.post(url, async (req, res) => {
    const information_id = req.body.information_id;
    res.send(
      await deleteRow(
        pool,
        'work_information',
        'information_id',
        information_id
      )
    );
  });
};

module.exports = deleteWorkInformation;
