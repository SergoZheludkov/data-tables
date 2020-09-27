import React from 'react';
import { useSelector } from 'react-redux';
import { selectedEmptyDataSelector } from '../selectors';

const EmptyInfo = () => {
  const status = useSelector((state) => state.emptyInfo.status);
  const selectedEmptyData = useSelector(
    (state) => selectedEmptyDataSelector(state.navbar.selectedTab)(state),
  );
  if (status === 'closed') return null;

  const {
    firstName, lastName, description, address,
  } = selectedEmptyData;
  const {
    city, state, streetAddress, zip,
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
        readOnly
        value={description}
      />
      Адрес проживания: <b>{streetAddress}</b>
      Город: <b>{city}</b>
      Провинция/штат: <b>{state}</b>
      Индекс: <b>{zip}</b>
    </div>
  );
};

export default EmptyInfo;
