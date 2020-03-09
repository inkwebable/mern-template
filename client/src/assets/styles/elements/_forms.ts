// ========================================================================
// ELEMENTS/SELECT
// ========================================================================

import { colors, fontSizes, spacers } from '../settings';

export const forms = `
  fieldset:not(:last-of-type) {
    margin-bottom: ${spacers[3]};
    padding-bottom: ${spacers[3]};
    border-bottom: 1px solid ${colors.border};
  }

  legend {
    margin-bottom: ${spacers[2]};
    font-size: ${fontSizes.m};
    font-weight: 500;
  }
`;
