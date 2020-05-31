import styled from 'styled-components';

import { colors, fontSizes, rem, spacers } from '../../../assets/styles/settings';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: ${rem(360)};
  padding: ${spacers[3]};
  color: white;
  background-color: ${colors.darkBg};

  form {
    width: 100%;
  }

  label {
    flex: 1 1 auto;
    margin-right: ${spacers[3]};
    font-size: ${fontSizes.m};
    width: 160px;
  }

  input {
    width: 100%;
    padding: ${rem(3)};
    font-size: ${fontSizes.m};
  }

  span {
    color: ${colors.error};
    font-size: ${fontSizes.t};
  }
`;

interface FormGroupProps {
  direction?: string;
}

export const FormGroup = styled.div<FormGroupProps>`
  display: flex;
  flex-direction: ${({ direction }): string => direction || 'row'};
  margin: ${spacers[4]} 0;
  text-align: left;
`;
