import './app.scss';

import React, {Suspense, lazy} from 'react';
import {Spinner} from 'react-bootstrap';
import {Route, Redirect, Switch, useLocation} from 'react-router-dom';

const Home = lazy(() => import('./pages/home/home'));

function App() {
  const location = useLocation();
  const pages = [
    {
      pageLink: ['/:code', '/'],
      view: Home,
      isExact: true,
      displayName: 'Home',
    },
  ];
  return (
    <div className="App h-100">
      <Suspense
        fallback={
          <div className="h-100 d-flex justify-content-center align-items-center">
            <Spinner animation="border" variant="primary" />
          </div>
        }
      >
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
