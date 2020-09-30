import React from 'react';
import loading from '../assets/img/loading.gif';

const Loading = () => (
  <div className="min-vh-100 d-flex justify-content-center align-items-center">
    <img className="w-25" src={loading}/>
  </div>
);

export default Loading;
