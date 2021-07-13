import { rem } from 'polished';

import { lineHeightPx } from './_typography-settings';

const spacer = lineHeightPx / 4;
const range = 8;

export const spacers = {} as { [key: number]: string };

for (let i = 1; i <= range; i++) {
  spacers[i] = rem(spacer * i);
}
