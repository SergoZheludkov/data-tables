import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
// import cn from 'classnames';
import Navbar from 'react-bootstrap/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import { changeTable } from '../slices';
// import { spinner } from "./icons";

const mapStateToProps = ({ navbarBox: { elements, selectedTab } }) => ({ elements, selectedTab });
const actionCreators = { changeTable };

const NavigationBar = (props) => {
  const { elements, selectedTab, changeTable: change } = props;

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
  // --------------------------------------------------------
  return (
    <Navbar bg="light" variant="light" className="d-flex justify-content-between">
      <Navbar.Brand>Future-Group Tables</Navbar.Brand>
      <NavList />
    </Navbar>
  );
};

export default connect(mapStateToProps, actionCreators)(NavigationBar);
