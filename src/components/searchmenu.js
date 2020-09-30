import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { filteredProductsClear, loadFilteredProducts, hideMenu } from '../actions';
import styles from '../styles/searchMenu.module.css';
import useDebounce from '../functions/debounce';

function SearchMenu(props) {

  const dispatch = useDispatch();
  const results = useSelector(state => state.filteredProducts);
  const menu = useSelector(state => state.showMenu);
  const searchInputRef = useRef(null);
  const shopMenuRef = useRef(null)
  const [searchQuerry, setSearchQuerry] = useState("");
  const debouncedSearchQuerry = useDebounce(searchQuerry, 1000);

  useEffect(() => {
    function handleOutsideClick(e) {
      if(shopMenuRef.current && !shopMenuRef.current.contains(e.target) && menu && !props.button.current.contains(e.target)) {
        dispatch(hideMenu());
        dispatch(filteredProductsClear())
      }
    }
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    }
  })

  useEffect(() => {
    if(!menu) {
      searchInputRef.current.value = "";
    }
  }, [menu])

  useEffect(() => {
    if(debouncedSearchQuerry.length <= 1) {
      dispatch(filteredProductsClear())
    }else if(debouncedSearchQuerry.length > 1) {
      dispatch(loadFilteredProducts(debouncedSearchQuerry))
    }
  }, [debouncedSearchQuerry])

  function handleClick(e, querry) {
    if(querry.length===0) {
      e.preventDefault()
    }else {
      dispatch(hideMenu());
      dispatch(filteredProductsClear());
    }
  }

  return (
    <div className={styles.container} ref={shopMenuRef}>
      <ul className={styles.categoryContainer}>
        <Link to="/things">Things</Link>
        <Link to="/items">Items</Link>
        <Link to="/gadgets">Gadgets</Link>
      </ul>
      <div className={styles.searchbarContainer}>
        <input className={styles.searchbar} placeholder="search..." type="text" ref={searchInputRef} onChange={(e)=>setSearchQuerry(e.target.value)} /> 
        <Link to={ `/search/${searchQuerry}`} onClick={(e) => handleClick(e, searchQuerry)}>
          <i className={styles.searchIcon +" fas fa-search"}></i>
        </Link>
        <div className={styles.resultsContainer}>
          {results[0]==="loading" ? 
            <div className={styles.result}>...loading</div>: 
          results.length===0 && debouncedSearchQuerry.length > 1 && searchQuerry.length > 0 ? 
            <div className={styles.result}>No matching products.</div>:
          results.length > 0 ? 
            results.map(item => <div className={styles.result}>{item.name}</div>): null
          }
          {results.length > 0 && results[0] !== "loading" ? <div className={styles.seeAllContainer}>
            <Link className={styles.seeAll} to={`/search/${debouncedSearchQuerry}`}>See all results. </Link>  
          </div>: null}
        </div>
      </div>
    </div>
  )
}

export default SearchMenu;