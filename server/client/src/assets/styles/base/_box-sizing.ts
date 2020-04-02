// More sensible default box-sizing:
// @see css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice
export const boxSizing = `
  html {
    box-sizing: border-box;
  }

  * {
    &,
    &::before,
    &::after {
      box-sizing: inherit;
    }
  }
`;
