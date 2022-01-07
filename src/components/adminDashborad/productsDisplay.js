import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearProducts } from '../../actions/adminActions';
import { loadAllProducts } from '../../actions/apiCalls/products';
import styles from '../../styles/productDisplay.module.css';
import ProductModal from './productModal';
import { centsToPrice } from '../../functions/priceHelpers';
import Loader from '../loader';

function ProductDisplay() {

  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const [showModal, setShowModal] = useState(-1);

  useEffect(() => {
    dispatch(loadAllProducts())
    return () => {
      dispatch(clearProducts())
    }
  }, [dispatch])

  return (
    <div className={styles.container}>
      {
        products[0]=='loading' ? <Loader height="100%" background="#a0d2eb"/> :
        products[0]!=="loading" && products.length ? products.map((item, index) => (
          <div className={styles.item} key={item.name}>
            <div className={styles.itemTitle}>
              <div className={styles.itemImage} style={{backgroundImage: `url(${item.image ? item.image: window.location.origin + "/images/noImage.png"})`}}></div>
              <div className={styles.itemName}>{item.name}</div>
            </div>
            <div className={styles.itemPrice}>{centsToPrice(item.price)}</div>
            <i className={`far fa-edit ${styles.editButton}`} onClick={(e) => setShowModal(index)}></i>
            {showModal===index && <ProductModal setShowModal={setShowModal} item={item}/>}
          </div>
        )) :
        <div className={styles.emptyMessage}>No Products Available</div>
      }
    </div>
  )
}

export default ProductDisplay;