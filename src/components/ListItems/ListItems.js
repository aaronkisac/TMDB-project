import React from "react";
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

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "10px auto",
    position: "unset",
    width: "70%",
    minWidth: theme.spacing(70),
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
  const history = useHistory();
  // const { results, page, total_pages, total_results } = useSelector(
  const { results } = useSelector((store) => store.searchResult.searchList);
  const { searchType } = useSelector((store) => store.searchResult);
  const handleDetailsPage = (page, id) => {
    history.push(`${page}/${id}`);
  };
  return (
    <List className={classes.root}>
      {results?.map((item) => {
        let name = "";
        let imgUrl = "";
        let overView = "";
        let date = "";
        const type =
          searchType && searchType !== "multi" ? searchType : item.media_type;
        switch (type) {
          case "person":
            name = item.name;
            overView = item.known_for_department;
            imgUrl = item.profile_path;
            break;
          case "movie":
            name = item.title;
            date = item.release_date;
            imgUrl = item.poster_path;
            overView = item.overview;
            break;

          case "tv":
            name = item.name;
            date = item.first_air_date;
            imgUrl = item.poster_path;
            overView = item.overview;
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
                primary={name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {date
                        ? `${new Date(date).toLocaleString().split(",")[0]}`
                        : ""}
                    </Typography>
                    <div>{overView}</div>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        );
      })}
    </List>
  );
}
