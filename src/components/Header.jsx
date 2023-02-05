import React, { memo, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavbarText,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Header.module.scss";
import logo from "../assets/images/disney-hotstar-logo-dark.svg";

const Header = ({ openLogin }) => {
  const { user } = useSelector((state) => state);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
  };

  return (
    <Navbar
      color="dark"
      dark
      expand="md"
      className={`${styles.header} w-100 px-5`}
    >
      <NavLink to="/" className="mr-3">
        <img alt="Disney+" src={logo} className="pb-2"/>
      </NavLink>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
                <NavLink to="/add-movie">Movies</NavLink>
              </NavItem>
          <NavItem>
              <NavLink to="/category">Category</NavLink>
            </NavItem>
        </Nav>
        <NavbarText>
          {user ? (
            <button
              type="button"
              className="btn btn-primary custom-primary font-size-14 px-4"
              style={{ fontSize: "14px" }}
              onClick={logout}
            >
              LOGOUT
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary custom-primary font-size-14 px-4"
              style={{ fontSize: "14px" }}
              onClick={openLogin}
            >
              LOGIN
            </button>
          )}
        </NavbarText>
      </Collapse>
    </Navbar>
  );
};

export default memo(Header);
