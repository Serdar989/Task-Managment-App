import '../index.css';
import React from 'react';

const NotFound = (props) => {
  const notFoundText =
    props.pageText === '' || props.pageText === undefined
      ? 'Page not found!'
      : props.pageText;
  const buttonElemet =
    props.buttonElemet === '' || undefined ? '' : props.buttonElemet;
  return (
    <div className={`auth ${props.taskPage && 'task'} `}>
      <h1>{notFoundText}</h1>
      {buttonElemet}
    </div>
  );
};

export default NotFound;
