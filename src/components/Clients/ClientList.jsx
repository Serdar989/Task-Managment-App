import React, { useEffect, useState } from 'react';

import ClientItem from './ClientItem';
import './ClientList.module.css';
import classes from './ClientList.module.css';

const ClientList = (props) => {
  const [matchesMobile, setMatchesMobile] = useState(
    window.matchMedia('(max-width: 900px)').matches
  );

  useEffect(() => {
    window
      .matchMedia('(max-width: 900px)')
      .addEventListener('change', (e) => setMatchesMobile(e.matches));
  }, [matchesMobile]);

  let content;

  if (!matchesMobile) {
    content = (
      <table className='table table-bordered'>
        <thead className='thead-dark'>
          <tr className='table-primary'>
            <th scope='col'>Company name</th>
            <th scope='col'>Company logo</th>
            <th scope='col'>Location</th>
            <th scope='col'>Client name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Contact Number</th>
            <th scope='col'>Task List</th>
            <th scope='col'>Edit Client Info</th>
            <th scope='col'>Remove Client</th>
          </tr>
        </thead>
        <tbody>
          {props.clients.map((client) => (
            <ClientItem
              key={client.id}
              id={client.id}
              companyLogo={client.companyLogo}
              company={client.company}
              location={client.location}
              clientName={client.clientName}
              email={client.email}
              contactNumber={client.contactNumber}
              onRemovedClient={props.removeClient}
            />
          ))}
        </tbody>
      </table>
    );
  } else if (matchesMobile) {
    content = (
      <div className={classes.clientBoxContainer}>
        {props.clients.map((client) => (
          <ClientItem
            key={client.id}
            id={client.id}
            companyLogo={client.companyLogo}
            company={client.company}
            location={client.location}
            clientName={client.clientName}
            email={client.email}
            contactNumber={client.contactNumber}
            onRemovedClient={props.removeClient}
          />
        ))}
      </div>
    );
  }

  return <>{content}</>;
};

export default ClientList;
