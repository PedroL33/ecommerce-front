import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadFilteredProducts } from '../actions';

function SearchMenu() {

  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");

  return (
    <div>
      <input type="text" onChange={(e) => dispatch(loadFilteredProducts(e.target.value))} />
      <Link to={`/search/${filter}`}>Search</Link>
    </div>
  )
}

export default SearchMenu;