import React from 'react';
import { Header } from '../components/Netflix';
import * as ROUTES from '../constants/routes';
import logo from '../images/netflix.svg';

export function HeaderContainer({ children }) {
  return (
    <Header bg={'#000'}>
      <Header.Frame>
        <Header.Logo to={ROUTES.HOME} src={logo} alt="Netflix" />
        <Header.ButtonLink to={ROUTES.SIGN_IN}>Sign In</Header.ButtonLink>
      </Header.Frame>
      {children}
    </Header>
  );
}