import { Link, useParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import LoadingSpinner from '../UI/LoadingSpinner';
import NotFound from '../../pages/NotFound';
import useHttp from '../../hooks/use-http';
import { getAllTasks } from '../../lib/api';
import classes from './Tasks.module.css';

const Tasks = () => {
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
  }, [matchesMobile]);

  const params = useParams();

  const { clientsId } = params;

  const { sendRequest, status, data: loadedTasks, error } = useHttp(
    getAllTasks,
    true
  );

  useEffect(() => {
    const controller = new AbortController();

    sendRequest(clientsId);
    return () => controller.abort();
  }, [clientsId, sendRequest]);

  const removedTaskHandler = useCallback(() => {
    sendRequest(clientsId);
  }, [sendRequest, clientsId]);

  let content;
  const pageText = 'Tasks not found';
  if (status === 'pending') {
    content = (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    content = <p>{error}</p>;
  }

  if (status === 'completed' && (!loadedTasks || loadedTasks.length === 0)) {
    content = <NotFound pageText={pageText} />;
  }

  if (
    status === 'completed' &&
    loadedTasks &&
    loadedTasks.length > 0 &&
    !matchesMobile
  ) {
    content = (
      <table className='table table-bordered'>
        <thead className='thead-dark'>
          <tr className='table-primary'>
            {!matchesMobile && <th scope='col'>Task Id</th>}
            <th scope='col'>Date</th>
            <th scope='col'>Job Description</th>
            <th scope='col'>Number of Hours</th>
            {!matches && <th scope='col'>Number of Pages</th>}
            {!matches && <th scope='col'>Price Per Hour</th>}
            <th scope='col'>For Payment</th>
            {!matches && <th scope='col'>Note</th>}
            <th scope='col'>Payament made</th>
            {!matchesMobile && <th scope='col'>Edit Task</th>}
            {!matchesMobile && <th scope='col'>Remove Task</th>}
          </tr>
        </thead>
        <tbody>
          {loadedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onRemovedTask={removedTaskHandler}
            />
          ))}
        </tbody>
      </table>
    );
  } else if (
    status === 'completed' &&
    loadedTasks &&
    loadedTasks.length > 0 &&
    matchesMobile
  ) {
    content = (
      <div>
        {loadedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onRemovedTask={removedTaskHandler}
          />
        ))}
      </div>
    );
  }
  return (
    <div className={classes.tasksTable}>
      {content}

      <div className='btn btn-light'>
        <Link to={`/clients/${clientsId}/new-task`}>Add Task</Link>
      </div>
    </div>
  );
};

export default Tasks;
