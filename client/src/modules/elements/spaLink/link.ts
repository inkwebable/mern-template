import { Link, LinkProps } from 'react-router-dom';
import styled from 'styled-components';

import { colors } from '../../../assets/styles/settings';

interface SpaLinkProps extends LinkProps {
  decoration: string;
}

export const StyledSpaLink = styled(Link)<SpaLinkProps>`
  color: ${({ color }): string => color || colors.primary};
  text-decoration: ${({ decoration }): string => decoration || 'none'};

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    color: ${({ color }): string => color || colors.primary};
    text-decoration: ${({ decoration }): string => decoration || 'none'};
  }
`;
