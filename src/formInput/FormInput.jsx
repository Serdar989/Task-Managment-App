import React, { useContext } from 'react';
import { FormContext } from '../store/input-context';
import '../index.css';

function FormInput(props) {
  const { label, type = 'text', name, placeholder, pattern } = props;

  const formContext = useContext(FormContext);
  const {
    form,
    handleFormChange,
    handleChange,
    handleUpload,
    companyLogo,
  } = formContext;

  let imageContent;

  if (companyLogo) {
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
            placeholder={placeholder}
            pattern={pattern}
          />
        </>
      )}
    </div>
  );
}

export default FormInput;
