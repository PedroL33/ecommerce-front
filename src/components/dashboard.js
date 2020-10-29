import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from '../actions';
import Nav from './nav';
import FrontPage from './frontPage/frontPage';
import ResultsDisplay from './animatedResults/resultsDisplay';
import ProductDetail from './productDetail';
import Notification from './notification';
import StripeContainer from './stripe/stripeContainer';
import Thankyou from './thankyou';
import Login from './login';

function Dashboard() {

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if(storedCart) {
      const oldCart = JSON.parse(storedCart);
      if(oldCart.length > cart.length) {
        dispatch(setCart(oldCart))
      }
    }
  })

  return(
    <Router>
      <Nav />
      <Notification />
      <Switch>
        <Route exact path="/" component={FrontPage}></Route>

        <Route path="/login" component={Login}></Route> 

        <Route path="/search/:querry" component={ResultsDisplay}></Route>

        <Route path="/category/:querry" component={ResultsDisplay}></Route>
        
        <Route path="/item/:id" component={ProductDetail}></Route>

        <Route path="/checkout" component={StripeContainer}></Route>

        <Route path="/thankyou/:orderInfo" component={Thankyou}></Route>
      </Switch>
    </Router>
  )
}

export default Dashboard;