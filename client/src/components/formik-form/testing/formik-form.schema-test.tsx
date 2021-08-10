import axios from 'axios';
import dayjs from 'dayjs';
import * as Yup from 'yup';

import { afterStartDate, fieldRequired, noWhiteSpace } from '../const/validation-messages';

const getOptionsPromise = (): Promise<any> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: [
          { id: 1, name: 'Option 1' },
          { id: 2, name: 'Option 2' },
          { id: 3, name: 'Option 3' },
        ],
      });
    }, 500);
  });

// data to testing forms with fields on the same line, and schemas
export const formikFormTestSchema = Yup.object().shape({
  name: Yup.string().required(fieldRequired),
  disabled: Yup.string(),
  companyId: Yup.number().required(fieldRequired),
  outcode: Yup.string().strict(true).trim(noWhiteSpace),
  postalCode: Yup.string().required(fieldRequired).strict(true).trim(noWhiteSpace),
  num: Yup.number().required(fieldRequired),
  dateFrom: Yup.date().required(fieldRequired),
  dateTo: Yup.date()
    .when(
      'validFrom',
      (validFrom: Date, schema: any) => validFrom && schema.min(dayjs(validFrom).add(23, 'hour').toISOString(), afterStartDate),
    )
    .required(fieldRequired),
  firstName: Yup.string().required(fieldRequired),
  lastName: Yup.string().required(fieldRequired),
});

export const formikFormTestFieldArray = [
  [
    {
      id: 'name',
      labelName: 'label name',
      fieldType: 'text',
      value: '',
      labelStyle: { color: 'red', width: '20%' },
      inputStyle: { width: '20%' },
    },
  ],
  [
    {
      id: 'disabled',
      labelName: 'Disabled',
      fieldType: 'text',
      value: '',
      disabled: true,
    },
  ],
  [
    {
      id: 'companyId',
      labelName: 'Company',
      fieldType: 'select',
      value: '',
      open: false,
      options: [],
      getOptions: getOptionsPromise,
      // component: FormikMuiTextField,
      // componentProps: { select: true, name: 'companyId', label: 'Company' },
    },
  ],
  [
    {
      id: 'outcode',
      labelName: 'Outcode',
      fieldType: 'auto',
      value: '',
      open: false,
      options: [],
      optionsDataKey: 'codes',
      getOptions: async (value = 'a'): Promise<{ data: any[] }> => axios.get(`api/v1/test?query=${value}`),
    },
  ],
  [
    {
      id: 'postalCode',
      labelName: 'Post Code',
      fieldType: 'text',
      value: '',
      startAdornmentFromFieldKey: 'outcode',
    },
  ],
  [
    {
      id: 'num',
      labelName: 'label num',
      fieldType: 'number',
      value: 0,
    },
  ],
  [
    {
      id: 'dateFrom',
      labelName: 'Date From',
      fieldType: 'datePicker',
      value: new Date(),
      multiInlineFullWidth: true,
      // component: FormikMuiDatePicker,
    },
    {
      id: 'dateTo',
      labelName: 'Date To',
      fieldType: 'datePicker',
      value: new Date(),
      multiInlineFullWidth: true,
    },
  ],
  [
    {
      id: 'firstName',
      labelName: 'First Name',
      fieldType: 'text',
      value: '',
      multiInlineFullWidth: true,
      labelStyle: { color: 'green' },
      inputStyle: { color: 'red' },
      // errorStyle: { fontSize: '20px' },
      // component: FormikMuiTextField,
    },
    {
      id: 'lastName',
      labelName: 'Last Name',
      fieldType: 'text',
      value: '',
      multiInlineFullWidth: true,
      // component: FormikMuiTextField,
    },
  ],
];
