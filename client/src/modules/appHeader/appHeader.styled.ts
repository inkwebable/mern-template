import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { colors, fontSizes } from '../../assets/styles/settings';

export const AppContainerHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 10vh;
  padding-top: 10px;
  padding-bottom: 20px;
  color: white;
  //font-size: calc(5px + 2vmin);
  font-size: calc(2vmin);
  background-color: #282c34;
`;

export const AppTitle = styled.h1`
  font-size: ${fontSizes.xxl};

  a {
    color: white;

    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
      color: ${colors.white};
      text-decoration: none;
    }
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const AppLink = styled.a`
  color: #61dafb;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    color: ${colors.primary};
  }
`;

export const AppLogo = styled.img`
  height: 14vmin;
  animation: App-logo-spin infinite 20s linear;
  pointer-events: none;
  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @media (prefers-reduced-motion: no-preference) {
    animation: App-logo-spin infinite 20s linear;
  }
`;
