import React from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import { filterData, filteredReset } from '../slices';

const mapStateToPropsForSearch = (state) => ({
  headings: state.tableBox.headings,
});
const actionCreatorsForHeader = { filterData, filteredReset };
const Search = (props) => {
  const {
    headings,
    filterData: filter,
    filteredReset: reset,
  } = props;
  const validationSchema = Yup.object({
    search: Yup.mixed().required(),
  });
  const formik = useFormik({
    initialValues: {
      search: '',
      head: headings[0],
    },
    validationSchema,
    onSubmit: (values) => {
      filter({ filterSettings: values });
    },
    onReset: () => {
      formik.setValues({ search: ' ' });
      reset();
    },
  });
  const formikSearchError = formik.errors.search;

  const inputClasses = cn({
    'form-control': true,
    'is-invalid': formikSearchError,
  });
  const textDivClasses = cn({
    'ml-2': true,
    'text-danger': formikSearchError,
  });
  return (
    <form className="d-flex justify-content-around align-items-end w-75 p-2 border-right border-bottom" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <div className="w-75">
        <div className={textDivClasses}>{!formikSearchError ? 'Search' : _.capitalize(formikSearchError)}</div>
      <input
        id="search"
        name="search"
        type="text"
        className={inputClasses}
        onChange={formik.handleChange}
        disabled={false}
        value={formik.values.search}
        placeholder="Search"
      />
      </div>
      <div className="w-25 text-nowrap">

        <div className="ml-2">Select a column to filter</div>
      <select
        id="head"
        name="head"
        className="form-control mx-1"
        onChange={formik.handleChange}
        disabled={false}
        value={formik.values.head}
      >
        {headings.map((head) => <option key={head} value={head}>{head}</option>)}
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

export default connect(
  mapStateToPropsForSearch,
  actionCreatorsForHeader,
)(Search);
