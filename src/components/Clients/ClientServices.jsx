import { useParams } from 'react-router-dom';

import React, { useEffect } from 'react';

import LoadingSpinner from '../UI/LoadingSpinner';
import NotFound from '../../pages/NotFound';
import useHttp from '../../hooks/use-http';
import { getSingleClient } from '../../lib/api';
import Tasks from '../Tasks/Tasks';
import classes from './ClientServices.module.css';

const ClientServices = () => {
  const params = useParams();

  const { clientsId } = params;
  const { sendRequest, status, data: loadedClient, error } = useHttp(
    getSingleClient,
    true
  );

  useEffect(() => {
    const controller = new AbortController();

    sendRequest(clientsId);
    return () => controller.abort();
  }, [clientsId, sendRequest]);

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
  const pageText = 'Client not found';

  if (status === 'completed' && (!loadedClient || loadedClient.length === 0)) {
    return <NotFound pageText={pageText} />;
  }

  if (
    status === 'completed' &&
    loadedClient &&
    Object.keys(loadedClient).length > 0
  ) {
    return (
      <div className={classes.tasksContainer}>
        <div className={classes.logoImgContainer}>
          <img
            className={classes.logoImg}
            src={loadedClient.companyLogo}
            alt='logo'
          />
        </div>
        <h1>Client: {loadedClient.company}</h1>

        <Tasks />
      </div>
    );
  }
};

export default ClientServices;
