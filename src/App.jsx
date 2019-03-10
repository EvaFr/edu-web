import React, { useState } from 'react';
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
  const [sessionId, setSessionId] = useState(null);
  const [userName, setUserName] = useState('');

  return (
    <BrowserRouter>
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Mathpractice</Navbar.Brand>
          <UserHeader
            sessionId={sessionId}
            setSessionId={setSessionId}
            userName={userName}
            setUserName={setUserName}
          />
        </Navbar>
        <Container style={mainPage}>
          <Row>
            <Col xs={12} md={8}>
              <Route path="/" exact component={Welcome} />
              <Route
                path="/login"
                render={() => (
                  <Login
                    setSessionId={setSessionId}
                    userName={userName}
                    setUserName={setUserName}
                  />
                )}
              />
              <Route
                path="/registration"
                render={() => <Registration setSessionId={setSessionId} />}
              />
              <Route
                path="/book/:id"
                render={routerProps => (
                  <Menu {...routerProps} sessionId={sessionId} />
                )}
              />
            </Col>
          </Row>
        </Container>
      </>
    </BrowserRouter>
  );
};

export default App;
