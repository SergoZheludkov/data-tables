import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { setPageSize } from '../slices/pageSizeSlice';

const ButtonsControlTheNumberOfRows = () => {
  const allPageSizes = useSelector((state) => state.pageSize.allSizes);
  const currentSize = useSelector((state) => state.pageSize.currentSize);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handlerChangeNumbersOfRows = (size) => (event) => {
    event.preventDefault();
    dispatch(setPageSize({ size }));
  };
  return (
    <div className="align-self-end p-2 border-right border-bottom">
      <div className="text-center">{t('pageSize.title')}</div>
      <ButtonGroup aria-label="Basic example">
      {allPageSizes.map((option) => (
        <Button
          onClick={handlerChangeNumbersOfRows(option)}
          key={option}
          active={option === currentSize}
          variant="secondary"
        >
          {option}
        </Button>
      ))}
      </ButtonGroup>
    </div>
  );
};
export default ButtonsControlTheNumberOfRows;
