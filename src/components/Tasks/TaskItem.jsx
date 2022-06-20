import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { removeTaskHandler } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import useHttp from '../../hooks/use-http';
import { ReactComponent as RemoveIcon } from '../../assets/svg/circle-minus-solid.svg';
import { ReactComponent as EditIcon } from '../../assets/svg/edit-solid.svg';
import classes from './TaskItem.module.css';

const TaskItem = (props) => {
  const [matches, setMatches] = useState(
    window.matchMedia('(max-width: 1366px)').matches
  );

  useEffect(() => {
    window
      .matchMedia('(max-width: 1366px)')
      .addEventListener('change', (e) => setMatches(e.matches));
  }, []);

  const [matchesMobile, setMatchesMobile] = useState(
    window.matchMedia('(max-width: 900px)').matches
  );

  useEffect(() => {
    window
      .matchMedia('(max-width: 900px)')
      .addEventListener('change', (e) => setMatchesMobile(e.matches));
  }, []);

  const forPayment = props.task.numberOfHours * props.task.pricePerHour;

  const { sendRequest, status, error } = useHttp(removeTaskHandler);

  const params = useParams();

  const { clientsId } = params;
  const taskId = props.task.id;

  const { onRemovedTask } = props;

  useEffect(() => {
    const controller = new AbortController();

    if (status === 'completed' && !error) {
      onRemovedTask();
    }
    return () => controller.abort();
  }, [status, error, onRemovedTask]);

  const removeTask = () => {
    sendRequest({ clientsId: clientsId, taskId: taskId });
  };

  if (status === 'pending') {
    return (
      <tr className='centered'>
        <td>
          <LoadingSpinner />
        </td>
      </tr>
    );
  }
  if (error) {
    return <p>{error}</p>;
  }
  let content;

  if (!matchesMobile) {
    content = (
      <tr key={taskId} id={taskId}>
        {!matchesMobile && <th scope='row'>{taskId}</th>}
        <td> {props.task.date}</td>
        <td>{props.task.jobDescription}</td>
        <td>{props.task.numberOfHours}</td>
        {!matches && <td>{props.task.numberOfPages}</td>}
        {!matches && <td>{props.task.pricePerHour}</td>}
        <td>{forPayment}</td>
        {!matches && <td>{props.task.note}</td>}
        <td>{props.task.paymanetMade ? 'Yes' : 'No'}</td>
        <td>
          <Link to={`/clients/${clientsId}/tasks/${taskId}/edit-task`}>
            <EditIcon fill='#fff' width='20px' height='20px' />
          </Link>
        </td>

        <td>
          <RemoveIcon
            onClick={removeTask}
            fill='#fff'
            width='20px'
            height='20px'
          />
        </td>
      </tr>
    );
  } else if (matchesMobile) {
    content = (
      <div key={taskId} className={classes.taskItem}>
        <div className={classes.taskDesc}>
          <span>Date: </span> {props.task.date}
        </div>
        <div className={classes.taskDesc}>
          <span>Job Desc.: </span>
          {props.task.jobDescription}
        </div>
        <div className={classes.taskDesc}>
          <span>Num. of Hours: </span>
          {props.task.numberOfHours}
        </div>
        <div className={classes.taskDesc}>
          <span>Num. Of Hours: </span>
          {props.task.numberOfPages}
        </div>
        <div className={classes.taskDesc}>
          <span>Price per Hour: </span>
          {props.task.pricePerHour}
        </div>
        <div className={classes.taskDesc}>
          <span>For Payment: </span>
          {forPayment}
        </div>
        <div className={classes.taskDesc}>
          <span>Note: </span>
          {props.task.note}
        </div>
        <div className={classes.taskDesc}>
          <span>Payment Made: </span>
          {props.task.paymanetMade ? 'Yes' : 'No'}
        </div>
        <div className={classes.taskDesc}>
          <span>Edit Task: </span>
          <Link to={`/clients/${clientsId}/tasks/${taskId}/edit-task`}>
            <EditIcon fill='#fff' width='20px' height='20px' />
          </Link>
        </div>

        <div className={classes.taskDesc}>
          {' '}
          <span>Remove Task: </span>
          <RemoveIcon
            onClick={removeTask}
            fill='#fff'
            width='20px'
            height='20px'
          />
        </div>
      </div>
    );
  }

  return <>{content}</>;
};

export default TaskItem;
