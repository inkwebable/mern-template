import { FormikValues } from 'formik';

import { FormikFormField } from '../formik-form';

export const getInitValuesFromFields = (fields: FormikFormField[][], init: FormikValues = {}): FormikValues => {
  const values = {} as FormikValues;

  fields.forEach((fieldObj) => {
    if (fieldObj.length > 1) {
      fieldObj.forEach((item, index) => {
        values[item.id] = init[item.id] == null ? item.value : init[item.id];
      });
    } else {
      values[fieldObj[0].id] = init[fieldObj[0].id] == null ? fieldObj[0].value : init[fieldObj[0].id];
    }
  });

  return values;
};
