import React, { useEffect } from 'react';
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

function App() {
  const [isLoggedIn, toggleAuth] = useAuth();

  return (
    <HelmetProvider>
      <GlobalStyles />
      <Switch>
        <Route path={routes.home} exact>
          <WebCam useAuthInput={[isLoggedIn, toggleAuth]} />
        </Route>

        {!isLoggedIn ? (
          <Route path={routes.signUp}>
            <SignUp />
          </Route>
        ) : null}

        <Route path={routes.home} exact>
          {isLoggedIn ? (
            <Home useAuthInput={[isLoggedIn, toggleAuth]} />
          ) : (
            <Login useAuthInput={[isLoggedIn, toggleAuth]} />
          )}
        </Route>

        <Route path={routes.meetingRoom}>
          <MeetingRoom useAuthInput={[isLoggedIn, toggleAuth]} />
        </Route>
      </Switch>
    </HelmetProvider>
  );
}

export default App;
