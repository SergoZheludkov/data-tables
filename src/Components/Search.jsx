import React from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';

const Search = () => {
  // -------------------------Formik-------------------------
  const formik = useFormik({
    initialValues: {
      search: '',
    },
    // onSubmit: (values) => {

    // },
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
      <Button type="submit" disabled={false} variant="primary">
        Find
      </Button>
    </form>
  );
};

export default connect()(Search);
