import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
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
import AdminDashboard from './adminDashborad/adminDashboard';
import { checkAuth } from '../functions/authHelpers';
import Footer from './footer';
import Signup from './signup';
import ScrollTop from './scrollTop';

function Dashboard() {

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      checkAuth()
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )

  const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      !checkAuth()
      ? <Component {...props} />
      : <Redirect to='/user' />
    )} />
  )

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
      <ScrollTop />
      <Nav />
      <Notification />
      <Switch>
        <Route exact path="/" component={FrontPage}></Route>

        <PublicRoute path="/login" component={Login}></PublicRoute> 

        <PrivateRoute path="/user" component={AdminDashboard}></PrivateRoute>

        <Route path="/search/:value" component={ResultsDisplay}></Route>

        <Route path="/category/:value" component={ResultsDisplay}></Route>
        
        <Route path="/item/:id" component={ProductDetail}></Route>

        <Route path="/checkout" component={StripeContainer}></Route>

        <Route path="/thankyou/:orderInfo/:orderId" component={Thankyou}></Route>

        <Route path="/signup" component={Signup}></Route>

        <Redirect from="*" to="/" />
      </Switch>
      <Footer />
    </Router>
  )
}

export default Dashboard;