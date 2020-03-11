import { darken, lighten } from 'polished';
import styled from 'styled-components';

import { colors, fontSizes, spacers } from '../../assets/styles/settings';

export const LoginButton = styled.button`
  float: right;
  margin-top: 20px;
  padding: ${spacers[2]} ${spacers[4]};
  background-color: ${colors.primary};
  border: 0;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: ${darken(0.1, colors.primary)};
  }
`;

export const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 400px;
  padding-top: ${spacers[3]};
  padding-bottom: ${spacers[3]};
  color: white;
  background-color: ${colors.darkBg};

  label {
    flex: 1 1 auto;
    margin-right: ${spacers[3]};
    font-size: ${fontSizes.m};
  }

  input {
    font-size: ${fontSizes.m};
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  margin: ${spacers[5]} 0;
  text-align: left;
`;
