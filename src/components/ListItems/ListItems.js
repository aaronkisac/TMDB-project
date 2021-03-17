import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import TablePagination from "@material-ui/core/TablePagination";

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setSearchPage } from "store/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "10px auto",
    position: "unset",
    width: "70%",
    minWidth: theme.spacing(70),
    maxWidth: theme.spacing(150),
  },
  pagination: {
    position: "unset",
    "MuiTablePagination-selectRoot": { display: "none" },
  },
  listItem: {
    cursor: "pointer",
    position: "unset",
    "&:hover": { boxShadow: "0 2px 8px rgb(0 0 0 / 20%)" },
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

export default function ListItems() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { results, total_results, page } = useSelector((store) => {
    return store.storeData.searchList;
  });
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(((page - 1) * 20) / rowsPerPage);
  }, [page, rowsPerPage]);

  const handleDetailsPage = (goPage, id) => {
    history.push(`/${goPage}/${id}`);
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
    <List data-testid="searchList" className={classes.root}>
      {results
        ?.slice(
          (currentPage * rowsPerPage) % 20,
          ((currentPage * rowsPerPage) % 20) + rowsPerPage
        )
        ?.map((item, index) => {
          const { name, imgUrl, overView, date, type, id } = item;
          return (
            <React.Fragment key={item.id}>
              <ListItem
                onClick={() => handleDetailsPage(type, id)}
                className={classes.listItem}
                alignItems="flex-start"
                key={`key-${index}-${item.id}`}
              >
                <ListItemAvatar>
                  <Avatar
                    className={classes.square}
                    variant="square"
                    alt={name}
                    src={imgUrl}
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
                        {date}
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
