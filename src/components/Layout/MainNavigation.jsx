import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import { useContext, useState } from 'react';
import AuthContext from '../../store/auth-context';
import logoImage from '../../assets/jpg/ziTech-logo_2.png';
import { ReactComponent as ManuIcon } from '../../assets/svg/bars-solid.svg';
import { ReactComponent as CloseIcon } from '../../assets/svg/window-close-solid.svg';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    navigate('/home');
  };
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <header>
      <div className={classes.logoContainer}>
        <img src={logoImage} alt='logo' />
      </div>

      <nav className={classes.desktopNav}>
        <ul className={classes.mainNav}>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : '')}
              to='/home'
            >
              Home
            </NavLink>
          </li>
          {isLoggedIn && (
            <li>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ''
                }
                to='/profile'
              >
                Profile
              </NavLink>
            </li>
          )}

          {!isLoggedIn && (
            <li>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ''
                }
                to='account'
              >
                Account
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ''
                }
                to='clients'
              >
                All Clients
              </NavLink>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <div onClick={logoutHandler} className='btn'>
                Logout
              </div>
            </li>
          )}
        </ul>
      </nav>
      <div className={classes.manuIconContainer}>
        <ManuIcon
          onClick={showSidebar}
          fill='#fff'
          width='22px'
          height='22px'
        />
      </div>
      <div
        className={
          sidebar
            ? classes.mobileNavContainerActive
            : classes.mobileNavContainer
        }
      >
        <nav className={classes.mobileNav}>
          <ul className={classes.mobileMenu}>
            <li>
              <CloseIcon
                onClick={showSidebar}
                fill='#fff'
                width='20px'
                height='20px'
              />
            </li>
            <li>
              <NavLink
                onClick={showSidebar}
                className={(navData) =>
                  navData.isActive ? classes.active : ''
                }
                to='/home'
              >
                Home
              </NavLink>
            </li>
            {isLoggedIn && (
              <li>
                <NavLink
                  onClick={showSidebar}
                  className={(navData) =>
                    navData.isActive ? classes.active : ''
                  }
                  to='/profile'
                >
                  Profile
                </NavLink>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <NavLink
                  onClick={showSidebar}
                  className={(navData) =>
                    navData.isActive ? classes.active : ''
                  }
                  to='account'
                >
                  Account
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <NavLink
                  onClick={showSidebar}
                  className={(navData) =>
                    navData.isActive ? classes.active : ''
                  }
                  to='clients'
                >
                  All Clients
                </NavLink>
              </li>
            )}

            {isLoggedIn && (
              <li onClick={showSidebar}>
                <div onClick={logoutHandler} className='btn'>
                  Logout
                </div>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default MainNavigation;
