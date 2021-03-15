import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Search } from "components";

import { HomePage, PersonPage, ShowPage } from "pages";
const RouterApp = () => {
  return (
    <>
      <Router>
        <Search />

        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/person/:id">
            <PersonPage />
          </Route>
          <Route exact path="/:show/:id">
            <ShowPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default RouterApp;
