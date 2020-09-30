import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import { filterData, filteredReset } from '../slices/searchSlice';

const Search = () => {
  const tableHeaders = useSelector((state) => state.table.tableHeaders);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    searchText: Yup.mixed().required(t('validation.required')),
  });
  const formik = useFormik({
    initialValues: {
      searchText: '',
      selectedHeader: tableHeaders[0],
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(filterData(values));
    },
    onReset: () => {
      formik.setValues({ searchText: ' ' });
      dispatch(filteredReset());
    },
  });
  const formikSearchError = formik.errors.searchText;
  const inputClasses = cn({
    'form-control': true,
    'is-invalid': formikSearchError,
  });
  const textDivClasses = cn({
    'ml-2': true,
    'text-danger': formikSearchError,
  });
  const optionsToSelect = tableHeaders
    .map((header) => <option key={`option-${header}`} value={header}>{header}</option>);
  return (
    <form
      className="d-flex justify-content-around align-items-end w-75 p-2 border-right border-bottom"
      onSubmit={formik.handleSubmit}
      onReset={formik.handleReset}
    >
      <div className="w-75">
        <label
          htmlFor="searchText"
          className={textDivClasses}
        >
          {!formikSearchError ? t('search.title') : _.capitalize(formikSearchError)}
        </label>
        <input
          id="searchText"
          name="searchText"
          type="text"
          className={inputClasses}
          onChange={formik.handleChange}
          disabled={false}
          value={formik.values.searchText}
          placeholder={t('search.title')}
        />
      </div>
      <div className="w-25 text-nowrap">
        <label
          htmlFor="selectedHeader"
          className="ml-2"
        >
          {t('search.idLabel')}
        </label>
        <select
          id="selectedHeader"
          name="selectedHeader"
          className="form-control mx-1"
          onChange={formik.handleChange}
          disabled={false}
          value={formik.values.selectedHeader}
        >
          {optionsToSelect}
        </select>
      </div>
      <div className="d-flex w-25 pl-2 justify-content-around">
        <Button className="mr-1 w-50" type="submit" disabled={formikSearchError} variant="primary">
          {t('buttons.find')}
        </Button>
        <Button className="w-50" type="reset" disabled={formikSearchError} variant="primary">
          {t('buttons.reset')}
        </Button>
      </div>
    </form>
  );
};

export default Search;
