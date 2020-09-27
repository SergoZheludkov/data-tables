import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import { filterData, filteredReset } from '../slices/searchSlice';

const Search = () => {
  const tableHeaders = useSelector((state) => state.table.tableHeaders);
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    searchText: Yup.mixed().required(),
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
          {!formikSearchError ? 'Search' : _.capitalize(formikSearchError)}
        </label>
        <input
          id="searchText"
          name="searchText"
          type="text"
          className={inputClasses}
          onChange={formik.handleChange}
          disabled={false}
          value={formik.values.searchText}
          placeholder="Search"
        />
      </div>
      <div className="w-25 text-nowrap">
        <label
          htmlFor="selectedHeader"
          className="ml-2"
        >
          Select a row to filter
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
          Find
        </Button>
        <Button className="w-50" type="reset" disabled={formikSearchError} variant="primary">
          Reset
        </Button>
      </div>
    </form>
  );
};

export default Search;
