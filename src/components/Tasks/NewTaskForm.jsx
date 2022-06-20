import React, { useState } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';

const NewTaskForm = (props) => {
  const [enteredDate, setEnteredDate] = useState('');
  const [enteredJobDescription, setEnteredJobDescription] = useState('');
  const [enteredNumberOfHours, setEnteredNumberOfHours] = useState('');
  const [enteredNumberOfPages, setEnteredNumberOfPages] = useState('');
  const [enteredPricePerHour, setEnteredPricePerHour] = useState('');
  const [enteredNote, setEnteredNote] = useState('');
  const [enteredPaymanetMade, setEnteredPaymanetMade] = useState('');

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

    props.onAddTask(taskData);

    setEnteredDate('');
    setEnteredJobDescription('');
    setEnteredNumberOfHours('');
    setEnteredNumberOfPages('');
    setEnteredPricePerHour('');
    setEnteredNote('');
    setEnteredPaymanetMade('');
  };

  return (
    <form onSubmit={submitHandler}>
      {props.isLoading && (
        <div>
          <LoadingSpinner />
        </div>
      )}
      <div>
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
            value={enteredPaymanetMade}
            onChange={paymanetMadeChangeHandler}
          />
        </div>
      </div>
      <div className='actions'>
        <button className='btn btn-primary' type='submit'>
          Add Task
        </button>
      </div>
    </form>
  );
};

export default NewTaskForm;
