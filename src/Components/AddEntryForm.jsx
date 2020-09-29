import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import { addEntryToData } from '../slices/dataSlice';
import getObjectWithTrimedValues from './utilits';

const AddEntryForm = () => {
  const tableHeaders = useSelector((state) => state.table.tableHeaders);
  const dataType = useSelector((state) => state.navbar.selectedTab);

  const validationSchema = Yup.object({
    id: Yup.number().typeError('Id must be a number').integer().required(),
    firstName: Yup.string().required().min(2).trim(),
    lastName: Yup.string().required().min(2).trim(),
    email: Yup.string().required().email().trim(),
    phone: Yup.string().required().matches(/\(\d{3}\)\d{3}-\d{4}$/, 'Number format: (123)456-7890 ').trim(),
  });
  const initialValues = tableHeaders.reduce((acc, header) => ({ ...acc, [header]: '' }), {});
  console.log('initialValues', initialValues);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const newEntry = getObjectWithTrimedValues(values, tableHeaders);
      useDispatch(addEntryToData({ newEntry, dataType }));
      resetForm();
    },
  });

  const Inputs = tableHeaders.map((header, i) => {
    const inputClasses = cn({
      'form-control': true,
      'is-invalid': formik.errors[header],
    });
    const textDivClasses = cn({
      'ml-2': true,
      'text-nowrap': true,
      'text-danger': formik.errors[header],
    });
    const inputBoxClasses = cn({
      'ml-1': i !== 0,
      'w-100': true,
    });
    const inputHeading = !formik.errors[header] ? header : _.capitalize(formik.errors[header]);
    return (
      <div key={`add-entry-${header}`} className={inputBoxClasses}>
        <label
          htmlFor={header}
          className={textDivClasses}
        >
          {inputHeading}
        </label>
        <div className={textDivClasses}></div>
        <input
          id={header}
          name={header}
          type={header}
          className={inputClasses}
          onChange={formik.handleChange}
          disabled={false}
          value={formik.values[header]}
          placeholder={header}
        />
      </div>
    );
  });
  const buttonDisabled = Object.keys(formik.errors).length > 0;
  return (
    <div className="w-100 bg-light border-right border-left">
      <form className="d-flex align-items-end p-2 " onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        {Inputs}
        <div className="d-flex justify-content-around">
        <Button className="mx-1 text-nowrap" type="submit" disabled={buttonDisabled} variant="primary">
          Add Entry
        </Button>
        <Button type="reset" disabled={false} variant="primary">
          Reset
        </Button>
        </div>
      </form>
    </div>
  );
};
export default AddEntryForm;
