import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';
import useHttp from '../../hooks/use-http';
import { editTaskHandler } from '../../lib/api';
import { useParams } from 'react-router-dom';
import '../../index.css';

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

  const [enteredDate, setEnteredDate] = useState(props.loadedTask.date);

  const [enteredJobDescription, setEnteredJobDescription] = useState(
    props.loadedTask.jobDescription
  );
  const [enteredNumberOfHours, setEnteredNumberOfHours] = useState(
    props.loadedTask.numberOfHours
  );
  const [enteredNumberOfPages, setEnteredNumberOfPages] = useState(
    props.loadedTask.numberOfPages
  );
  const [enteredPricePerHour, setEnteredPricePerHour] = useState(
    props.loadedTask.pricePerHour
  );
  const [enteredNote, setEnteredNote] = useState(props.loadedTask.note);
  const [enteredPaymanetMade, setEnteredPaymanetMade] = useState(
    props.loadedTask.paymanetMade
  );

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

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const jobDescriptionChangeHandler = (event) => {
    setEnteredJobDescription(event.target.value);
  };

  const numberOfHoursChangeHandler = (event) => {
    setEnteredNumberOfHours(event.target.value);
  };
  const numberOfPagesChangeHandler = (event) => {
    setEnteredNumberOfPages(event.target.value);
  };
  const pricePerHourChangeHandler = (event) => {
    setEnteredPricePerHour(event.target.value);
  };
  const noteChangeHandler = (event) => {
    setEnteredNote(event.target.value);
  };
  const paymanetMadeChangeHandler = (event) => {
    setEnteredPaymanetMade(event.target.checked);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const taskData = {
      date: enteredDate,
      jobDescription: enteredJobDescription,
      numberOfHours: enteredNumberOfHours,
      numberOfPages: enteredNumberOfPages,
      pricePerHour: enteredPricePerHour,
      note: enteredNote,
      paymanetMade: enteredPaymanetMade,
    };
    editTask(taskData);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='auth'>
        <h1>Edit Task</h1>
        <div className='control'>
          <label>Date</label>

          <input type='date' value={enteredDate} onChange={dateChangeHandler} />
        </div>
        <div className='control'>
          <label>Job Description</label>
          <input
            type='text'
            value={enteredJobDescription}
            onChange={jobDescriptionChangeHandler}
          />
        </div>
        <div className='control'>
          <label>Number Of Hours</label>
          <input
            type='number'
            value={enteredNumberOfHours}
            onChange={numberOfHoursChangeHandler}
          />
        </div>
        <div className='control'>
          <label>Number Of Pages</label>
          <input
            type='number'
            value={enteredNumberOfPages}
            onChange={numberOfPagesChangeHandler}
          />
        </div>
        <div className='control'>
          <label>Price Per Hour</label>
          <input
            type='number'
            value={enteredPricePerHour}
            onChange={pricePerHourChangeHandler}
          />
        </div>
        <div className='control'>
          <label>Note</label>
          <input type='text' value={enteredNote} onChange={noteChangeHandler} />
        </div>
        <div className='control'>
          <label>Paymanet Made</label>
          <input
            type='checkbox'
            checked={enteredPaymanetMade}
            onChange={paymanetMadeChangeHandler}
          />
        </div>
        <div className='actions'>
          <button className='btn btn-primary' type='submit'>
            Edit Task
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditTaskForm;
