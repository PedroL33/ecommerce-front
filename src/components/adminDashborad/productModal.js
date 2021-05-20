import React, { useRef, useEffect, useState } from 'react';
import styles from '../../styles/adminModals.module.css';
import { useDispatch } from 'react-redux';
import { updateProducts, uploadPhoto } from '../../actions/adminActions';

function ProductModal(props) {

  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const [name, setName] = useState(props.item.name);
  const [category, setCategory] = useState(props.item.category);
  const [price, setPrice] = useState(props.item.price);
  const [description, setDescription] = useState(props.item.description);
  const [image, setImage] = useState(null)
  const [imgUrl, setImgUrl] = useState("");
  const [remove, setRemove] = useState([]);
  const [add, setAdd] = useState("");

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

  function isActive() {
    return name !== props.item.name || category !== props.item.category || parseInt(price) !== props.item.price || description !== props.item.description || image;
  }

  async function handleClick() {
    const newProd = {
      name: name,
      category: category,
      price: price,
      description: description
    }
    props.setShowModal(-1);
    if(image) {
      let fd = new FormData();
      fd.append("image", image[0])
      await dispatch(uploadPhoto(props.item._id, fd))
    }
    dispatch(updateProducts(props.item._id, newProd))
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

  function addCategory(item) {
    setCategory([...category, item])
    setAdd("");
  }

  function removeCategory(items) {
    setCategory(category.filter(item => !items.includes(item)))
    setRemove([])
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.modalHeader}>
          {props.item._id}
        </div>
        <div className={styles.modalItem}>
          <div className={styles.modalImage} style={{backgroundImage: `url(${imgUrl ? imgUrl : props.item.image ? props.item.image : window.location.origin+"/images/noImage.png" })`}}>
            <div className={styles.imgUpload}>
              <label>
                <input type="file" onChange={handleChange}></input>
                <div className={styles.uploadButton}><i class="fas fa-plus"></i></div>
              </label>
              <button className={styles.uploadButton} disabled={imgUrl ? false: true} onClick={(e) => clearImg(e)}><i class="fas fa-times"></i></button>
            </div>  
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
        <div className={styles.modalItem}>
          <label className={styles.modalLabel}>Category: </label>
          <div className={styles.categoryContainer}>
            {category.map((item, index) => (
              <div key={index} className={remove.includes(item) ? `${styles.category} ${styles.active}`: styles.category} onClick={() => remove.includes(item) ? setRemove(remove.filter(remove => remove !== item)) : setRemove([...remove, item])}>{item}</div>
            ))}
            <input onChange={(e) => setAdd(e.target.value)} placeholder="..." value={add} className={styles.categoryInp} type="text"></input>
            <button className={styles.catButton} disabled={add.length ? false : true} onClick={() => addCategory(add)}>
              <i className="fas fa-plus"></i>
            </button>
            <button className={styles.catButton} disabled={remove.length ? false : true} onClick={() => removeCategory(remove)}>
              <i className="fas fa-minus"></i>
            </button>
          </div>
        </div>
        <div className={styles.modalItem}>
          <label className={styles.modalLabel}>Description: </label>
          <textarea className={styles.modalTextarea} value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className={styles.submitContainer}>
          <button className={styles.modalSubmit} disabled={isActive() ? false: true} onClick={handleClick}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default ProductModal;