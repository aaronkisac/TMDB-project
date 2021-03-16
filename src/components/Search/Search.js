import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
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

import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchData, setSearchType } from "store/actions";
import { StyledForm, Wrapper } from "./Search.styles";

const options = [
  { id: "multi", label: "All" },
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

  searchMenu: {
    width: "100%",
    transform: "translate3d(0, 50px, 0px)!important",
  },

  submitButton: {
    margin: "0 10px",
  },
  searchGrid: {
    position: "relative",
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
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const Search = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { dataSearchMenu, searchPage } = useSelector(
    (store) => store.storeData
  );
  const [open, setOpen] = useState(false);
  const [openSearchMenu, setOpenSearchMenu] = useState(false);
  const anchorRef = useRef(null);
  const [selectedQuery, setSelectedQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedItem, setSelectedItem] = useState("multi");
  const [optionsSearch, setOptionsSearch] = useState([]);

  useEffect(() => {
    dataSearchMenu.length &&
      setOptionsSearch(
        selectedItem === "multi"
          ? dataSearchMenu?.slice(0, 12)
          : dataSearchMenu?.slice(0, 12).map((item) => ({
              ...item,
              media_type: selectedItem,
            }))
      );
  }, [dataSearchMenu, selectedItem]);

  useEffect(() => {
    const searchInputLength = searchInput.length;
    searchInputLength > 4 &&
      dispatch(fetchSearchData(selectedItem, searchInput, searchPage));
    searchInputLength > 4 ? setOpenSearchMenu(true) : setOpenSearchMenu(false);
  }, [dispatch, searchInput, searchPage, selectedItem]);

  useEffect(() => {
    selectedQuery &&
      dispatch(
        fetchSearchData(selectedItem, selectedQuery || searchInput, searchPage)
      );
  }, [dispatch, searchInput, searchPage, selectedItem, selectedQuery]);

  const handleClick = (e) => {
    e?.preventDefault();
    setSelectedQuery(searchInput);
    history.push("/");
    setSearchInput("");
  };

  const handleMenuItemClick = (event, item) => {
    setSelectedItem(item);
    dispatch(setSearchType(item));
    setOpen(false);
  };

  const handleMenuItemClickForSearchMenu = (id, type) => {
    setOpenSearchMenu(false);
    history.push(`/${type}/${id}`);
    setSearchInput("");
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

  const handleCloseForSearchMenu = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpenSearchMenu(false);
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
                <MenuItem
                  onClick={() => history.push("/")}
                  className={classes.title}
                  variant="h6"
                >
                  TMDB
                </MenuItem>
              </Grid>

              <Grid item xs={2}>
                <ButtonGroup
                  variant="contained"
                  color="primary"
                  ref={anchorRef}
                  aria-label="split button"
                >
                  <Button onClick={handleToggle}>
                    {options.find((item) => item.id === selectedItem).label}
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
                            {options.map((option) => (
                              <MenuItem
                                key={option.id}
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
              <Grid item xs={8} className={classes.searchGrid}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    autoFocus
                    placeholder="Search for a movie, tv show, person......"
                    value={searchInput}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>
                <Popper
                  open={openSearchMenu}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                  className={classes.searchMenu}
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
                        <ClickAwayListener
                          onClickAway={handleCloseForSearchMenu}
                        >
                          <MenuList
                            className={classes.menu2}
                            id="split-button-menu"
                          >
                            {optionsSearch.map((option) => (
                              <MenuItem
                                key={option.id}
                                selected={option.id === selectedItem}
                                onClick={() =>
                                  handleMenuItemClickForSearchMenu(
                                    option.id,
                                    option.media_type
                                  )
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
export default Search;
