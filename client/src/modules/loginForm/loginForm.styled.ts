import styled from 'styled-components';

import { colors, spacers } from '../../assets/styles/settings';

export const LoginButton = styled.button`
  float: right;
  margin-top: 20px;
  padding: 5px;
  background-color: #61dafb;
  border: 0;
  border-radius: 3px;
  cursor: pointer;
`;

export const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 325px;
  padding-top: ${spacers[3]};
  padding-bottom: ${spacers[3]};
  color: white;
  background-color: ${colors.darkBg};

  label {
    margin-right: ${spacers[3]};
  }
`;
