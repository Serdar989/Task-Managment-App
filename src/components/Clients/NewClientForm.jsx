import React from 'react';
import FormInput from '../../formInput/FormInput';
import Form from '../../store/input-context';

const NewClientForm = (props) => {
  const initialValues = {
    enteredCompany: '',
    enteredLocation: '',
    enteredClientName: '',
    enteredEmail: '',
    enteredContactNumber: '',
  };

  const submitHandler = (form, companyLogo) => {
    const clientData = {
      company: form.enteredCompany,
      location: form.enteredLocation,
      clientName: form.enteredClientName,
      email: form.enteredEmail,
      contactNumber: form.enteredContactNumber,
      companyLogo: companyLogo,
    };
    props.onSave(clientData);
  };

  return (
    <>
      <Form submit={submitHandler} initialValues={initialValues}>
        <FormInput label='Company' type='text' name='enteredCompany' />
        <FormInput label='Location' type='text' name='enteredLocation' />
        <FormInput label='Client Name' type='text' name='enteredClientName' />
        <FormInput label='Email' type='email' name='enteredEmail' />
        <FormInput
          label='Contact Number'
          type='text'
          name='enteredContactNumber'
        />
        <FormInput label='Upload Company Logo' type='file' name='logoUpload' />
      </Form>
    </>
  );
};

export default NewClientForm;
