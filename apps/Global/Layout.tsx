import Image from "next/image";
import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";

/*
TODOS:
1. Change Header / Logo colors to be variable. Initially set from a defined CSS color palette.
    a. Eventually make these changed by themeContext
*/

const Header = styled.div`
  background: white;
  padding: 8px 0;
  margin: 0 0 2rem;
`;

const Container = styled.div`
  max-width: 80%;
  margin: 0 auto;
  padding: 0 2 rem;
`;
const Body = styled.div`
  display: grid;
  gap: 2rem;
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header>
        <Container>
          <Navbar />
        </Container>
      </Header>

      <main>
        <Container>
          <Body>{children}</Body>
        </Container>
      </main>
    </>
  );
};

export default Layout;
