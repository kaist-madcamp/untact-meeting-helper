import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import MeetingRoom from './pages/MeetingRoom';
import { routes } from './routes/index';
import { HelmetProvider } from 'react-helmet-async';
import useAuth from './hooks/useAuth';
import { GlobalStyles } from './styles/styles';
import { PortalProvider } from './providers/PortalProvider';
import WaitingRoom from './pages/WaitingRoom';
import DiagramSync from './pages/DiagramSync';

import UploadPage from './pages/UploadPage';
import MyPost from './pages/MyPost';

import Chat from './pages/Chat';
import Join from './pages/Join';

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

          <Route path={routes.home} exact>
            <Home useAuthInput={[isLoggedIn, toggleAuth]} />
          </Route>

          <Route path={routes.meetingRoom}>
            <MeetingRoom useAuthInput={[isLoggedIn, toggleAuth]} />
          </Route>

          <Route path={routes.diagramSync}>
            <DiagramSync/>
          </Route>

          <Route path="/upload" component={UploadPage} />
          <Route path="/myPost" component={MyPost} />

          <Route path="/join" exact component={Join} />
          <Route path="/chat" component={Chat} />
        </Switch>
      </HelmetProvider>
    </PortalProvider>
  );
}

export default App;
