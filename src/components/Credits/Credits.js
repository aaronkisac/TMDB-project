import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import { useHistory } from "react-router-dom";

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

export default function Credits({ creditsList }) {
  const classes = useStyles();
  const history = useHistory();
  const [creditsCount, setCreditsCount] = useState(10);

  const handleDetailsPage = (type, id) => {
    history.push(`/${type}/${id}`);
  };

  return (
    <div className={classes.root}>
      <GridList
        data-testid="creditsCards"
        className={classes.gridList}
        cols={2}
      >
        {creditsList?.length &&
          creditsList?.slice(0, creditsCount).map((tile, index) => {
            return (
              <GridListTile
                onClick={() => {
                  handleDetailsPage(tile.type, tile.id);
                }}
                className={classes.list}
                key={`key-${index}-${tile.id}`}
              >
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      data-testid={`creditImage${index}`}
                      component="img"
                      alt={tile.name}
                      className={classes.media}
                      image={tile.imgPath}
                      title={tile.name}
                    />
                    <CardContent className={classes.textBox}>
                      <Typography className={classes.text} gutterBottom>
                        {tile.name}
                      </Typography>
                      <Typography
                        className={classes.text}
                        color="textSecondary"
                        gutterBottom
                      >
                        {tile.character}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </GridListTile>
            );
          })}
        {creditsList?.length > creditsCount ? (
          <GridListTile
            data-testid="moreCardButton"
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
