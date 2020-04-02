export const hasSession = (): boolean => {
  const valid = sessionStorage.getItem('session');

  return !!(valid && valid.length);
};
