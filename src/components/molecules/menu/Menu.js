import React, { useEffect, useRef } from 'react';
import NavLink from '../../atoms/link/NavLink';
import { HOME, PRODUCTS, SIGNIN, REGISTER } from '../../../constants/header';
import List from '../../atoms/list/List';
import Button from '../../atoms/button/Button';
import useWindowSize from '../../../utils/windowResize'; 
import './menu.scss';

export default function Menu(props) {
  const {id, hideMenu} = props;
  const menuRef = useRef(null);
  const [winWidth, winHeight] = useWindowSize();
  const checkFocus = (e) => {
    if (e.keyCode === 9) {
      handleFocus(e);
    }
  }

  const handleFocus = (e) => {
    if (winWidth < 1024) {
      if (e) {
        e.preventDefault();
      }
      menuRef.current.focus();
    }
  }

  useEffect(() => {
    handleFocus();
  }, []);

  return (
    <nav id={id} className="menu">
      <Button onClick={hideMenu} className="menu__close" ref={menuRef}>
        &times;
      </Button>
      <List
        childNodes={
          [
            <NavLink to="/" onClick={hideMenu}>{HOME}</NavLink>,
            <NavLink to="/plp/all" onClick={hideMenu}>{PRODUCTS}</NavLink>,
            <NavLink to="/login" onClick={hideMenu}>{SIGNIN}</NavLink>,
            <NavLink to="/registration" onClick={hideMenu} onKeyDown={checkFocus}>{REGISTER}</NavLink>
          ]
        }
        className="menu__content"
      />
    </nav>
  )
}