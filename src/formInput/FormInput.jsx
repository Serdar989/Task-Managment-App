import React, { useContext } from 'react';
import { FormContext } from '../store/input-context';
import '../index.css';
import LoadingSpinner from '../components/UI/LoadingSpinner';

function FormInput(props) {
  const { label, type = 'text', name } = props;

  const formContext = useContext(FormContext);
  const {
    form,
    handleFormChange,
    handleChange,
    handleUpload,
    companyLogo,
    loading,
  } = formContext;

  console.log('url za image je ' + companyLogo);

  let imageContent;
  if (loading) {
    imageContent = (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  } else if (companyLogo && !loading) {
    imageContent = (
      <div className='logoImgContainer'>
        <img className='logoImg' src={companyLogo} alt='logo' />
      </div>
    );
  }

  return (
    <div className='control'>
      {name === 'logoUpload' ? (
        <>
          <label>{label}</label>
          {imageContent}
          <input
            className='inputLogo'
            type={type}
            name={name}
            onChange={handleChange}
          />
          <button onClick={handleUpload} className='btn'>
            Upload Logo
          </button>
        </>
      ) : (
        <>
          <label>{label}</label>
          <input
            type={type}
            name={name}
            value={form[name]}
            onChange={handleFormChange}
          />
        </>
      )}
    </div>
  );
}

export default FormInput;
