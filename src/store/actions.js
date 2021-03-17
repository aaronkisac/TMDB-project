import to from "await-to-js";
import searchService from "services/searchService";
import { ACTION_TYPES } from "store/reducer";

export const fetchSearchData = (url, query, page) => async (dispatch) => {
  const [err, payload] = await to(
    searchService.getSearchData({
      url,
      query,
      page,
    })
  );

  if (err) {
    return;
  }

  dispatch({ type: ACTION_TYPES.SET_SEARCH, payload });
};

export const setActionSearchType = (payload) => async (dispatch) => {
  dispatch({ type: ACTION_TYPES.SET_SEARCH_TYPE, payload });
};

export const setSearchPage = (type, payload) => async (dispatch) => {
  dispatch({ type, payload });
};
