import { createGlobalStyle } from 'styled-components';

import { boxSizing, normalise, reset } from './base';
import { forms, images, page, tables, typography } from './elements';

export const GlobalStyles = createGlobalStyle`
  ${boxSizing}
  ${reset}
  ${normalise}
  ${images}
  ${tables}
  ${forms}
  ${page}
  ${typography}
`;
