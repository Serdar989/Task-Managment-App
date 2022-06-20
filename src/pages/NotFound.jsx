import '../index.css';
import React from 'react';

const NotFound = (props) => {
  return (
    <div className='auth'>
      <h1>{props.pageText}</h1>
      <h1>{!props.pageText && 'Page not found!'}</h1>
    </div>
  );
};

export default NotFound;
