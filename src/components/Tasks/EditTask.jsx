import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/use-http';

import { getSingleTask } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import EditTaskForm from './EditTaskForm';
import NotFound from '../../pages/NotFound';

const EditTask = (props) => {
  useEffect(() => {});

  const navigate = useNavigate();

  const params = useParams();

  const { taskId } = params;

  const { clientsId } = params;
  const { sendRequest, data: loadedTask, status, error } = useHttp(
    getSingleTask
  );

  useEffect(() => {
    const controller = new AbortController();
    sendRequest({ clientsId: clientsId, taskId: taskId });

    return () => controller.abort();
  }, [clientsId, sendRequest, taskId]);

  let content;
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
  const pageText = 'Task not found';

  if (
    status === 'completed' &&
    (!loadedTask || Object.keys(loadedTask).length === 0)
  ) {
    content = <NotFound pageText={pageText} />;
  }

  const editedTask = () => {
    if (status === 'completed') {
      navigate(`/clients/${clientsId}`);
    }
  };

  if (
    status === 'completed' &&
    loadedTask &&
    Object.keys(loadedTask).length > 0
  ) {
    content = <EditTaskForm loadedTask={loadedTask} onEditTask={editedTask} />;
  }

  return <>{content}</>;
};

export default EditTask;
