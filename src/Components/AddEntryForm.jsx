import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
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
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    id: Yup.number()
      .typeError(t('validation.integer'))
      .integer()
      .required(t('validation.required')),
    firstName: Yup.string()
      .required(t('validation.required'))
      .min(2, t('validation.min2'))
      .trim(),
    lastName: Yup.string()
      .required(t('validation.required'))
      .min(2, t('validation.min2'))
      .trim(),
    email: Yup.string()
      .required(t('validation.required'))
      .email(t('validation.email'))
      .trim(),
    phone: Yup.string()
      .required(t('validation.required'))
      .matches(/\(\d{3}\)\d{3}-\d{4}$/, t('validation.phone'))
      .trim(),
  });

  const initialValues = tableHeaders.reduce((acc, header) => ({ ...acc, [header]: '' }), {});
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const newEntry = getObjectWithTrimedValues(values, tableHeaders);
      dispatch(addEntryToData({ newEntry, dataType }));
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
          {t('buttons.addEntry')}
        </Button>
        <Button type="reset" disabled={false} variant="primary">
          {t('buttons.reset')}
        </Button>
        </div>
      </form>
    </div>
  );
};
export default AddEntryForm;
