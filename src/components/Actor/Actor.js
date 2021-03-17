import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

import { useState } from "react";
import Credits from "components/Credits";

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

export default function Actor({  path, name, biography, creditsList }) {
  const classes = useStyles();
  const [isMore, setIsMore] = useState(false);

  function handleMore() {
    setIsMore(!isMore);
  }

  const details =
    biography?.length < 500 || isMore
      ? biography
      : `${biography?.slice(0, 500)}......More`;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase disabled className={classes.image}>
              <img className={classes.img} alt="complex" src={path} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {name}
                </Typography>

                <br />
                <Typography variant="body2" gutterBottom>
                  Biography
                </Typography>
                <Typography
                  className={classes.biography}
                  onClick={handleMore}
                  variant="body2"
                  color="textSecondary"
                >
                  {details}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Credits {...creditsList} creditsList={creditsList} />
      </Paper>
    </div>
  );
}
