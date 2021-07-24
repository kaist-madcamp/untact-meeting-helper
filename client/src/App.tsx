import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import MeetingRoom from './pages/MeetingRoom';
import { routes } from './routes/index';
import { HelmetProvider } from 'react-helmet-async';
import useAuth from './hooks/useAuth';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { GlobalStyles } from './styles/styles';
import WebCam from './pages/Webcam';
import Backdrop from './components/UI/Backdrop';
import { PortalProvider } from './providers/PortalProvider';

function App() {
  const [isLoggedIn, toggleAuth] = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  console.log(isLoggedIn);
  return (
    <PortalProvider>
      <HelmetProvider>
        <GlobalStyles />
        <Switch>
          <Route path={routes.root} exact>
            <WebCam useAuthInput={[isLoggedIn, toggleAuth]} />
          </Route>

          <Route path={routes.home} exact>
            <Home useAuthInput={[isLoggedIn, toggleAuth]} />
          </Route>

          <Route path={routes.meetingRoom}>
            <MeetingRoom useAuthInput={[isLoggedIn, toggleAuth]} />
          </Route>
        </Switch>
      </HelmetProvider>
    </PortalProvider>
  );
}

export default App;
