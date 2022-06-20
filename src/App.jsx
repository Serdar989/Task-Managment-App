import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useContext } from 'react';

import Home from './pages/Home';
import Layout from './components/Layout/Layout';
import Account from './pages/Account';
import AllClients from './pages/AllClients';
import NotFound from './pages/NotFound';
import NewClient from './pages/NewClient';
import ClientServices from './components/Clients/ClientServices';
import NewTask from './components/Tasks/NewTask';
import EditTask from './components/Tasks/EditTask';
import UserProfile from './components/Profile/UserProfile';
import AuthContext from './store/auth-context';
import EditClient from './components/Clients/EditClient';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home/*' element={<Home />}>
          <Route path='new-user' element={<p>Welcome New User</p>} />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path='account' element={<Account />}></Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path='profile' element={<UserProfile />}></Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path='/clients/' element={<AllClients />}></Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path='clients/:clientsId/*' element={<ClientServices />} />
        )}
        {authCtx.isLoggedIn && (
          <Route
            path='clients/:clientsId/edit-client'
            element={<EditClient />}
          />
        )}

        {authCtx.isLoggedIn && (
          <Route path='clients/:clientsId/new-task' element={<NewTask />} />
        )}
        {authCtx.isLoggedIn && (
          <Route
            path='clients/:clientsId/tasks/:taskId/edit-task'
            element={<EditTask />}
          />
        )}
        <Route path='clients/new-client' element={<NewClient />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
