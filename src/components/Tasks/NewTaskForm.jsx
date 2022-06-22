import React from 'react';
import Form from '../../store/input-context';
import FormInput from '../../formInput/FormInput';

const NewTaskForm = (props) => {
  const initialValues = {
    enteredDate: '',
    enteredJobDescription: '',
    enteredNumberOfHours: '',
    enteredNumberOfPages: '',
    enteredPricePerHour: '',
    enteredNote: '',
    enteredPaymanetMade: '',
  };

  const typeOfForm = 'newTaskForm';

  const submitHandler = (form, e) => {
    e.preventDefault();

    const taskData = {
      date: form.enteredDate,
      jobDescription: form.enteredJobDescription,
      numberOfHours: form.enteredNumberOfHours,
      numberOfPages: form.enteredNumberOfPages,
      pricePerHour: form.enteredPricePerHour,
      note: form.enteredNote,
      paymanetMade: form.enteredPaymanetMade,
    };

    props.onAddTask(taskData);
  };

  return (
    <>
      <Form
        submit={submitHandler}
        initialValues={initialValues}
        typeOfForm={typeOfForm}
      >
        <FormInput label='Date' type='date' name='enteredDate' />
        <FormInput
          label='Job Description'
          type='text'
          name='enteredJobDescription'
        />
        <FormInput
          label='Number Of Hours'
          type='number'
          name='enteredNumberOfHours'
        />
        <FormInput
          label='Number Of Pages'
          type='number'
          name='enteredNumberOfPages'
        />
        <FormInput
          label='Price Per Hour'
          type='number'
          name='enteredPricePerHour'
        />
        <FormInput label='Note' type='text' name='enteredNote' />
        <FormInput
          label='Paymanet Made'
          type='checkbox'
          name='enteredPaymanetMade'
        />
      </Form>
    </>
  );
};

export default NewTaskForm;
