import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Navigator from './navigator'

ReactDOM.render(
   <BrowserRouter>
      <Navigator/>
      </BrowserRouter>
    ,document.getElementById('app')
);
