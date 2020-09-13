import React from 'react';
import { connect } from 'react-redux';
// import { changeEmptyInfoBoxStatus } from '../slices';
import { selectedEmptyDataSelector } from '../selectors';

const mapToStatePropsForEmptyInfo = (state) => ({
  status: state.emptyInfoBox.status,
  selectedEmptyData: selectedEmptyDataSelector(state.navbarBox.selectedTab)(state),
});
const EmptyInfo = (props) => {
  const { status, selectedEmptyData } = props;
  if (status === 'closed') return null;
  const {
    firstName,
    lastName,
    description,
    address,
  } = selectedEmptyData;
  console.log(description);
  const {
    city,
    state,
    streetAddress,
    zip,
  } = address;
  return (
    <div className="d-flex flex-column border">
      Выбран пользователь: <b>{firstName} {lastName}</b>
      Описание:
      <textarea
        id="description"
        name="description"
        className="form-control w-50"
        rows="5"
        type="textarea"
        value={description}
      />
      Адрес проживания: <b>{streetAddress}</b>
      Город: <b>{city}</b>
      Провинция/штат: <b>{state}</b>
      Индекс: <b>{zip}</b>
    </div>
  );
};

export default connect(mapToStatePropsForEmptyInfo)(EmptyInfo);
