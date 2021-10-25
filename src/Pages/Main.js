import React from "react";
import MainPage from "../Components/MainPage";
import NoteData from "../Pages/note";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function Main() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/notes/:id" component={NoteData} />
      </Switch>
    </Router>
  );
}
