const locationIsSaved = async (pool, user_id, lon, lat) => {
  const response = await pool.query(
    'SELECT latitude, longitude FROM work_locations WHERE user_id = $1',
    [user_id]
  );
  const checkLat = async (coordinate) => {
    if ((await coordinate.latitude) == lat) {
      return true;
    }
    return false;
  };

  const checkLon = async (coordinate) => {
    if ((await coordinate.longitude) == lon) {
      return true;
    }
    return false;
  };
  if (response.rows.some(checkLat) && response.rows.some(checkLon)) {
    return true;
  } else {
    false;
  }
};

module.exports = locationIsSaved;
