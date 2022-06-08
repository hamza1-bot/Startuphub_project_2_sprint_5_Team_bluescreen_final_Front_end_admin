import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './container/App/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import GlobalState from './context/GlobalState';

window.$mediaURL = "http://localhost:8010/StartupHub/";

const app = (
  <GlobalState>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </GlobalState>
);
ReactDOM.render(
  app,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
