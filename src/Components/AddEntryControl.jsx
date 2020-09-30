import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import Button from 'react-bootstrap/Button';
import { changeAddingEntryBoxStatus } from '../slices/addingEntrySlice';
// ------------------------------------------------------------------------------------------

const AddEntryControl = () => {
  const status = useSelector((state) => state.addEntryСontrol.status);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleChangeStatus = () => {
    dispatch(changeAddingEntryBoxStatus());
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
      <div className="text-center">{t('addEntry.title')}</div>
      <Button onClick={handleChangeStatus} className="w-100 " variant="info">
        {status === 'closed' ? t('buttons.openForm') : t('buttons.close')}
      </Button>
    </div>
  );
};

export default AddEntryControl;
