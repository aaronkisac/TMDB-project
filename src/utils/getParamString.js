const getParamString = (params = {}) =>
  Object.entries(params).reduce(
    (acc, param, index) =>
      param[0] !== "url" ? `${acc}&${param[0]}=${param[1]}` : acc,
    `${params?.url}?`
  );

export default getParamString;
