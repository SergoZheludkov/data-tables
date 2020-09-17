import React from 'react';

const firstpicLink = 'https://i.ibb.co/fQQxNMW/first-pic.jpg';
const secontpicLink = 'https://i.ibb.co/K91hB4C/second-pick.jpg';
const thirdpicLink = 'https://i.ibb.co/r6H4t82/third-pic.jpg';

const HomePage = () => (
  <div className="d-flex flex-column align-items-center">
    <h1 className="mt-5">Direction</h1>
    <div className="mt-3">
      <p className="text-center"><i>Use the search bar to filter items</i></p>
      <img src={firstpicLink} className="border rounded-lg" alt="first pic" />
    </div>
    <div className="mt-4">
      <p className="text-center"><i>To add a new line use the data entry form</i></p>
      <img src={secontpicLink} className="border rounded-lg" alt="secont pic" />
    </div>
    <div className="my-4">
      <p className="text-center">
        <i>For sorting use the table header</i>
        <br />
        <i>To partially or completely reset sorting settings use Sort Info</i>
      </p>
      <img src={thirdpicLink} className="border rounded-lg" alt="secont pic" />
    </div>
  </div>
);

export default HomePage;
