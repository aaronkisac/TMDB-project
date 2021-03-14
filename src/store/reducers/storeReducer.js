import produce from "immer";

export const ACTION_TYPES = {
  SET_SEARCH: "SET_SEARCH",
  SET_SEARCH_TYPE: "SET_SEARCH_TYPE",
  SET_DETAILS: "SET_DETAILS",
  SET_CREDITS: "SET_CREDITS",
};

export const initialState = {
  searchList: "",
  searchType: "",
  dataDetails: "",
  dataCredits: "",
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
        draft.dataCredits = action.payload;
        break;

      default:
        break;
    }
  });

export default searchReducer;
