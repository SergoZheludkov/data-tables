import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { errorsSelector } from '../selectors';
import { updateData } from '../slices/dataSlice';
import localdata from '../data';

const AlertComponent = () => {
  const currentTab = useSelector((state) => state.navbar.selectedTab);
  const error = useSelector((state) => errorsSelector(currentTab)(state));
  const dispatch = useDispatch();

  const handleClickDownloadLocalData = (type) => (event) => {
    event.preventDefault();
    dispatch(updateData({ type, data: localdata[type], status: 'success' }));
  };
  return (
    <div className="d-flex justify-content-center mt-5">
      <Alert className="w-50" variant="danger">
        <Alert.Heading>Oh snap! You got {error.message}!</Alert.Heading>
        <p>
          An error occured, to use the demo version you can load data from local storage
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={handleClickDownloadLocalData(currentTab)} variant="primary">
            Download local data
          </Button>
        </div>
      </Alert>
    </div>
  );
};

export default AlertComponent;
