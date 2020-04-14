import prodKeys from './prod';

function keys() {
  // node env will be undefined by default
  if (process.env.NODE_ENV === 'production') {
    return prodKeys;
  }

  return require('./dev').default;
}

export default keys();
