import { useState } from "react";
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
    position: "unset",
    maxWidth: 300,
    maxHeight: 450,
  },
  biography: { cursor: "pointer" },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgb(0 0 0 / 10%)",
  },
}));

export function Person() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { dataDetails } = useSelector((store) => store.searchResult);
  const type = ACTION_TYPES.SET_DETAILS;
  const type2 = ACTION_TYPES.SET_CREDITS;
  const { API_KEY, IMAGE_URL } = Constants;
  const [isMore, setIsMore] = useState(false);

  const params = useMemo(
    () => ({
      url: `person/${id}`,
      page: 1,
    }),
    [id]
  );

  useEffect(() => {
    id && dispatch(fetchSearch(type, params));
  }, [dispatch, id, params, type]);

  const params2 = useMemo(
    () => ({
      url: `person/${id}/combined_credits`,
      page: 1,
    }),
    [id]
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
                  dataDetails.profile_path
                    ? `${IMAGE_URL}w500${dataDetails.profile_path}?api_key=${API_KEY}`
                    : "/images/Not-available4.png"
                }
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {dataDetails.name}
                </Typography>

                <br />
                <Typography variant="body2" gutterBottom>
                  Biography
                </Typography>
                <Typography
                  className={classes.biography}
                  onClick={() => {
                    setIsMore(!isMore);
                  }}
                  variant="body2"
                  color="textSecondary"
                >
                  {dataDetails?.biography?.length < 500 || isMore
                    ? dataDetails?.biography
                    : `${dataDetails?.biography
                        ?.split("")
                        .slice(0, 500)
                        .join("")}......More`}
                </Typography>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </Grid>
        </Grid>
        <Credits />
      </Paper>
    </div>
  );
}
