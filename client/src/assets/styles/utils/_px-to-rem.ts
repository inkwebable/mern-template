import { fontSizePx } from '../settings';

export const rem = (pxSize: number) => {
  const remSize = pxSize / fontSizePx;

  return `${remSize}rem`;
};
