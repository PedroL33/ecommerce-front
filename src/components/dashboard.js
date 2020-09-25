import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './nav';


function Dashboard(){
  
  const dispatch = useDispatch();

  return(
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/">
          
        </Route>
        <Route path="/search/:id">

        </Route>
        <Route path="/category/:id">
          
        </Route>
        <Route path="/:id">

        </Route>
      </Switch>
    </Router>
  )
}

export default Dashboard;