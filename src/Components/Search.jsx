import React from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import { filterData } from '../slices';

const mapStateToPropsForSearch = (state) => ({
  headings: state.tableBox.headings,
});
const actionCreatorsForHeader = { filterData };
const Search = (props) => {
  const {
    headings,
    filterData: filter,
  } = props;
  const formik = useFormik({
    initialValues: {
      search: '',
      head: headings[0],
    },
    onSubmit: (values) => {
      filter({ filterSettings: values });
    },
  });

  return (
    <form className="d-flex justify-content-end p-2" onSubmit={formik.handleSubmit}>
      <input
        id="search"
        name="search"
        type="text"
        className="form-control"
        onChange={formik.handleChange}
        disabled={false}
        value={formik.values.message}
        placeholder="Search"
      />
      <select
        id="head"
        name="head"
        className="form-control w-50"
        onChange={formik.handleChange}
        disabled={false}
        value={formik.values.head}
      >
        {headings.map((head) => <option key={head} value={head}>{head}</option>)}
      </select>
      <Button type="submit" disabled={false} variant="primary">
        Find
      </Button>
    </form>
  );
};

export default connect(
  mapStateToPropsForSearch,
  actionCreatorsForHeader,
)(Search);
