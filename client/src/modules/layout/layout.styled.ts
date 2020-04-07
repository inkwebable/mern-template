import styled from 'styled-components';

import { maxWidth } from '../../assets/styles/settings';

export const MaxWidthContainer = styled.div`
  max-width: ${maxWidth}px;
  margin: 0 auto;
`;

interface FlexContainerProps {
  align?: string;
}

export const FlexContainer = styled.div<FlexContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => align || 'start'};
  justify-content: center;
`;
