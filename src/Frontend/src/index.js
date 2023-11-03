import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login&Register&Admin/Login';
import Register from './Components/Login&Register&Admin/Register';
import Shop from './Components/Shop/Shop';
import Home from './Components/Home/Home';
import Porfile from './Components/Profile/Porfile';
import Functions from './Components/Functions/Functions';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/myaccount' element={<Porfile />} />
            <Route path='/history' element={<Functions />} />
          </Route>
        </Routes>
      </Provider>

    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
