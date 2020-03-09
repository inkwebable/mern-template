import styled from 'styled-components';

export const AppContainerHeader = styled.header`
  padding-top: 10px;
  padding-bottom: 20px;
  background-color: #282c34;
  display: flex;
  min-height: 10vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(5px + 2vmin);
  color: white;
`;

export const AppTitle = styled.h1`
  font-size: 1.5em;
`;

export const AppLink = styled.a`
  color: #61dafb;
`;

export const AppLogo = styled.img`
  height: 20vmin;
  pointer-events: none;
  animation: App-logo-spin infinite 20s linear;
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
