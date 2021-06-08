import React, {useState,useEffect} from "react";
import LoginBtn from '../LoginBtn/LoginBtn'
import LogoutBtn from '../LogoutBtn/LogoutBtn'
import { useAuth0 } from '@auth0/auth0-react';
import {Navbar, Nav} from 'react-bootstrap'
import API from '../../utils/API'
import "./Nav.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navigator() {
  const { user, isAuthenticated } = useAuth0();

  const [userData, setUserData] = useState({
    given_name: 'loading',
    family_name: 'loading',
    email: 'loading',
    sub: 'loading',
    picture: 'loading'
  })

  useEffect(() => {
    if (isAuthenticated) {
      setUserData(user)
      API.saveUser({
        firstName: userData.given_name,
        lastName: userData.family_name,
        email: userData.email,
        user_id: userData.sub,
        picture: userData.picture
      })
    }
  },[isAuthenticated, user, userData])

    return (
      <Navbar collapseOnSelect expand="sm" variant="light" bg="light">
      <Navbar.Brand href="/">Mind Managed</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/charts" className={window.location.pathname === "/charts" ? "nav-link active" : "nav-link"}>Charts</Nav.Link>
            <Nav.Link href="/journal" className={window.location.pathname === "/journal" ? "nav-link active" : "nav-link"}>Journal</Nav.Link>
            <Nav.Link href="/Medication" className={window.location.pathname === "/Medication" ? "nav-link active" : "nav-link"}>Medication</Nav.Link>
            <li className="nav-item">
              <LoginBtn name="Login" variant="outline-success"/>
            </li>
            <li className="nav-item">
              <LogoutBtn name="Logout" variant="outline-success"/>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
}

export default Navigator;

