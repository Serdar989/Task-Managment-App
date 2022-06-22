import React from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { addTask } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import NewTaskForm from './NewTaskForm';
import '../../index.css';

const NewTask = (props) => {
  const navigate = useNavigate();

  const params = useParams();

  const { clientsId } = params;

  const { sendRequest, status, error } = useHttp(addTask);

  useEffect(() => {
    if (status === 'completed') {
      navigate(`/clients/${clientsId}`);
    }
  }, [status, navigate, clientsId]);

  const saveTaskHandler = (clientData) => {
    sendRequest({ taskData: clientData, clientsId: clientsId });
  };

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

  content = <NewTaskForm onAddTask={saveTaskHandler} />;

  return (
    <>
      <div className='auth'>
        <h1>New Task</h1>
        {content}
      </div>
    </>
  );
};

export default NewTask;
