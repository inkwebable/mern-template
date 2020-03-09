// ========================================================================
// ELEMENTS/IMAGES
// ========================================================================

// max-width - Set for responsive purpose
// vertical-align - Set to remove the whitespace that appears underneath
// border-styles - Set to remove and border styles

export const images = `
  img {
    max-width: 100%;
    border-style: none;
    font-style: italic;
  }

  img[width],
  img[height] {
    max-width: none;
  }

  img[alt=''],
  img:not([alt]) {
    border: 5px dashed #c00;
  }
`;
