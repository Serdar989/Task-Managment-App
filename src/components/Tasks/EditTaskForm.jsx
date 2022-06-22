import React, { useEffect } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';
import useHttp from '../../hooks/use-http';
import { editTaskHandler } from '../../lib/api';
import { useParams } from 'react-router-dom';
import '../../index.css';
import FormInput from '../../formInput/FormInput';
import Form from '../../store/input-context';

const EditTaskForm = (props) => {
  const params = useParams();

  const { taskId } = params;

  const { clientsId } = params;
  const { onEditTask } = props;

  const { sendRequest, status, error } = useHttp(editTaskHandler);

  const editTask = (taskData) => {
    sendRequest({ clientsId: clientsId, taskId: taskId, taskData: taskData });
  };

  useEffect(() => {
    if (status === 'completed' && !error) {
      onEditTask();
    }
  }, [status, error, onEditTask]);

  const initialValues = {
    enteredDate: props.loadedTask.date,
    enteredJobDescription: props.loadedTask.jobDescription,
    enteredNumberOfHours: props.loadedTask.numberOfHours,
    enteredNumberOfPages: props.loadedTask.numberOfPages,
    enteredPricePerHour: props.loadedTask.pricePerHour,
    enteredNote: props.loadedTask.note,
    enteredPaymanetMade: props.loadedTask.paymanetMade,
  };

  const typeOfForm = 'editTaskForm';

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
    editTask(taskData);
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

export default EditTaskForm;
