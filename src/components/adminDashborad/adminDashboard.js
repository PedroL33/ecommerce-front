import React, { useState } from 'react';
import OrderDisplay from './orderDisplay';
import ProductDisplay from './productsDisplay';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import styles from '../../styles/adminDashboard.module.css';
import { useSelector } from 'react-redux';

function AdminDashboard() {

  const [tab, setTab] = useState("orders");
  const orders = useSelector(state => state.activeOrders);

  return (
    <div className={styles.container}>
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