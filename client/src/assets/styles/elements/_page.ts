import 'typeface-roboto';

import { css } from 'styled-components';

import { colors, fontSizeDefault, lineHeightDefault } from '../settings';

export const page = () => css`
  html {
    min-height: 100%;
    color: ${colors.text};
    font-weight: 400;
    font-size: ${fontSizeDefault};
    font-family: Roboto, sans-serif;
    line-height: ${lineHeightDefault};
    background-color: ${colors.bg};
    text-size-adjust: 100%;
  }
`;
