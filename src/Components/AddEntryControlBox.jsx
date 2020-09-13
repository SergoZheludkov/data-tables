import React from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import { changeStatus, addEntryToData } from '../slices';
import getObjectWithTrimedValues from '../utilits';

const mapStateToPropsAddEntry = (state) => ({
  status: state.addEntryСontrolBoxSlice.status,
  headings: state.tableBox.headings,
  dataType: state.navbarBox.selectedTab,
});
const actionCreatorsForAddEntryForm = { addEntryToData };
const AddEntryForm = (props) => {
  const {
    status,
    headings,
    dataType,
    addEntryToData: addEntry,
  } = props;
  if (status === 'closed') return null;

  const validationSchema = Yup.object({
    id: Yup.number().typeError('Id must be a number').integer().required(),
    firstName: Yup.string().required().min(2).trim(),
    lastName: Yup.string().required().min(2).trim(),
    email: Yup.string().required().email().trim(),
    phone: Yup.string().required().matches(/\(\d{3}\)\d{3}-\d{4}$/, 'Number format: (123)456-7890 ').trim(),
  });

  const initialValues = headings.reduce((acc, head) => ({ ...acc, [head]: '' }), {});
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const newEntry = getObjectWithTrimedValues(values, headings);
      addEntry({ newEntry, dataType });
      formik.resetForm();
    },
    onReset: () => {
    },
  });

  const Inputs = headings.map((head, i) => {
    const inputClasses = cn({
      'form-control': true,
      'is-invalid': formik.errors[head],
    });
    const textDivClasses = cn({
      'ml-2': true,
      'text-danger': formik.errors[head],
    });
    const inputBoxClasses = cn({
      'ml-1': i !== 0,
      'w-100': true,
    });
    const inputHeading = !formik.errors[head] ? head : _.capitalize(formik.errors[head]);
    return (
      <div key={`add-entry-${head}`} className={inputBoxClasses}>
        <div className={textDivClasses}>{inputHeading}</div>
        <input
          id={head}
          name={head}
          type={head}
          className={inputClasses}
          onChange={formik.handleChange}
          disabled={false}
          value={formik.values[head]}
          placeholder={head}
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
export const AddEntryFormBox = connect(
  mapStateToPropsAddEntry,
  actionCreatorsForAddEntryForm,
)(AddEntryForm);
// ------------------------------------------------------------------------------------------
const actionCreatorsForAddEntry = { changeStatus };

const AddEntryControl = (props) => {
  const { status, changeStatus: change } = props;
  const handlerChangeStatus = (event) => {
    event.preventDefault();
    change();
  };
  const divClasses = cn({
    'p-2': true,
    'flex-fill': true,
    'text-nowrap': true,
    'border-bottom': status === 'closed',
    'bg-light': status === 'opened',
  });
  return (
    <div className={divClasses}>
      <div className="text-center">Add Entry</div>
      <Button onClick={handlerChangeStatus} className="w-100 " variant="info">
        {status === 'closed' ? 'Open form' : 'Close'}
      </Button>
    </div>
  );
};

export const AddEntryControlBox = connect(
  mapStateToPropsAddEntry,
  actionCreatorsForAddEntry,
)(AddEntryControl);
