export const onChange = ({ setterFunction, isBoolean = false }) => {
  if (isBoolean) {
    return (e) => setterFunction(e);
  } else {
    return ({ target: { value } }) =>
      setterFunction(isBoolean ? value !== true.toString() : value);
  }
};
