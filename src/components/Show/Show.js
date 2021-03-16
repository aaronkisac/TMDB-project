import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { useState } from "react";
import Casts from "components/Casts";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "0 auto",
    maxWidth: 1000,
  },
  image: {
    position: "unset",
    maxWidth: 300,
    maxHeight: 450,
  },
  overview: { cursor: "pointer" },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgb(0 0 0 / 10%)",
  },
}));

export default function Show({
  path,
  showTitle,
  showGenres,
  date,
  releaseYear,
  overview,
  castsList,
}) {
  const classes = useStyles();
  const [isMore, setIsMore] = useState(false);
  
  const details =
  overview?.length < 500 || isMore
  ? overview
  : `${overview?.slice(0, 500)}......More`;
  
  function handleMore() {
    setIsMore(!isMore);
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <div className={classes.image}>
              <img className={classes.img} alt="complex" src={path} />
            </div>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {showTitle}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {showGenres}
                  {" - "}
                  {date}
                  mins
                </Typography>
                <br />
                <Typography variant="body2" gutterBottom>
                  Overview
                </Typography>
                <Typography
                  className={classes.overview}
                  onClick={handleMore}
                  variant="body2"
                  color="textSecondary"
                >
                  {details}
                </Typography>
              </Grid>
              <Grid item></Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{releaseYear}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Casts castsList={castsList} />
      </Paper>
    </div>
  );
}
