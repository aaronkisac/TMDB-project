import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ShowPage from "pages/ShowPage";
import Search from "components/Search";
import HomePage from "pages/HomePage";
import ActorPage from "pages/ActorPage";

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
            <ActorPage />
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
