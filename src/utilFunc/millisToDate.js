const millisToDate = (millis) => {
  const day = new Date(millis * 1000).getDay() + 1;
  const month = new Date(millis * 1000).getMonth() + 1;
  const year = new Date(millis * 1000).getFullYear();
  const hour = new Date(millis * 1000).getHours();
  const minute = new Date(millis * 1000).getMinutes();

  return `${hour}:${minute}, ${day}-${month}-${year}`;
};

module.exports = millisToDate;
