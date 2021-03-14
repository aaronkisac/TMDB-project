import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearch } from "store/actions/storeActions";
import { ACTION_TYPES } from "store/reducers/storeReducer";
import Constants from "config/constants";
import { Credits } from "components";
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
    maxWidth: 300,
    maxHeight: 450,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgb(0 0 0 / 10%)",
  },
}));

export function Show() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id, show } = useParams();
  const { dataDetails } = useSelector((store) => store.searchResult);
  console.log("​Show -> dataDetails", dataDetails);
  const type = ACTION_TYPES.SET_DETAILS;
  const type2 = ACTION_TYPES.SET_CREDITS;
  const { API_KEY, IMAGE_URL } = Constants;

  const params = useMemo(
    () => ({
      url: `${show}/${id}`,
      page: 1,
    }),
    [id, show]
  );

  useEffect(() => {
    id && dispatch(fetchSearch(type, params));
  }, [dispatch, id, params, type]);

  const params2 = useMemo(
    () => ({
      url: `${show}/${id}/${show === "tv" ? "aggregate_credits" : "credits"}`,
      page: 1,
    }),
    [id, show]
  );

  useEffect(() => {
    id && dispatch(fetchSearch(type2, params2));
  }, [dispatch, id, params2, type2]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt="complex"
                src={
                  dataDetails.poster_path
                    ? `${IMAGE_URL}w500${dataDetails.poster_path}?api_key=${API_KEY}`
                    : "/images/Not-available4.png"
                }
              />
              {console.log(
                `${IMAGE_URL}w500${dataDetails.poster_path}?api_key=${API_KEY}`
              )}
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {dataDetails.name || dataDetails.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {dataDetails?.genres?.reduce(
                    (acc, item, index) =>
                      acc ? `${acc}, ${item.name}` : item.name,
                    ""
                  )}
                  {" - "}
                  {show === "movie"
                    ? dataDetails.runtime
                    : dataDetails.episode_run_time}
                  mins
                </Typography>
                <br />
                <Typography variant="body2" gutterBottom>
                  Overview
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {dataDetails.overview}
                </Typography>
              </Grid>
              <Grid item>
                {/* <Typography variant="body2" style={{ cursor: "pointer" }}>
                  Remove
                </Typography> */}
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                {new Date(
                  dataDetails.first_air_date || dataDetails.release_date
                ).getFullYear()}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Credits />
      </Paper>
    </div>
  );
}
