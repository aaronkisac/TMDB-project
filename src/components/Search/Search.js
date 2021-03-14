import { useMemo, useEffect, useState, useRef } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { StyledForm, Wrapper } from "./Search.styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearch, setSearchType } from "store/actions/storeActions";
import { ACTION_TYPES } from "store/reducers/storeReducer";
const options2 = [
  { id: "multi", label: "Multi" },
  { id: "movie", label: "Movie" },
  { id: "tv", label: "TV" },
  { id: "person", label: "Person" },
];

export const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  menu: { width: "120px", marginTop: "5px" },
  submitButton: {
    margin: "0 10px",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    margin: "0",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      margin: "0",
      //   marginLeft: theme.spacing(3),
      width: "100%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "120ch",
    },
  },
}));

export const Search = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { searchResult } = useSelector((store) => store);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const type = ACTION_TYPES.SET_SEARCH;
  const [selectedQuery, setSelectedQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedItem, setSelectedItem] = useState("multi");

  console.log("​HomePage -> ", searchResult);
  const params = useMemo(
    () => ({
      url: `search/${selectedItem}`,
      query: selectedQuery,
      page: 1,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedQuery, selectedItem]
  );

  useEffect(() => {
    selectedQuery && dispatch(fetchSearch(type, params));
  }, [dispatch, params, selectedQuery, type]);

  const handleClick = (e) => {
    e?.preventDefault();
    setSelectedQuery(searchInput);
  };

  const handleMenuItemClick = (event, item) => {
    setSelectedItem(item);
    dispatch(setSearchType("SET_SEARCH_TYPE", item));
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <Wrapper className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <StyledForm>
            <Grid container alignItems="center">
              <Grid item xs={1}>
                <Typography className={classes.title} variant="h6">
                  TMDB
                </Typography>
              </Grid>

              <Grid item xs={1}>
                <ButtonGroup
                  variant="contained"
                  color="primary"
                  ref={anchorRef}
                  aria-label="split button"
                >
                  <Button onClick={handleToggle}>
                    {options2.find((item) => item.id === selectedItem).label}
                  </Button>
                  <Button
                    color="primary"
                    size="small"
                    aria-controls={open ? "split-button-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                  >
                    <ArrowDropDownIcon />
                  </Button>
                </ButtonGroup>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            className={classes.menu}
                            id="split-button-menu"
                          >
                            {options2.map((option) => (
                              <MenuItem
                                key={option.id}
                                selected={option.id === selectedItem}
                                onClick={(event) =>
                                  handleMenuItemClick(event, option.id)
                                }
                              >
                                {option.label}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Grid>
              <Grid item xs={9}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search for a movie, tv show, person......"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>
              </Grid>
              <Grid item xs={1}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.submitButton}
                  type="submit"
                  onClick={handleClick}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </StyledForm>
        </Toolbar>
      </AppBar>
    </Wrapper>
  );
};
