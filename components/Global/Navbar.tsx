import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const NavbarBrand = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavbarMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavbarMenuItem = styled.li`
  margin: 0 0.5rem;
  display: block;
  padding: 0.5rem 1rem;
  color: #000000;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const NavbarToggle = styled.button`
  display: none;
  border: 0;
  background-color: transparent;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavbarCollapse = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    background-color: #ffffff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 1;

    &.collapsed {
      display: none;
    }
  }
`;

const Navbar: React.FC = () => {
  const [isMenuCollapsed, setMenuCollapsed] = useState(true);

  const toggleMenu = () => {
    setMenuCollapsed(!isMenuCollapsed);
  };

  return (
    <Nav>
      <NavbarBrand>
        <Link href={"/"}>Next Up</Link>
      </NavbarBrand>
      <NavbarToggle onClick={toggleMenu}>&#9776;</NavbarToggle>
      <NavbarCollapse className={isMenuCollapsed ? "collapsed" : ""}>
        <NavbarMenu>
          <NavbarMenuItem>
            <Link href={"/todo"}>Todo</Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href={"/kanban"}>Kanban</Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href={"/pomodoro"}>Pomodoro</Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href={"/about"}>About</Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </NavbarCollapse>
    </Nav>
  );
};

export default Navbar;
