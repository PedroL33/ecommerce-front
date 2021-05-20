import React, { useEffect, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { loadResults, clearResults, sortResults } from '../../actions';
import categories from '../../constants/categories.json';
import styles from '../../styles/resultsDisplay.module.css';
import AnimatedResults from './animatedResults';
import Loader from '../loader';
import Fade from 'react-reveal/Fade';
import PurchaseButtons from '../purchaseButtons';

function ResultsDisplay() {

  const dispatch = useDispatch();
  const results = useSelector(state => state.results);
  const {querry} = useParams();
  const type = useLocation().pathname.split("/")[1];

  useEffect(() => {
    dispatch(loadResults(type, querry))
    return () => {
      dispatch(clearResults())
    }
  }, [querry, dispatch, type])

  function handleChange(e) {
    switch(e.target.value) {
      case "a-z":
        dispatch(sortResults("name", true));
        break;
      case "z-a":
        dispatch(sortResults("name", false));
        break;
      case "high":
        dispatch(sortResults("price", false));
        break;
      case "low":
        dispatch(sortResults("price", true));
        break;
      default:
        break;
    }  
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {type==="category" && categories[querry] ? categories[querry].description : results.length===0 ? `We couldn't find anything related to '${querry}'.` : results[0] !=="loading" ? `We found ${results.length} items related to '${querry}'`: null}
      </div>
      {
        results[0] === "loading" ? <Loader background="white" height="400px" dotSize="large" /> : 
        results.error ? <div className={styles.error}>{results.error}</div>:
        <div className={styles.results}>
          {
            results.length > 2 && 
            <div className={styles.orderSelectContainer}>
              <label className={styles.orderLabel}>Sort by: </label>
              <select defaultValue="Select" key={results} onChange={(e)=>handleChange(e)} className={styles.orderSelect}>
                <option disabled value="Select">Select</option>
                <option disabled value>&nbsp;&nbsp;Alphabetical</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
                <option disabled value>&nbsp;&nbsp;Price</option>
                <option value="high">$ high to low</option>
                <option value="low">$ low to high</option>
              </select>
            </div>
          }
          {  
            results.length ? <AnimatedResults>
              { results.map((item) => 
                <Link key={item._id} className={styles.result} ref={createRef()} to={`/item/${item._id}`}>
                  <Fade>
                    <div className={styles.resultImage} style={{backgroundImage: `url(${item.image ? item.image: window.location.origin + "/images/noImage.png"})`}}></div>
                    <div className={styles.resultDetails}>
                      <div className={styles.resultTitle}>{item.name}</div>
                      <div>{item.price / 100}$</div>
                    </div>
                    <PurchaseButtons product={item}></PurchaseButtons>
                  </Fade>
                </Link>
              )}
            </AnimatedResults> : <div>Server could not be reached.</div>
          }
        </div>
      }
    </div>
  )
}

export default ResultsDisplay;