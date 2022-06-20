import NewClientForm from '../components/Clients/NewClientForm';

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import { addClient } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const NewClient = () => {
  const navigate = useNavigate();

  const { sendRequest, status, error } = useHttp(addClient);
  useEffect(() => {
    if (status === 'completed') {
      navigate('/clients');
    }
  }, [status, navigate]);

  const saveClientDataHandler = (clientData) => {
    sendRequest(clientData);
  };

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='auth'>
      <h1>New Client</h1>
      <NewClientForm onSave={saveClientDataHandler} />
    </div>
  );
};

export default NewClient;
