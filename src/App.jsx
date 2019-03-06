import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Welcome from './pages/welcome/Welcome';
import Login from './pages/authentication/Login';
import Registration from './pages/authentication/Registration';
import Menu from './pages/menu/Menu';

const mainPage = {
  margin: '40px'
};

const App = () => {
  return (
    <BrowserRouter>
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Mathpractice</Navbar.Brand>
          <Nav className="ml-auto">
            <NavLink to="/" className="nav-link">
              Login as Guest
            </NavLink>
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
            <NavLink to="/registration" className="nav-link">
              Register
            </NavLink>
          </Nav>
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
