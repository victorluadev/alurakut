import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../assets/loading-green';

export default function Loading() {
  const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
    };
  
  return (
    
      <Lottie 
        style={{display: "inline-block"}}
	      options={defaultOptions}
        height={14}
        width={22}
      />
    
  );
}