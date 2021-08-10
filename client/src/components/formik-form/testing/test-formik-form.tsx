import React, { FunctionComponent } from 'react';

import FormikForm from '../formik-form';
import { formikFormTestFieldArray, formikFormTestSchema } from './formik-form.schema-test';

const TestFormikForm: FunctionComponent = (): JSX.Element => {
  const handleSubmit = async (data: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // eslint-disable-next-line no-console
        console.log('handleSubmitValuess', data);
        // return bool to the form so it can reset the form or not
        return resolve(false);
      }, 5000);
    });
  };

  const handleCancel = async (): Promise<any> => {
    // eslint-disable-next-line no-console
    console.log('handleCancel');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '600px', padding: '20px' }}>
        <FormikForm
          formTitle={<p>Add a company by filling in the form below.</p>}
          formDescription="This is the form description"
          schema={formikFormTestSchema}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          fields={formikFormTestFieldArray}
          initValues={{
            postalCode: 'ABC',
          }}
          // saveButton={<PrimaryButton>Save</PrimaryButton>}
          // cancelButton={<DangerButton>Cancel</DangerButton>}
        />
      </div>
    </div>
  );
};

export default TestFormikForm;
