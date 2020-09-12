import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from './Navbar';
import TableBox from './TableBox';

const App = () => (
  <Container fluid>
    <Navbar />
    <Row>
      <Col>
        <TableBox />
      </Col>
    </Row>
  </Container>
);

export default App;
