export const deleteRow = async (apiURL, packagedInfo) => {
  const response = await fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(packagedInfo),
  });
  const returnMessage = await response.json();
  return returnMessage;
};
