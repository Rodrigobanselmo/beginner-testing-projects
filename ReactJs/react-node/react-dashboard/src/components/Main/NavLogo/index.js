import React from 'react';
import { NavLogoSC } from './Logo';

export const NavLogo = (props) => {

  return (
            <NavLogoSC small={props.small} /* onClick={props.onClick} */ to={props.to} home={props.home} >
              Simple<span>SST</span>
            </NavLogoSC>
  );
}