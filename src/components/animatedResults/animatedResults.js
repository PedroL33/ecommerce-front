import React, { useState, useEffect } from 'react';
import getBoundingBoxes from '../../functions/getBoundingBoxes';
import usePrevious from '../../functions/usePrevious';

const AnimatedResults = function( {children} ) {

  const [boundingBox, setBoundingBox] = useState({});
  const [prevBoundingBox, setPrevBoundingBox] = useState({});
  const prevChildren = usePrevious(children);
  const [yOffset, setYOffset] = useState(window.pageYOffset);
  const prevYOffset = usePrevious(yOffset);

  useEffect(() => {
    const newBoundingBoxes = getBoundingBoxes(children);
    setBoundingBox(newBoundingBoxes);
    setYOffset(window.pageYOffset)
  }, [children])

  useEffect(() => {
    const prevBoundingBoxes = getBoundingBoxes(prevChildren);
    setPrevBoundingBox(prevBoundingBoxes);
  }, [prevChildren])

  useEffect(() => {
    const hasPrevBounding = Object.keys(prevBoundingBox).length;
    if(hasPrevBounding) {
      React.Children.forEach(children, child => {
        const domNode = child.ref.current;
        const firstBox = prevBoundingBox[child.key];
        const lastBox = boundingBox[child.key];
        const changeX = firstBox.left - lastBox.left;
        const changeY = firstBox.top - lastBox.top;

        if(changeX !== 0 || changeY !==0) {
          requestAnimationFrame(() => {
            domNode.style.transform = `translateX(${changeX}px) translateY(${changeY - (yOffset-prevYOffset)}px)`;
            domNode.style.transition = "transform 0s";
            requestAnimationFrame(() => {
              domNode.style.transform = "";
              domNode.style.transition = "transform 500ms";
            })
          })
        }
      })
    }
  }, [boundingBox, prevBoundingBox, children])
  
  return children;

}

export default AnimatedResults;