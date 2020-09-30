import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import _ from 'lodash';
import Navbar from 'react-bootstrap/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import LanguageControlButtons from './LanguageControlButtons';
import { changeTable } from '../slices/navbarSlice';

const getNavElements = () => ({
  home: i18n.t('navigation.buttons.home'),
  small: i18n.t('navigation.buttons.small'),
  large: i18n.t('navigation.buttons.large'),
});

const NavigationBar = () => {
  const selectedTab = useSelector((state) => state.navbar.selectedTab);
  const elements = getNavElements();
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
      <Navbar.Brand>{t('navigation.projectName')}</Navbar.Brand>
      <NavList />
      <LanguageControlButtons />
    </Navbar>
  );
};

export default NavigationBar;
