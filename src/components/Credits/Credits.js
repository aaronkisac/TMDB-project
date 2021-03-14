import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { useSelector } from "react-redux";
import Constants from "config/constants";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { useHistory, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  textBox: { padding: "10px" },
  text: { fontSize: "16px" },
  card: {
    maxWidth: 200,
    maxHeight: 400,
    margin: "10px 10px",
    boxShadow: "0 2px 8px rgb(0 0 0 / 10%)",
  },
  media: { margin: "0", borderRadius: "8px", width: "100%" },
  gridList: {
    cursor: "pointer",
    height: "100%!important",
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  list: {
    margin: "0",
    width: "auto!important",
    height: "auto!important",
    maxWidth: 200,
    paddingBottom: "10px",
    borderRadius: "8px",
    overflow: "hidden",
  },
}));

export function Credits() {
  const { API_KEY, IMAGE_URL } = Constants;
  const history = useHistory();
  const classes = useStyles();
  const { id, show } = useParams();
  console.log("​Credits -> id, show, person ", id, show);

  const { cast } = useSelector((store) => {
    console.log(store);
    return store.searchResult.dataCredits;
  });
  console.log("credits -> searchType", cast);
  const handleDetailsPage = (page, id) => {
    history.push(`/${page}/${id}`);
  };
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2}>
        {cast?.slice(0, 10)?.map((tile) => {
          let imgPath = "";
          let name = "";
          if (show) {
            imgPath = tile.profile_path;
            name = tile.name;
          } else {
            imgPath = tile.poster_path;
            name = tile.title;
          }
          return (
            <GridListTile
              onClick={() => {
                handleDetailsPage(show ? "person" : tile.media_type, tile.id);
              }}
              className={classes.list}
              key={tile.id}
            >
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={tile.name}
                    className={classes.media}
                    image={
                      imgPath
                        ? `${IMAGE_URL}w185${imgPath}?api_key=${API_KEY}`
                        : "/images/Not-available4.png"
                    }
                    title={tile.name}
                  />
                  <CardContent className={classes.textBox}>
                    <Typography className={classes.text} gutterBottom>
                      {name}
                    </Typography>
                    <Typography
                      className={classes.text}
                      color="textSecondary"
                      gutterBottom
                    >
                      {tile.character || `${tile.total_episode_count} Episodes`}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>{" "}
            </GridListTile>
          );
        })}
      </GridList>
    </div>
  );
}
