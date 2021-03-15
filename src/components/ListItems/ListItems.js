import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import Constants from "config/constants";
import { useHistory } from "react-router-dom";
import TablePagination from "@material-ui/core/TablePagination";
import { useDispatch } from "react-redux";
import { setSearchPage } from "store/actions/storeActions";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "10px auto",
    position: "unset",
    width: "70%",
    minWidth: theme.spacing(70),
  },
  pagination: {
    position: "unset",
    "MuiTablePagination-selectRoot": { display: "none" },
  },
  listItem: {
    cursor: "pointer",
    position: "unset",
  },
  inline: {
    display: "inline",
  },
  square: {
    position: "unset",
    height: theme.spacing(29.7 * 0.6),
    width: theme.spacing(21 * 0.6),
    margin: "0 10px",
  },
}));

export function ListItems() {
  const { API_KEY, IMAGE_URL } = Constants;
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const { results, total_results } = useSelector(
    (store) => store.searchResult.searchList
  );
  const { searchType } = useSelector((store) => store.searchResult);
  const handleDetailsPage = (goPage, id) => {
    history.push(`${goPage}/${id}`);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
    dispatch(
      setSearchPage(
        "SET_SEARCH_PAGE",
        Math.floor((newPage * rowsPerPage) / 20) + 1
      )
    );
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
    dispatch(setSearchPage("SET_SEARCH_PAGE", 1));
  };

  return (
    <List className={classes.root}>
      {results
        ?.slice(
          (currentPage * rowsPerPage) % 20,
          ((currentPage * rowsPerPage) % 20) + rowsPerPage
        )
        ?.map((item) => {
          let name = "";
          let imgUrl = "";
          let overView = "";
          let date = "";
          const type =
            searchType && searchType !== "multi" ? searchType : item.media_type;
          switch (type) {
            case "person":
              name = item.name;
              overView = item.known_for_department || "";
              imgUrl = item.profile_path;
              break;
            case "movie":
              name = item.title;
              date = item.release_date;
              imgUrl = item.poster_path;
              overView = item.overview || "";
              break;

            case "tv":
              name = item.name;
              date = item.first_air_date;
              imgUrl = item.poster_path;
              overView = item.overview || "";
              break;

            default:
              break;
          }
          return (
            <React.Fragment key={item.id}>
              <ListItem
                onClick={() => handleDetailsPage(type, item.id)}
                className={classes.listItem}
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <Avatar
                    className={classes.square}
                    variant="square"
                    alt={name}
                    src={
                      imgUrl
                        ? `${IMAGE_URL}w185${imgUrl}?api_key=${API_KEY}`
                        : "/images/Not-available4.png"
                    }
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={name || ""}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {date
                          ? `${new Date(date)?.toLocaleString()?.split(",")[0]}`
                          : ""}
                      </Typography>
                      <br />
                      <br />
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {overView || ""}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          );
        })}
      {results && (
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 20]}
          className={classes.pagination}
          count={total_results}
          page={currentPage}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </List>
  );
}
