import produce from "immer";

export const ACTION_TYPES = {
  SET_SEARCH: "SET_SEARCH",
  SET_SEARCH_TYPE: "SET_SEARCH_TYPE",
  SET_SEARCH_PAGE: "SET_SEARCH_PAGE",
};

export const initialState = {
  searchList: "",
  searchPage: "",
  searchType: "",
};

const storeData = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ACTION_TYPES.SET_SEARCH:
        draft.searchList = action.payload;
        break;
      case ACTION_TYPES.SET_SEARCH_TYPE:
        draft.searchType = action.payload;
        break;
      
      case ACTION_TYPES.SET_SEARCH_PAGE:
        draft.searchPage = action.payload;
        break;
      default:
        break;
    }
  });

export default storeData;
