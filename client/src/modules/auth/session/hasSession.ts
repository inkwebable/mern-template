export const hasSession = (): boolean => {
  if (document.cookie.split(';').some((item) => item.trim().startsWith('_p='))) {
    console.log('has session');
    return true;
  }
  console.log('no session');
  return false;
};
