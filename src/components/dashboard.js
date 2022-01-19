import React, { useEffect, useState, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, createCart } from '../actions/apiCalls/cart';
import { clearNotification } from '../actions';
import Nav from './nav';
import FrontPage from './frontPage/frontPage';
import ResultsDisplay from './animatedResults/resultsDisplay';
import ProductDetail from './productDetail';
import Notification from './notification';
import CheckoutForm from './stripe/checkoutForm';
import Thankyou from './thankyou';
import Login from './login';
import AdminDashboard from './adminDashborad/adminDashboard';
import { checkAuth } from '../functions/authHelpers';
import Footer from './footer';
import Signup from './signup';
import ScrollTop from './scrollTop';

function Dashboard() {

  const dispatch = useDispatch();
  const [showNotification, setShowNotification] = useState(false);
  const notification = useSelector(state => state.notification);
  const notificationRef = useRef(null);
  const [showCart, setShowCart] = useState(false);

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
    const cartToken = localStorage.getItem('cartToken');
    if(cartToken) {
      dispatch(getCart(cartToken))
    }else {
      dispatch(createCart())
    }
  }, [])

  useEffect(() => {
    if(notification.message) {
      if(notification.message === 'jwt expired') {
        dispatch(createCart());
        dispatch(clearNotification())
      }else {
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false)
          setTimeout(() => {
            dispatch(clearNotification())
          }, 700);
        }, 3000)
      }
    }else {
      setShowNotification(false);
    }
  }, [notification])

  return(
    <Router>
      <ScrollTop />
      <Nav notificationRef={notificationRef} showCart={showCart} setShowCart={setShowCart} />
      <Notification notificationRef={notificationRef} show={showNotification} setShow={setShowNotification}/>
      <Switch>
        <Route exact path="/" component={FrontPage}></Route>

        <PublicRoute path="/login" component={Login}></PublicRoute> 

        <PrivateRoute path="/user" component={AdminDashboard}></PrivateRoute>

        <Route path="/search/:value" render={() => <ResultsDisplay showCart={showCart} setShowCart={setShowCart}/>}></Route>

        <Route path="/category/:value" render={() => <ResultsDisplay showCart={showCart} setShowCart={setShowCart}/>}></Route>
        
        <Route path="/item/:id" render={() => <ProductDetail showCart={showCart} setShowCart={setShowCart} />}></Route>

        <Route path="/checkout" component={CheckoutForm}></Route>

        <Route path="/thankyou/:orderInfo/:orderId" component={Thankyou}></Route>

        <Route path="/signup" component={Signup}></Route>

        <Redirect from="*" to="/" />
      </Switch>
      <Footer />
    </Router>
  )
}

export default Dashboard;