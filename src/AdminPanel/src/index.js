import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Comment from "./components/Comment";
import Settings from "./components/Settings";
// import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route element={<App/>} path='/' index/>
              <Route element={<Comment/>} path='/comments' />
              <Route element={<Settings/>} path='/settings' />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
