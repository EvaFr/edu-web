import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Welcome from './pages/welcome/Welcome';
import Login from './pages/authentication/Login';
import Registration from './pages/authentication/Registration';
import Menu from './pages/menu/Menu';
import UserHeader from './components/UserHeader';

const mainPage = {
  margin: '40px'
};

const App = () => {
  return (
    <BrowserRouter>
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Mathpractice</Navbar.Brand>
          <UserHeader />
        </Navbar>
        <Container style={mainPage}>
          <Row>
            <Col xs={12} md={8}>
              <Route path="/" exact component={Welcome} />
              <Route path="/login" component={Login} />
              <Route path="/registration" component={Registration} />
              <Route path="/book/:id" component={Menu} />
            </Col>
          </Row>
        </Container>
      </>
    </BrowserRouter>
  );
};

export default App;
