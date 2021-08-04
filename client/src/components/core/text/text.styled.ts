import { rem } from 'polished';
import styled from 'styled-components';

import { colors } from '../../../assets/styles/settings';

interface TextProps {
  color?: string;
  size?: string;
  marginTop?: string;
  marginBottom?: string;
}

export const StyledText = styled.p<TextProps>`
  margin-top: ${({ marginTop }): string => marginTop || rem(4)};
  margin-bottom: ${({ marginBottom }): string => marginBottom || rem(8)};
  color: ${({ color }): string => color || colors.textDark};
  font-size: ${({ size }): string => size || 'inherit'};
`;
