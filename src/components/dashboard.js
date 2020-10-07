import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './nav';
import FrontPage from './frontPage/frontPage';
import ResultsDisplay from './animatedResults/resultsDisplay';

function Dashboard(){
  return(
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/">
          <FrontPage />
        </Route>
        <Route path="/search/:querry" component={ResultsDisplay}>
        </Route>
        <Route path="/category/:querry" component={ResultsDisplay}>
        </Route>
        <Route path="/item/:id">
          
        </Route>
      </Switch>
    </Router>
  )
}

export default Dashboard;