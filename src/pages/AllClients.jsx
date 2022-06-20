import React, { useEffect, useCallback } from 'react';
import ClientList from '../components/Clients/ClientList';
import NotFound from './NotFound';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getAllClients } from '../lib/api';
import classes from './AllClients.module.css';

const AllClients = () => {
  const { sendRequest, status, data: loadedClients, error } = useHttp(
    getAllClients,
    true
  );

  useEffect(() => {
    const controller = new AbortController();

    sendRequest();
    return () => controller.abort();
  }, [sendRequest]);

  const removeClient = useCallback(
    (clientsId) => {
      sendRequest(clientsId);
    },
    [sendRequest]
  );

  const pageText = 'Clients not found';

  if (
    status === 'completed' &&
    (!loadedClients || loadedClients.length === 0)
  ) {
    return (
      <>
        <NotFound pageText={pageText} />
        <div className='btn btn-light'>
          <Link to='new-client'>New Client</Link>
        </div>
      </>
    );
  }

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

  if (status === 'completed' && loadedClients && loadedClients.length > 0) {
    return (
      <div className={classes.tableContainer}>
        <h1>Client List</h1>
        <ClientList clients={loadedClients} removeClient={removeClient} />
        <div className='btn btn-light'>
          <Link to='new-client'>New Client</Link>
        </div>
      </div>
    );
  }
};

export default AllClients;
