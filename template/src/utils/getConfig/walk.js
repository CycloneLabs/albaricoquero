const walk = (perfectObject, givenObject, validity = true) => {
  if (typeof perfectObject === 'object' && perfectObject !== null && validity) {
    return Object.keys(perfectObject).every(key => givenObject
      && Object.prototype.hasOwnProperty.call(givenObject, key)
      && walk(perfectObject[key], givenObject[key]));
  }
  return validity && typeof perfectObject === 'function' && perfectObject(givenObject);
};

export default walk;
