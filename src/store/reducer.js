import produce from "immer";

export const ACTION_TYPES = {
  SET_SEARCH: "SET_SEARCH",
  SET_SEARCH_TYPE: "SET_SEARCH_TYPE",
  SET_SEARCH_MENU: "SET_SEARCH_MENU",
  SET_SEARCH_PAGE: "SET_SEARCH_PAGE",
};

export const initialState = {
  searchList: "",
  searchPage: "",
  searchType: "",
  dataSearchMenu: "",
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
      case ACTION_TYPES.SET_SEARCH_MENU:
        draft.dataSearchMenu = action.payload.results.map((item) => {
          const label = item.title || item.name;
          const id = item.id || "";
          const media_type = item.media_type || "";
          return { id, label, media_type };
        });
        break;
      case ACTION_TYPES.SET_SEARCH_PAGE:
        draft.searchPage = action.payload;
        break;
      default:
        break;
    }
  });

export default storeData;
