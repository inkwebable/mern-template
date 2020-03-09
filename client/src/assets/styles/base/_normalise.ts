// ========================================================================
// BASE/NORMALISE
// ========================================================================

export const normalise = `
  h1,
  h2,
  h3,
  h4 {
    font-size: inherit;
    font-weight: inherit;
  }

  ol,
  ul {
    list-style: none;
  }

  small {
    font-size: 87.5%;
    normal;
  }

  strong {
    font-weight: 500;
  }

  fieldset {
    border: 0;
  }

  legend {
    color: inherit;
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
    color: inherit;

    &:focus {
      outline: none;
    }
  }

  [hidden] {
    display: none;
  }

  // Set display to block for IE

  main {
    display: block;
  }
`;
