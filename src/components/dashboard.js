import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './nav';
import FrontPage from './frontPage/frontPage';
import ResultsDisplay from './animatedResults/resultsDisplay';
import ProductDetail from './productDetail';
import Notification from './notification';

function Dashboard(){
  return(
    <Router>
      <Nav />
      <Notification />
      <Switch>
        <Route exact path="/" component={FrontPage}></Route>

        <Route path="/search/:querry" component={ResultsDisplay}></Route>

        <Route path="/category/:querry" component={ResultsDisplay}></Route>
        
        <Route path="/item/:id" component={ProductDetail}></Route>
      </Switch>
    </Router>
  )
}

export default Dashboard;