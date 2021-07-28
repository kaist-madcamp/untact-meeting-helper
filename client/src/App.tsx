import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import MeetingRoom from './pages/MeetingRoom';
import { routes } from './routes/index';
import { HelmetProvider } from 'react-helmet-async';
import useAuth from './hooks/useAuth';
import { GlobalStyles } from './styles/styles';
import { PortalProvider } from './providers/PortalProvider';
import WaitingRoom from './pages/WaitingRoom';
import Upload from './pages/Upload';
import DetailPost from './pages/DetailPost';
import './App.css'

function App() {
  const [isLoggedIn, toggleAuth] = useAuth();

  return (
    <PortalProvider>
      <HelmetProvider>
        <GlobalStyles />
        <Switch>
          <Route path={routes.root} exact>
            <WaitingRoom useAuthInput={[isLoggedIn, toggleAuth]} />
          </Route>

          {!isLoggedIn && <Redirect to={routes.root}></Redirect>}

          <Route path={routes.home} exact>
            <Home useAuthInput={[isLoggedIn, toggleAuth]} />
          </Route>

          <Route path={routes.meetingRoom}>
            <MeetingRoom useAuthInput={[isLoggedIn, toggleAuth]} />
          </Route>

          <Route path={routes.upload} component={Upload}></Route>
          <Route exact path="/post/:postId" component={DetailPost} />
        </Switch>
      </HelmetProvider>
    </PortalProvider>
  );
}

export default App;
