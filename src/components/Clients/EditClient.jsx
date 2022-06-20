import React from 'react';
import EditClientForm from './EditClientForm';
import LoadingSpinner from '../UI/LoadingSpinner';
import NotFound from '../../pages/NotFound';
import useHttp from '../../hooks/use-http';
import { getSingleClient } from '../../lib/api';
import { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditClient = () => {
  const navigate = useNavigate();

  const params = useParams();

  const { clientsId } = params;

  const { sendRequest, data: loadedClient, status, error } = useHttp(
    getSingleClient,
    true
  );

  useEffect(() => {
    const controller = new AbortController();
    sendRequest(clientsId);

    return () => controller.abort();
  }, [clientsId, sendRequest]);

  const editedClient = useCallback(() => {
    if (status === 'completed') {
      navigate(`/clients/`);
    }
  }, [navigate, status]);

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

  const pageText = 'Client not found';

  if (
    status === 'completed' &&
    Object.entries(loadedClient).length === 0 &&
    loadedClient.constructor === Object
  ) {
    content = <NotFound pageText={pageText} />;
  }

  if (
    status === 'completed' &&
    Object.entries(loadedClient).length !== 0 &&
    loadedClient.constructor === Object
  ) {
    content = (
      <EditClientForm loadedClient={loadedClient} onEditClient={editedClient} />
    );
  }

  return (
    <div className='auth'>
      <h1>Edit Client</h1>
      {content}
    </div>
  );
};

export default EditClient;
