import React from 'react';
import classes from './Home.module.css';

const Home = () => {
  return (
    <section className={classes.homeBackground}>
      <div className={classes.homeDescription}>Home page</div>
      <div className={classes.imageHolder}></div>
      <div className={classes.taskText}>
        Task <br /> Managment
      </div>
    </section>
  );
};

export default Home;
