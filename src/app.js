import './app.scss';

import React, {Suspense, lazy} from 'react';
import {Spinner} from 'react-bootstrap';
import {Route, Redirect, Switch, useLocation} from 'react-router-dom';

const Home = lazy(() => import('./pages/home/home'));

function App() {
  const location = useLocation();
  const pages = [
    {
      pageLink: '/',
      view: Home,
      isExact: false,
      displayName: 'Home',
    },
  ];
  return (
    <div className="App">
      <Suspense fallback={<Spinner animation="border" variant="primary" />}>
        <Switch location={location}>
          {pages.map((page, index) => {
            return (
              <Route
                exact={page.isExact}
                path={page.pageLink}
                render={({match}) => <page.view />}
                key={index}
              />
            );
          })}
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
