const getParamString = (params = {}) =>
  Object.entries(params).reduce(
    (acc, param) =>
      param[0] !== "url" ? `${acc}&${param[0]}=${param[1]}` : acc,
    `${params?.url}?`
  );

export default getParamString;
