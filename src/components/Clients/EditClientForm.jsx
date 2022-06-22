import React, { useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import { editClientHandler } from '../../lib/api';
import { useParams } from 'react-router-dom';
import '../../index.css';
import FormInput from '../../formInput/FormInput';
import Form from '../../store/input-context';

const EditClientForm = (props) => {
  const params = useParams();

  const { onEditClient } = props;

  const { clientsId } = params;

  const { sendRequest, status, error } = useHttp(editClientHandler);

  const editClient = (clientData) => {
    sendRequest({ clientsId: clientsId, clientData: clientData });
  };

  useEffect(() => {
    const controller = new AbortController();
    if (status === 'completed' && !error) {
      onEditClient();
    }
    return () => controller.abort();
  }, [status, error, onEditClient]);

  const initialValues = {
    enteredCompany: props.loadedClient.company,
    enteredLocation: props.loadedClient.location,
    enteredClientName: props.loadedClient.clientName,
    enteredEmail: props.loadedClient.email,
    enteredContactNumber: props.loadedClient.contactNumber,
  };
  let companyLogo = props.loadedClient.companyLogo;

  const typeOfForm = 'editClientForm';

  if (error) {
    return <p>{error}</p>;
  }

  const submitHandler = (form, event, companyLogo) => {
    event.preventDefault();
    const clientData = {
      company: form.enteredCompany,
      location: form.enteredLocation,
      clientName: form.enteredClientName,
      email: form.enteredEmail,
      contactNumber: form.enteredContactNumber,
      companyLogo: companyLogo,
    };
    editClient(clientData);
  };

  return (
    <>
      <Form
        submit={submitHandler}
        initialValues={initialValues}
        companyLogo={companyLogo}
        typeOfForm={typeOfForm}
      >
        <FormInput label='Company' type='text' name='enteredCompany' />
        <FormInput label='Location' type='text' name='enteredLocation' />
        <FormInput label='Client Name' type='text' name='enteredClientName' />
        <FormInput label='Email' type='email' name='enteredEmail' />
        <FormInput
          label='Contact Number'
          type='tel'
          name='enteredContactNumber'
          placeholder='064-4512-678'
        />
        <FormInput label='Upload Company Logo' type='file' name='logoUpload' />
      </Form>
    </>
  );
};

export default EditClientForm;
