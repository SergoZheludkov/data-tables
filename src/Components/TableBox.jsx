import React from 'react';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { errorsSelector } from '../selectors';
import Pagination from './Pagination';
import PageSizeButtons from './PageSizeButtons';
import AddEntryControlBox from './AddEntryControl';
import AddEntryForm from './AddEntryForm';
import SortedControlBox from './SortedControl';
import EmptyInfoBox from './EmptyInfoBox';
import Search from './Search';
import HomePage from './HomePage';
import TableHeader from './TableHeader';
import TableRows from './TableRows';
import Loading from './Loading';
import Alert from './Alert';

const TableControlBox = () => (
  <div className="d-flex border-right border-left">
    <Search />
    <PageSizeButtons />
    <AddEntryControlBox />
  </div>
);
const getDownloadingStatus = (type) => (state) => state.data.statuses[type];
const TheTable = () => {
  const currentTab = useSelector((state) => state.navbar.selectedTab);
  const downloadingStatus = useSelector((state) => (getDownloadingStatus(currentTab)(state)));
  const addEntryFormStatus = useSelector((state) => state.addEntryСontrol.status);
  const error = useSelector((state) => errorsSelector(state.navbar.selectedTab)(state));

  if (error) return <Alert />;
  if (downloadingStatus !== 'success') return <Loading />;
  return (
    <>
      <SortedControlBox />
      <TableControlBox />
      { addEntryFormStatus === 'opened' && <AddEntryForm />}
      <Pagination />
      <Table striped bordered hover size="sm" className="m-0">
        <thead>
          <tr>
            <TableHeader />
          </tr>
        </thead>
        <tbody>
          <TableRows />
        </tbody>
      </Table>
      <Pagination />
      <EmptyInfoBox />
    </>
  );
};

const TableBox = () => {
  const currentTab = useSelector((state) => state.navbar.selectedTab);
  return (
    <div>
      {currentTab === 'home' && <HomePage />}
      {currentTab !== 'home' && <TheTable />}
    </div>
  );
};

export default TableBox;
