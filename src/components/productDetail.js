import React, { useEffect } from 'react';
import { loadProductById, singleProductClear } from '../actions';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './loader';

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

  return (
    <div>
      {
        product ? product.status==="loading" ? <Loader height="600px" dotSize="large" /> : 
        product.error ? <div>Error</div>:
        <div>{product.name}</div>:
        null
      }
    </div>
  )
}

export default ProductDetail;