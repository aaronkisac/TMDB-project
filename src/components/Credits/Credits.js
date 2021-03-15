import React, { useState } from "react";
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
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 30,
    position: "unset",
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
    margin: "10px",
    boxShadow: "0 2px 8px rgb(0 0 0 / 10%)",
    textAlign: "center",
    "&:hover": { boxShadow: "0 2px 8px rgb(0 0 0 / 50%)" },
  },
  lastCardText: {
    fontSize: 30,
  },
  lastCard: {
    textAlign: "center",
    cursor: "pointer",
    margin: "10px",
    width: "200px!important",
    height: "342px!important",
    paddingTop: "50px!important",
    borderRadius: "8px",
    "&:hover": { boxShadow: "0 2px 8px rgb(0 0 0 / 50%)" },
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
  const { show } = useParams();
  const { dataCredits } = useSelector((store) => store.searchResult);
  const [creditsCount, setCreditsCount] = useState(10);
  const handleDetailsPage = (page, id) => {
    history.push(`/${page}/${id}`);
  };

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2}>
        {dataCredits.length &&
          dataCredits?.slice(0, creditsCount).map((tile,index) => {
            let imgPath = "";
            let name = "";
            let details = "";
            if (show) {
              imgPath = tile.profile_path;
              name = tile.name || tile.title;
              details = `${tile.total_episode_count} Episodes`;
            } else {
              imgPath = tile.poster_path;
              name = tile.name;
              details = tile.character;
            }
            return (
              <GridListTile
                onClick={() => {
                  handleDetailsPage(show ? "person" : tile.media_type, tile.id);
                }}
                className={classes.list}
                key={`key-${index}-${tile.id}`}
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
                        {name || ""}
                      </Typography>
                      <Typography
                        className={classes.text}
                        color="textSecondary"
                        gutterBottom
                      >
                        {details || ""}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </GridListTile>
            );
          })}
        {dataCredits.length > creditsCount ? (
          <GridListTile
            className={classes.lastCard}
            onClick={() => {
              setCreditsCount(creditsCount + 10);
            }}
            key="button1"
          >
            <Typography className={classes.lastCardText} gutterBottom>
              View More
            </Typography>
            <ArrowForwardIosIcon style={{ fontSize: 200 }} />
          </GridListTile>
        ) : (
          ""
        )}
      </GridList>
    </div>
  );
}
