export const hasSession = (): boolean => {
  return document.cookie.split(';').some((item) => item.trim().startsWith('_p='));
};
