import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import Navbar from 'react-bootstrap/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import { changeTable } from '../slices/navbarSlice';

const NavigationBar = () => {
  const selectedTab = useSelector((state) => state.navbar.selectedTab);
  const elements = useSelector((state) => state.navbar.elements);
  const dispatch = useDispatch();

  const handleClickTab = (key) => (event) => {
    event.preventDefault();
    dispatch(changeTable({ type: key }));
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
  // --------------------------------------------------------
  return (
    <Navbar bg="light" variant="light" className="d-flex justify-content-between">
      <Navbar.Brand>Future-Group Tables</Navbar.Brand>
      <NavList />
    </Navbar>
  );
};

export default NavigationBar;
