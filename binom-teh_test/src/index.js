import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <div className="wrapper">
      <div className="content">
        <App percent={35} colorOne="#fcb638" colorTwo="#4f4f4f">
          <div className="paragraph">
            <div className="title">факт план (на текущую дату)</div>
            <div className="description">
              <span className="number-color-1">227 700 т</span>
              <span className="number-color-2"> / 227 700 т</span></div>
          </div>
          <div className="paragraph">
            <div className="title">Прогноз/план</div>
            <div className="description">
              <span className="number-color-1">690 000 т</span>
              <span className="number-color-2"> / 690 000 т</span></div>
          </div>
        </App>
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
