import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchProductsClear } from '../actions';
import { loadSearchProducts } from '../actions/apiCalls/products';
import styles from '../styles/searchMenu.module.css';
import useDebounce from '../functions/debounce';
import Loader from './loader';

function SearchMenu(props) {

  const history = useHistory();
  const dispatch = useDispatch();
  const results = useSelector(state => state.searchProducts);
  const menu = useSelector(state => state.showMenu);
  const searchInputRef = useRef(null);
  const shopMenuRef = useRef(null)
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);

  useEffect(() => {

    const search = searchInputRef.current;

    function handleOutsideClick(e) {
      if(shopMenuRef.current && !shopMenuRef.current.contains(e.target) && props.showMenu && !props.button.current.contains(e.target)) {
        props.setShowMenu(false);
        dispatch(searchProductsClear())
      }
    }

    function handleEnterPress(e) {
      if(e.keyCode===13 && searchQuery.length !== 0) {
        e.preventDefault();
        props.setShowMenu(false);
        dispatch(searchProductsClear())
        history.push(`/search/${searchQuery}`)
      }
    }
    search.addEventListener('keyup', handleEnterPress)
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
      search.removeEventListener('keyup', handleEnterPress)
    }
  }, [props, dispatch, history, menu, searchQuery])

  useEffect(() => {
    if(!menu) {
      searchInputRef.current.value = "";
    }
  }, [menu])

  useEffect(() => {
    if(debouncedSearchQuery.length <= 1) {
      dispatch(searchProductsClear())
    }else if(debouncedSearchQuery.length > 1) {
      dispatch(loadSearchProducts(debouncedSearchQuery))
    }
  }, [debouncedSearchQuery, dispatch])

  function handleClick(e, query) {
    if(query.length===0) {
      e.preventDefault()
    }else {
      dispatch(searchProductsClear());
      props.setShowMenu(false);
    }
  }

  return (
    <div className={styles.container} ref={shopMenuRef}>
      <ul className={styles.categoryContainer}>
        <Link onClick={(e)=> handleClick(e, "none")} to="/category/things">Things</Link>
        <Link onClick={(e)=> handleClick(e, "none")} to="/category/items">Items</Link>
        <Link onClick={(e)=> handleClick(e, "none")} to="/category/gadgets">Gadgets</Link>
      </ul>
      <div className={styles.searchbarContainer}>
        <input className={styles.searchbar} placeholder="search..." type="text" ref={searchInputRef} onChange={(e)=>setSearchQuery(e.target.value)} /> 
        <Link to={ `/search/${searchQuery}`} onClick={(e) => handleClick(e, searchQuery)}>
          <i className={styles.searchIcon +" fas fa-search"}></i>
        </Link>
        <div className={styles.resultsContainer}>
          {results[0]==="loading" ? 
            <Loader dotSize="small" background="#fceed1" dotColor="#cd5554" height="120px" />: 
          results.length===0 && debouncedSearchQuery.length > 1 && searchQuery.length > 0 ? 
            <div className={styles.noResult}>No matching products.</div>:
          results.length > 0 ? 
            results.slice(0, 5).map((item, index) => 
            <Link key={index} onClick={(e)=> handleClick(e, "none")} className={styles.result} to={`/search/${item.name}`}>
              <div className={styles.resultName}>{item.name}</div>
            </Link>)
          : null
          }
          {results.length > 0 && results[0] !== "loading" ? <div className={styles.seeAllContainer}>
            <Link className={styles.seeAll} onClick={(e)=> handleClick(e, "none")} to={`/search/${debouncedSearchQuery}`}>See all results. </Link>  
          </div>: null}
        </div>
      </div>
    </div>
  )
}

export default SearchMenu;