import { isJsonString } from './isJsonString';

export const getMqttData = (message: Buffer): string | Record<string, unknown> | boolean | number | null => {
  const stringBuf = message.toString('utf-8');
  let convertedData = null;

  if (!isJsonString(stringBuf)) {
    convertedData = stringBuf;
  } else {
    try {
      convertedData = JSON.parse(stringBuf);
    } catch (e) {
      console.error(`Error in converting ${stringBuf} - ${e.message}`);
      convertedData = stringBuf;
    }
  }

  return convertedData;
};
