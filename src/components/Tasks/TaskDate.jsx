import React from 'react';

const TaskDate = (props) => {
  const month = props.date.toLocaleString('en-US', { month: '2-digit' });
  const day = props.date.toLocaleString('en-US', { day: '2-digit' });
  const year = props.date.getFullYear();
  return (
    <>
      <td>{day + '/' + month + '/' + year}</td>
    </>
  );
};

export default TaskDate;
