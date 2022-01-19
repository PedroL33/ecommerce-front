import React, { useState, useEffect } from 'react';
import OrderDisplay from './orderDisplay';
import ProductDisplay from './productsDisplay';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { clearProducts } from '../../actions/adminActions';
import { loadAllProducts } from '../../actions/apiCalls/products';
import styles from '../../styles/adminDashboard.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function AdminDashboard() {

  const dispatch = useDispatch();
  const [tab, setTab] = useState("orders");
  const orders = useSelector(state => state.activeOrders);
  const history = useHistory();

  useEffect(() => {
    dispatch(loadAllProducts())
    return () => {
      dispatch(clearProducts())
    }
  }, [dispatch])

  const logout = () => {
    localStorage.removeItem('authentication');
    history.push('/');
  }

  return (
    <div className={styles.container}>
      <button className={styles.logout} onClick={()=>logout()}>Logout</button>
      <div className={styles.tabs}>
        <div className={tab==="orders" ? `${styles.tab} ${styles.active}`:styles.tab} onClick={() => setTab("orders")}>
          {orders.length>0 && orders[0]!=="loading" && <div className={styles.orderCount}>{orders.length}</div>}
          Orders
        </div>
        <div className={tab==="products" ? `${styles.tab} ${styles.active}`:styles.tab} onClick={() => setTab("products")}>
          Products
        </div>
      </div>
      <div className={styles.content}>
        <SwitchTransition mode="out-in">
          <CSSTransition key={tab} classNames="adminDashFade" timeout={300}>
            {
              tab==="orders" ? <OrderDisplay /> : <ProductDisplay />
            }
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  )
}

export default AdminDashboard;