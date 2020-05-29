import styled from 'styled-components';
import { colors, fontSizes } from '../../assets/styles/settings';

export const LogoutButtonLink = styled.button`
  padding: 0;
  font-size: ${fontSizes.l};
  color: ${colors.primary};
  text-decoration: underline;
  background: none;
  border: none;
  cursor: pointer;
`;
