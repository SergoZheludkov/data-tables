import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import Button from 'react-bootstrap/Button';
import { changeAddEntryСontrolBoxStatus } from '../slices';
// ------------------------------------------------------------------------------------------
const mapStateToPropsAddEntry = (state) => ({
  status: state.addEntryСontrol.status,
});
const actionCreatorsForAddEntry = { changeAddEntryСontrolBoxStatus };

const AddEntryControl = (props) => {
  const { status, changeAddEntryСontrolBoxStatus: changeStatus } = props;
  const handlerChangeStatus = (event) => {
    event.preventDefault();
    changeStatus();
  };
  const divClasses = cn({
    'align-self-end': true,
    'p-2': true,
    'flex-fill': true,
    'text-nowrap': true,
    'border-bottom': status === 'closed',
    'bg-light': status === 'opened',
  });
  return (
    <div className={divClasses}>
      <div className="text-center">Add Entry</div>
      <Button onClick={handlerChangeStatus} className="w-100 " variant="info">
        {status === 'closed' ? 'Open form' : 'Close'}
      </Button>
    </div>
  );
};

export default connect(
  mapStateToPropsAddEntry,
  actionCreatorsForAddEntry,
)(AddEntryControl);
