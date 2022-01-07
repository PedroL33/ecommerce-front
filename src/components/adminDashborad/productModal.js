import React, { useRef, useEffect, useState } from 'react';
import styles from '../../styles/adminModals.module.css';
import { useDispatch } from 'react-redux';
import { updateProducts, uploadPhoto, loadAllProducts } from '../../actions/apiCalls/products';

function ProductModal(props) {

  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const [name, setName] = useState(props.item.name);
  const [category, setCategory] = useState(props.item.category);
  const [price, setPrice] = useState(props.item.price);
  const [stock, setStock] = useState(props.item.stock);
  const [description, setDescription] = useState(props.item.description);
  const [image, setImage] = useState(null)
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {

    function handleOutsideClick(e) {
      if(modalRef.current && !modalRef.current.contains(e.target)) {
        e.preventDefault();
        props.setShowModal(-1);
      }
    }

    window.addEventListener('click', handleOutsideClick)

    return () => {
      window.removeEventListener('click', handleOutsideClick)
    }
  }, [props])

  function updateProductIsActive() {
    return name !== props.item.name ||
    category !== props.item.category ||
    parseInt(price) !== props.item.price ||
    description !== props.item.description ||
    stock !== props.item.stock
  }

  function updatePhotoIsActive() {
    return image
  }

  async function handleClick() {
    if(updateProductIsActive()) {
      const newProd = {
        name,
        category,
        price,
        description,
        stock
      }
      dispatch(updateProducts(props.item.id, newProd))
    }
    if(updatePhotoIsActive()) {
      let fd = new FormData();
      fd.append("image", image[0])
      await dispatch(uploadPhoto(props.item.id, fd))
    }
    props.setShowModal(-1);
    dispatch(loadAllProducts());
  }

  function handleChange(e) {
    if (e.target.files && e.target.files[0]) {
      setImgUrl(window.URL.createObjectURL(e.target.files[0]))
      setImage(e.target.files)
    }
  }

  function clearImg(e) {
    e.preventDefault();
    setImgUrl("");
    setImage(null)
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.modalHeader}>
          Item ID: {props.item.id}
        </div>
        <div className={styles.modalImageContainer}>
          <img className={styles.modalImage} src={`${imgUrl ? imgUrl : props.item.image ? props.item.image : window.location.origin+"/images/noImage.png"}`} />
          <div className={styles.imgUpload}>
              <label>
                <input type="file" onChange={handleChange}></input>
                <div className={styles.uploadButton}><i class="fas fa-plus"></i></div>
              </label>
              <button className={styles.uploadButton} disabled={imgUrl ? false: true} onClick={(e) => clearImg(e)}><i class="fas fa-times"></i></button>
            </div>  
        </div>
        <div className={styles.row}>
          <div className={styles.modalItem}>
            <label className={styles.modalLabel}>Name: </label>
            <input className={styles.modalInput} type="text" value={name} onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className={styles.modalItem}>
            <label className={styles.modalLabel}>Price: </label>
            <input className={styles.modalInput} type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.modalItem}>
            <label className={styles.modalLabel}>Stock: </label>
            <input className={styles.modalInput} type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} />
          </div>
          <div className={styles.modalItem}>
            <label className={styles.modalLabel}>Category: </label>
            <input className={styles.modalInput} type="text" value={category} onChange={(e) => setCategory(e.target.value)}/>
          </div>
        </div>
        <div className={styles.modalItem}>
          <label className={styles.modalLabel}>Description: </label>
          <textarea className={styles.modalTextarea} value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className={styles.submitContainer}>
          <button className={styles.modalSubmit} disabled={updateProductIsActive() || updatePhotoIsActive() ? false: true} onClick={handleClick}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default ProductModal;