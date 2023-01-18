import checkForSavedData from '../checkForSavedData.js';
import locationIsSaved from '../locationIsSaved.js';

export const saveLocation = async (req, res) => {
    const body = req.body;

    try {
        if (
            (await checkForSavedData(body.user_id, pool, 'work_locations')) &&
            (await locationIsSaved(pool, body.user_id, body.lon, body.lat))
          ) {
            res.send({ message: 'location already saved' });
          } else {
            await pool.query(
              'INSERT INTO work_locations (user_id, latitude, longitude) VALUES ($1, $2, $3)',
              [body.user_id, body.lat, body.lon]
            );
            res.send({ message: 'location successfully saved to database' });
          }
    } catch (err) {
        res.send({ message: 'server error', status: 500});
        console.log(err);
    }

}