import 'bootstrap/dist/css/bootstrap.css';
// import fs from 'fs';
// import path from 'path';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import rootReducer from './slices';
import App from './Components/App.jsx';

const store = configureStore({
  reducer: rootReducer,
});

// const proxy = 'https://cors-anywhere.herokuapp.com/';
const dataRequestMapper = {
  small: 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
  large: 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
};
/* const smallpath = path.resolve(__dirname, '/data/small.json');
const smallData = fs.readFileSync(smallpath, 'utf8');
console.log(smallData);
const localData = {
  small: JSON.parse(small),
  large: JSON.parse(large),
}; */

const getTableData = ([type, url]) => axios.get(url)
  .then(({ data }) => {
    store.dispatch({ type: 'tableBox/updateData', payload: { type, data } });
  })
  .catch((error) => {
    store.dispatch({ type: 'tableBox/updateError', payload: { type, error } });
  });

const loadTablesData = async (dataMapper) => {
  const dataMapperArray = Object.entries(dataMapper);
  dataMapperArray.forEach(getTableData);
};

loadTablesData(dataRequestMapper);
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root'),
);
