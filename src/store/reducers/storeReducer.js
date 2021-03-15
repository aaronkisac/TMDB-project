import produce from "immer";

export const ACTION_TYPES = {
  SET_SEARCH: "SET_SEARCH",
  SET_SEARCH_TYPE: "SET_SEARCH_TYPE",
  SET_DETAILS: "SET_DETAILS",
  SET_CREDITS: "SET_CREDITS",
  SET_SEARCH_MENU: "SET_SEARCH_MENU",
  SET_SEARCH_PAGE: "SET_SEARCH_PAGE",
};

export const initialState = {
  searchList: "",
  searchType: "",
  dataDetails: "",
  dataCredits: "",
  dataSearchMenu: "",
  searchPage: "",
};

const searchReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ACTION_TYPES.SET_SEARCH:
        draft.searchList = action.payload;
        break;
      case ACTION_TYPES.SET_SEARCH_TYPE:
        draft.searchType = action.payload;
        break;
      case ACTION_TYPES.SET_DETAILS:
        draft.dataDetails = action.payload;
        break;
      case ACTION_TYPES.SET_CREDITS:
        draft.dataCredits = action.payload.cast.sort((a, b) =>
          a.vote_average ? b.popularity - a.popularity : 0
        );
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

export default searchReducer;
