import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/productDisplay.module.css';
import ProductModal from './productModal';
import { centsToPrice } from '../../functions/priceHelpers';
import Loader from '../loader';

function ProductDisplay() {

  const products = useSelector(state => state.products);
  const [showModal, setShowModal] = useState(-1);

  return (
    <div className={styles.container}>
      {
        products[0]=='loading' ? <Loader height="100%" background="#cd5554" dotColor="#fceed1"/> :
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