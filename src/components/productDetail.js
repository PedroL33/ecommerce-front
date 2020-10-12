import React, { useEffect } from 'react';
import { loadProductById, singleProductClear } from '../actions';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './loader';
import styles from '../styles/productDetail.module.css';

function ProductDetail() {

  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector(state => state.singleProduct)

  useEffect(() => {
    dispatch(loadProductById(id));
    return ()=>{
      dispatch(singleProductClear())
    }
  }, [id])

  function toPrice(cents) {
    if(cents%100 === 0) {
      return `$${cents/100}.00`
    }else {
      return `$${Math.round(cents/100)}.${cents%100}`
    }
  }

  return (
    <div className={styles.container}>
      {
        product.status==="loading" ? <Loader height="600px" dotSize="large" /> : 
        product.error ? <div className={styles.error}>There was an error loading products.</div>:
        <div className={styles.itemContainer}>
          <div className={styles.imageContainer}>
            <div className={styles.itemImage} style={{backgroundImage: `url(${product.image ? product.image : window.location.origin +"/images/noImage.png"}`}}></div>
          </div>
          <div className={styles.itemInfo}>
            <div className={styles.name}>{product.name}</div>
            <div className={styles.price}>{toPrice(product.price)}</div>
            <div className={styles.itemButtons}>
              <button className={styles.button}>Add to cart</button>
              <Link to={`/purchase/${id}`} className={styles.button}>Buy Now</Link>
            </div>
            <div className={styles.description}>{product.description}</div>
          </div>
        </div>
      }
    </div>
  )
}

export default ProductDetail;