import React from 'react';

export default function getBoundingBoxes(children) {
  const boundingBoxes = {};

  React.Children.forEach(children, child => {
    if(child.ref && child.ref.current) {
      const domNode = child.ref.current;
      const nodeBoundingBox = domNode.getBoundingClientRect();

      boundingBoxes[child.key] = nodeBoundingBox;
    }
  })

  return boundingBoxes;
}