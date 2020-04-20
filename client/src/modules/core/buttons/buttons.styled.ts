import { darken } from 'polished';
import styled from 'styled-components';

import { colors, fontSizes, spacers } from '../../../assets/styles/settings';

export const StyledFloatButton = styled.button`
  float: right;
  margin-top: 20px;
  padding: ${spacers[2]} ${spacers[4]};
  font-size: ${fontSizes.m};
  background-color: ${colors.primary};
  border: 0;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: ${darken(0.1, colors.primary)};
  }
`;
