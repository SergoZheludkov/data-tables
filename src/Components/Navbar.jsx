import React from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import _ from 'lodash';
// import cn from 'classnames';
import Navbar from 'react-bootstrap/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { changeTable } from '../slices';
// import { spinner } from "./icons";

/*
const actionCreators = { closeModal, getTheOperation };
*/

const mapStateToProps = ({ navbarBox: { elements, selectedTab } }) => ({ elements, selectedTab });
const actionCreators = { changeTable };

const NavigationBar = (props) => {
  const { elements, selectedTab, changeTable: change } = props;
  // -----------------------TablesNav-----------------------
  const handleClickTab = (key) => (event) => {
    event.preventDefault();
    change({ type: key });
  };

  const elementsArray = Object.entries(elements);
  const NavList = () => (
    <ListGroup horizontal className="mr-auto">
      {elementsArray.map(([key, text]) => (
        <ListGroup.Item
          key={key}
          onClick={handleClickTab(key)}
          as="button"
          active={key === selectedTab}
        >
          {_.capitalize(text)}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
  // -------------------------Formik-------------------------
  const formik = useFormik({
    initialValues: {
      search: '',
    },
    // onSubmit: (values) => {

    // },
  });
  // --------------------------------------------------------
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand>Future-Group</Navbar.Brand>
      <NavList />

      <form className="d-flex pr-2" onSubmit={formik.handleSubmit}>
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
    </Navbar>
  );
};

export default connect(mapStateToProps, actionCreators)(NavigationBar);
