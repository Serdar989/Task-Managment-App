import React, { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const FormContext = React.createContext({
  form: {},
});

function Form(props) {
  const { children, submit = () => {}, initialValues } = props;

  let propValue = props.companyLogo !== undefined ? props.companyLogo : '';

  const buttonText =
    props.companyLogo !== undefined ? 'Edit Client' : 'Add Client';

  const [logoUpload, setlogoUpload] = useState(null);

  const [form, setForm] = useState(initialValues);
  const [companyLogo, setCompanyLogo] = useState(propValue);

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setlogoUpload(e.target.files[0]);
    }
  };

  const handleUpload = (event) => {
    event.preventDefault();

    if (logoUpload == null) return;
    const imageRef = ref(storage, `images/${logoUpload.name}`);
    uploadBytes(imageRef, logoUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setCompanyLogo(url);
      });
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (companyLogo !== undefined || companyLogo === '') {
      submit(form, e, companyLogo);
    } else {
      submit(form, e);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='controls'>
        <FormContext.Provider
          value={{
            form,
            handleFormChange,
            handleChange,
            handleUpload,
            companyLogo,
          }}
        >
          {children}
        </FormContext.Provider>
        <div className='actions'>
          <button type='submit'>{buttonText}</button>
        </div>
      </div>
    </form>
  );
}

export default Form;
