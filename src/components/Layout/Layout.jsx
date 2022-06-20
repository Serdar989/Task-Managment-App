import { Fragment } from 'react';
import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';
import Footer from './Footer';

import React from 'react';

function Layout(props) {
  return (
    <Fragment>
      <MainNavigation />

      <main className={classes.layout}>{props.children}</main>

      <Footer />
    </Fragment>
  );
}

export default Layout;
