import to from "await-to-js";

import searchService from "services/searchService";



export const fetchSearch = (type, params) => async (dispatch) => {
  const [err, payload] = await to(searchService.getSearchData(params));
  if (err) {
    return;
  }

  dispatch({
    type,
    payload,
  });
};
export const setSearchType = (type, payload) => async (dispatch) => {
  dispatch({
    type,
    payload,
  });
};