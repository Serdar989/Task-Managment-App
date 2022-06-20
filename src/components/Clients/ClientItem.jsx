import React, { useEffect, useState } from 'react';

import classes from './ClientItem.module.css';
import { Link } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { removeClientHandler } from '../../lib/api';
import { ReactComponent as TasksIcon } from '../../assets/svg/tasks-solid.svg';
import { ReactComponent as EditIcon } from '../../assets/svg/edit-solid.svg';
import { ReactComponent as RemoveIcon } from '../../assets/svg/circle-minus-solid.svg';

const ClientItem = (props) => {
  const [matchesMobile, setMatchesMobile] = useState(
    window.matchMedia('(max-width: 900px)').matches
  );

  useEffect(() => {
    window
      .matchMedia('(max-width: 900px)')
      .addEventListener('change', (e) => setMatchesMobile(e.matches));
  }, []);

  const { sendRequest, status, error } = useHttp(removeClientHandler);

  const { onRemovedClient } = props;

  useEffect(() => {
    if (status === 'completed' && !error) {
      onRemovedClient(props.id);
    }
  }, [status, error, onRemovedClient, props.id]);

  const removeClient = () => {
    sendRequest(props.id);
  };

  let content;
  if (!matchesMobile) {
    content = (
      <tr>
        <th scope='row'>{props.company}</th>
        <td>
          <div className={classes.logoImgContainer}>
            <img
              className={classes.logoImg}
              src={props.companyLogo}
              alt='logo'
            />
          </div>
        </td>
        <td>{props.location}</td>
        <td>{props.clientName}</td>
        <td>{props.email}</td>
        <td>{props.contactNumber}</td>

        <td>
          <Link to={`${props.id}`}>
            <TasksIcon fill='#fff' width='20px' height='20px' />
          </Link>
        </td>
        <td>
          <Link to={`${props.id}/edit-client`}>
            <EditIcon fill='#fff' width='20px' height='20px' />
          </Link>
        </td>
        <td>
          <RemoveIcon
            onClick={removeClient}
            fill='#fff'
            width='20px'
            height='20px'
          />
        </td>
      </tr>
    );
  } else if (matchesMobile) {
    content = (
      <div key={props.id} className={classes.taskItem}>
        <div className={classes.taskDesc}>
          <span>Company name: </span> {props.company}
        </div>
        <div className={classes.taskDesc}>
          <span>Company logo: </span>{' '}
          <div className={classes.logoImgContainer}>
            <img
              className={classes.logoImg}
              src={props.companyLogo}
              alt='logo'
            />
          </div>
        </div>
        <div className={classes.taskDesc}>
          <span>Loaction: </span> {props.location}
        </div>
        <div className={classes.taskDesc}>
          <span>Client name: </span>
          {props.clientName}
        </div>
        <div className={classes.taskDesc}>
          <span>Email: </span>
          {props.email}
        </div>
        <div className={classes.taskDesc}>
          <span>Contact Number: </span>
          {props.contactNumber}
        </div>
        <div className={classes.taskDesc}>
          <span>Client Tasks: </span>{' '}
          <Link to={`${props.id}`}>
            <TasksIcon fill='#fff' width='20px' height='20px' />
          </Link>
        </div>
        <div className={classes.taskDesc}>
          <span>Edit Client Info: </span>{' '}
          <Link to={`${props.id}/edit-client`}>
            <EditIcon fill='#fff' width='20px' height='20px' />
          </Link>
        </div>
        <div className={classes.taskDesc}>
          <span>Remove Client: </span>{' '}
          <RemoveIcon
            onClick={removeClient}
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

export default ClientItem;
