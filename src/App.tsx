import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import MeetingRoom from './pages/MeetingRoom';
import { routes } from './routes/index';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <Switch>
        <Route path={routes.home} exact>
          <Home />
        </Route>
        <Route path={routes.meetingRoom}>
          <MeetingRoom />
        </Route>
      </Switch>
    </HelmetProvider>
  );
}

export default App;
