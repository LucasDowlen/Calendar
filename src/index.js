import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom'
import CalendarApp from './CalendarApp';
import FullViewDay from './FullViewDay';

import "./style.css";


ReactDOM.render(
  <React.StrictMode>

    <BrowserRouter>
      <Route exact path = "/">
        <CalendarApp />
      </Route>

      <Route path="/day">
        <FullViewDay />
      </Route>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

