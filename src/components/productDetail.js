import React, { useEffect } from 'react';
import { loadProductById, singleProductClear } from '../actions';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './loader';
import styles from '../styles/productDetail.module.css';
import Fade from 'react-reveal/Fade';
import PurchaseButtons from './purchaseButtons';
import { centsToPrice } from '../functions/priceHelpers';

function ProductDetail() {

  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector(state => state.singleProduct)

  useEffect(() => {
    dispatch(loadProductById(id));
    return ()=>{
      dispatch(singleProductClear())
    }
  }, [id, dispatch])

  return (
    <div className={styles.container}>
      {
        product.status==="loading" ? <Loader height="600px" dotSize="large" /> : 
        product.error ? <div className={styles.error}>There was an error loading products.</div>:
        <Fade>
          <div className={styles.itemContainer}>
            <div className={styles.imageContainer}>
              <div className={styles.itemImage} style={{backgroundImage: `url(${product.image ? product.image : window.location.origin +"/images/noImage.png"}`}}></div>
            </div>
            <div className={styles.itemInfo}>
              <div className={styles.itemRow}>
                <div className={styles.rowLeft}>
                  <div className={styles.name}>{product.name}</div>
                  <div className={styles.price}>{centsToPrice(product.price)}</div>
                </div>
                <div className={styles.rowRight}>
                  <PurchaseButtons product={product}></PurchaseButtons>
                </div>
              </div>
              <div className={styles.description}>{product.description}</div>
            </div>
          </div>
        </Fade>
      }
    </div>
  )
}

export default ProductDetail;