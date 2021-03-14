import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearch } from "store/actions/storeActions";
import "./App.css";
import Constants from "config/constants";
import { ACTION_TYPES } from "store/reducers/storeReducer";
export function App() {
  const dispatch = useDispatch();
  const { searchResult } = useSelector((store) => store);
  const type = ACTION_TYPES.SET_SEARCH;

  const id =
    searchResult.searchList?.results?.length > 0
      ? searchResult.searchList?.results[0]?.id
      : "";
  console.log("​App -> id", id);

  const params = useMemo(
    () => ({
      url: Constants.URL_SEARCH_PERSON,
      query: "cuneyt arkin",
      page: 1,
    }),
    []
  );
  console.log("​App -> store", searchResult);
  //
  useEffect(() => {
    dispatch(fetchSearch(type, params));
  }, [dispatch, params, type]);

  const type2 = ACTION_TYPES.SET_DETAILS;

  const params2 = useMemo(
    () => ({
      url: `person/${id}`,
      page: 1,
    }),
    [id]
  );

  useEffect(() => {
    id && dispatch(fetchSearch(type2, params2));
  }, [dispatch, id, params2, type2]);

  const type3 = ACTION_TYPES.SET_CREDITS;

  const params3 = useMemo(
    () => ({
      url: `person/${id}/combined_credits`,
      page: 1,
    }),
    [id]
  );

  useEffect(() => {
    id && dispatch(fetchSearch(type3, params3));
  }, [dispatch, id, params3, type3]);

  return (
    <div className="App">
      {JSON.stringify(searchResult.searchList.results)} App
    </div>
  );
}
