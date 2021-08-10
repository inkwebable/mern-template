import { Field, Form, Formik, FormikErrors, FormikTouched, FormikValues } from 'formik';
import React, { cloneElement, FunctionComponent, ReactElement, useCallback, useEffect, useState } from 'react';

import { getInitValuesFromFields } from './helpers/getInitValuesFromFields';

interface FormikFormProps {
  testId?: string;
  schema: any;
  initValues?: FormikValues;
  handleSubmit: (values: any) => Promise<any>;
  handleCancel?: () => void;
  fields: FormikFormField[][];
  cancelLabel?: string;
  saveLabel?: string;
  cancelIcon?: ReactElement;
  saveIcon?: ReactElement;
  resetOnSubmit?: boolean;
  formTitle?: string | ReactElement;
  formDescription?: string | ReactElement;
  saveButton?: ReactElement;
  cancelButton?: ReactElement;
}

export interface FormikFormField {
  id: string;
  labelName: string;
  fieldType: string;
  value: string | number | Date | null;
  placeholder?: string;
  multiInlineFullWidth?: boolean;
  multipleSelect?: boolean;
  getOptions?: () => Promise<any>;
  options?: FormikFormFieldOption[] | null;
  optionsDataKey?: string;
  SelectProps?: any;
  disabled?: boolean;
  open?: boolean;
  startAdornmentFromFieldKey?: string;
  startAdornmentValue?: string | null;
  component?: any;
  componentProps?: any;
  error?: string | string[] | any;
  touched?: boolean | any;
  inputStyle?: React.CSSProperties; // overwritten by defaultInputStyles on mobile
  labelStyle?: React.CSSProperties; // overwritten by defaultLabelStyles on mobile
  errorStyle?: React.CSSProperties; // overwritten by defaultLabelStyles on mobile
  hasMediaMatch?: boolean;
}

export interface FormikFormFieldOption {
  val: string | number;
  name: string;
}

interface FieldOption {
  [field: string]: FormikFormFieldOption[];
}

export interface LoadingOption {
  [field: string]: boolean;
}

const FormikForm: FunctionComponent<FormikFormProps> = ({
  formTitle,
  formDescription,
  testId = 'formik-form',
  schema,
  initValues,
  handleSubmit,
  handleCancel,
  fields,
  cancelLabel = 'Cancel',
  saveLabel = 'Save',
  resetOnSubmit,
  children,
  cancelButton,
  saveButton,
}): JSX.Element => {
  const [fieldOptions, setFieldOptions] = useState<FieldOption>({});
  const [loading, setLoading] = useState<LoadingOption>({});
  const matchMedia = window.matchMedia('(min-width: 500px)');
  const [mediaMatch, setMediaMatche] = useState(matchMedia.matches);
  const defaultLabelStyles = { width: '100%', marginBottom: '15px' };
  const defaultInputStyles = { width: '100%', padding: '7px' };
  const defaultButtonStyles = { padding: '8px 15px', margin: '7px' };
  const defaultErrorStyles = { width: '100%', padding: '10px 0', color: 'red', fontSize: '12px' };

  const fetchOptions = useCallback(async (item, value?: string): Promise<void> => {
    let options = item.options as FormikFormFieldOption[] | null;
    let requestOptions = null;
    try {
      setLoading({ [item.id]: true });
      const optionsData = await item.getOptions(value ? value : item.value);
      if (item.optionsDataKey) {
        requestOptions =
          optionsData && optionsData?.data[item.optionsDataKey].length > 0
            ? optionsData.data[item.optionsDataKey].map((item: any) => ({
                val: item.id,
                name: item.name,
              }))
            : [];
      } else {
        requestOptions =
          optionsData && optionsData?.data.length > 0
            ? optionsData.data.map((item: any) => ({
                val: item.id,
                name: item.name,
              }))
            : [];
      }

      if (options != null && options.length > 0 && requestOptions != null) {
        options = [...item.options, ...requestOptions];
      } else {
        options = requestOptions;
      }
      setLoading({ [item.id]: false });
      setFieldOptions((prevState) => {
        return { ...prevState, ...{ [item.id]: options } };
      });
    } catch (e) {
      setLoading({ [item.id]: false });
      setFieldOptions((prevState) => {
        return { ...prevState, ...{ [item.id]: options } };
      });
    }
  }, []);

  useEffect(() => {
    const handler = (e: MediaQueryListEvent) => setMediaMatche(e.matches);
    matchMedia.addListener(handler);
    return () => matchMedia.removeListener(handler);
  });

  useEffect(() => {
    fields.forEach((fieldObj) => {
      if (fieldObj.length > 1) {
        fieldObj.forEach((item) => {
          if (item.fieldType === 'select' && item.getOptions != null) {
            const fetchData = async (): Promise<void> => {
              await fetchOptions(item);
            };
            fetchData();
          }
        });
      } else {
        if (fieldObj[0].fieldType === 'select' && fieldObj[0].getOptions != null) {
          const fetchData = async (): Promise<void> => {
            await fetchOptions(fieldObj[0]);
          };
          fetchData();
        }
      }
    });
    // setLoading(false);
  }, [fetchOptions, fields]);

  const DateField = ({
    id,
    labelName,
    placeholder,
    disabled,
    fieldType,
    component,
    error,
    touched,
    labelStyle,
    inputStyle,
    errorStyle,
    hasMediaMatch,
  }: FormikFormField) => {
    const labelStyles = { ...defaultLabelStyles, ...labelStyle };
    const inputStyles = { ...defaultInputStyles, ...inputStyle };
    const errorStyles = { ...defaultErrorStyles, ...errorStyle };

    return (
      <>
        {component ? (
          <Field as={component} name={id} label={labelName} type={fieldType} id={id} placeholder={placeholder} disabled={disabled} />
        ) : (
          <>
            <label style={hasMediaMatch ? labelStyles : defaultLabelStyles}>{labelName}</label>
            <Field
              style={hasMediaMatch ? inputStyles : defaultInputStyles}
              name={id}
              label={labelName}
              type={fieldType}
              id={id}
              placeholder={placeholder}
              disabled={disabled}
            />
          </>
        )}
        {error && touched ? <div style={errorStyles}>{error}</div> : <span style={errorStyles}>{'\u00a0'}</span>}
      </>
    );
  };

  const TextOrNumberField = ({
    id,
    labelName,
    placeholder,
    disabled,
    fieldType,
    component,
    error,
    touched,
    labelStyle,
    inputStyle,
    errorStyle,
    hasMediaMatch,
  }: FormikFormField) => {
    const labelStyles = { ...defaultLabelStyles, ...labelStyle };
    const inputStyles = { ...defaultInputStyles, ...inputStyle };
    const errorStyles = { ...defaultErrorStyles, ...errorStyle };

    return (
      <>
        {component ? (
          <Field as={component} label={labelName} name={id} type={fieldType} id={id} placeholder={placeholder} disabled={disabled} />
        ) : (
          <>
            <label style={hasMediaMatch ? labelStyles : defaultLabelStyles}>{labelName}</label>
            <Field
              style={hasMediaMatch ? inputStyles : defaultInputStyles}
              label={labelName}
              name={id}
              type={fieldType}
              id={id}
              placeholder={placeholder}
              disabled={disabled}
            />
          </>
        )}
        {error && touched ? <div style={errorStyles}>{error}</div> : <div style={errorStyles}>{'\u00a0'}</div>}
      </>
    );
  };

  const SelectField = ({
    id,
    labelName,
    placeholder,
    disabled,
    options,
    component,
    componentProps,
    error,
    touched,
    labelStyle,
    inputStyle,
    errorStyle,
    hasMediaMatch,
  }: FormikFormField) => {
    const Component = component;
    const labelStyles = { ...defaultLabelStyles, ...labelStyle };
    const inputStyles = { ...defaultInputStyles, ...inputStyle };
    const errorStyles = { ...defaultErrorStyles, ...errorStyle };

    return (
      <>
        {component ? (
          <>
            <Component
              {...componentProps}
              name={id}
              label={labelName}
              id={id}
              placeholder={placeholder}
              disabled={disabled}
              options={options}
            >
              {options &&
                options.map((option) => (
                  <option key={option.name} value={option.val}>
                    {option.name}
                  </option>
                ))}
            </Component>
            {error && touched ? <div style={defaultErrorStyles}>{error}</div> : null}
          </>
        ) : (
          <>
            <label style={hasMediaMatch ? labelStyles : defaultLabelStyles} htmlFor={labelName}>
              {labelName}
            </label>
            <Field
              style={hasMediaMatch ? inputStyles : defaultInputStyles}
              as="select"
              name={id}
              label={labelName}
              id={id}
              placeholder={placeholder}
              disabled={disabled}
            >
              <option key="default" value="" disabled>
                Please select an option...
              </option>
              {options &&
                options.map((option) => (
                  <option key={option.val} value={option.val}>
                    {option.name}
                  </option>
                ))}
            </Field>
            {error && touched ? <div style={defaultErrorStyles}>{error}</div> : null}
          </>
        )}
        {error && touched ? <div style={errorStyles}>{error}</div> : <span style={errorStyles}>{'\u00a0'}</span>}
      </>
    );
  };

  const inlineFields = (
    data: FormikFormField[],
    isSubmitting: boolean,
    errors: FormikErrors<FormikValues>,
    touched: FormikTouched<FormikValues>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
  ) => {
    return (
      <>
        {data.map((fieldObj, index) => (
          <div
            key={fieldObj.id}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              paddingRight: !mediaMatch || index === data.length - 1 ? 0 : '20px',
              maxWidth: !mediaMatch ? '100%' : `${100 / data.length}%`,
              flexBasis: !mediaMatch ? '100%' : `${100 / data.length}%`,
            }}
          >
            {fieldObj.fieldType === 'datePicker' && (
              <DateField
                fieldType="date"
                id={fieldObj.id}
                labelName={fieldObj.labelName}
                value={fieldObj.value}
                component={fieldObj?.component}
                componentProps={fieldObj?.componentProps}
                error={errors[fieldObj.id]}
                touched={touched[fieldObj.id]}
                labelStyle={fieldObj.labelStyle}
                inputStyle={fieldObj.inputStyle}
                errorStyle={fieldObj.errorStyle}
                hasMediaMatch={mediaMatch}
              />
            )}
            {fieldObj.fieldType === 'select' && (
              <>
                {loading[fieldObj.id] ? (
                  <div style={{ width: '100%' }}>Loading Skeleton</div>
                ) : (
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <SelectField
                      id={fieldObj.id}
                      fieldType={fieldObj.fieldType}
                      value={fieldObj.value}
                      labelName={fieldObj.labelName}
                      placeholder={fieldObj.placeholder}
                      disabled={fieldObj?.disabled || isSubmitting}
                      options={fieldOptions[fieldObj.id]}
                      component={fieldObj?.component}
                      componentProps={fieldObj?.componentProps}
                      error={errors[fieldObj.id]}
                      touched={touched[fieldObj.id]}
                      labelStyle={fieldObj.labelStyle}
                      inputStyle={fieldObj.inputStyle}
                      errorStyle={fieldObj.errorStyle}
                      hasMediaMatch={mediaMatch}
                    />
                  </div>
                )}
              </>
            )}
            {(fieldObj.fieldType === 'text' || fieldObj.fieldType === 'number') && (
              <TextOrNumberField
                id={fieldObj.id}
                value={fieldObj.value}
                labelName={fieldObj.labelName}
                fieldType={fieldObj.fieldType}
                placeholder={fieldObj.placeholder}
                disabled={fieldObj?.disabled || isSubmitting}
                component={fieldObj?.component}
                componentProps={fieldObj?.componentProps}
                error={errors[fieldObj.id]}
                touched={touched[fieldObj.id]}
                labelStyle={fieldObj.labelStyle}
                inputStyle={fieldObj.inputStyle}
                errorStyle={fieldObj.errorStyle}
                hasMediaMatch={mediaMatch}
              />
            )}
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={getInitValuesFromFields(fields, initValues)}
        onSubmit={(values: FormikValues, actions) => {
          actions.setSubmitting(true);
          handleSubmit(values).then((successful: boolean) => {
            actions.setSubmitting(false);
            if (successful || resetOnSubmit) {
              actions.resetForm();
            }
          });
        }}
      >
        {({ isSubmitting, submitForm, errors, dirty, touched, setFieldValue, values }) => (
          <Form data-testid={testId}>
            {formTitle && typeof formTitle === 'string' ? <h2>{formTitle}</h2> : formTitle}
            {formDescription && typeof formDescription === 'string' ? <p>{formDescription}</p> : formDescription}
            {fields &&
              fields.map((fieldObj, index) => (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: mediaMatch ? 'baseline' : 'flex-start',
                    flexWrap: 'wrap',
                    flexDirection: mediaMatch ? 'row' : 'column',
                  }}
                  key={fieldObj[0].id}
                >
                  {fieldObj.length > 1 ? (
                    inlineFields(fieldObj, isSubmitting, errors, touched, setFieldValue)
                  ) : (
                    <>
                      {fieldObj[0].fieldType === 'datePicker' && (
                        <DateField
                          fieldType="date"
                          id={fieldObj[0].id}
                          labelName={fieldObj[0].labelName}
                          value={fieldObj[0].value}
                          component={fieldObj[0]?.component}
                          componentProps={fieldObj[0]?.componentProps}
                          error={errors[fieldObj[0].id]}
                          touched={touched[fieldObj[0].id]}
                          labelStyle={fieldObj[0].labelStyle}
                          inputStyle={fieldObj[0].inputStyle}
                          errorStyle={fieldObj[0].errorStyle}
                          hasMediaMatch={mediaMatch}
                        />
                      )}
                      {fieldObj[0].fieldType === 'select' && (
                        <>
                          {loading[fieldObj[0].id] ? (
                            <div style={{ width: '100%' }}>Loading Skeleton</div>
                          ) : (
                            <SelectField
                              id={fieldObj[0].id}
                              fieldType={fieldObj[0].fieldType}
                              value={fieldObj[0].value}
                              labelName={fieldObj[0].labelName}
                              placeholder={fieldObj[0].placeholder}
                              disabled={fieldObj[0]?.disabled || isSubmitting}
                              options={fieldOptions[fieldObj[0].id]}
                              component={fieldObj[0]?.component}
                              componentProps={fieldObj[0]?.componentProps}
                              error={errors[fieldObj[0].id]}
                              touched={touched[fieldObj[0].id]}
                              labelStyle={fieldObj[0].labelStyle}
                              inputStyle={fieldObj[0].inputStyle}
                              errorStyle={fieldObj[0].errorStyle}
                              hasMediaMatch={mediaMatch}
                            />
                          )}
                        </>
                      )}
                      {(fieldObj[0].fieldType === 'text' ||
                        fieldObj[0].fieldType === 'number' ||
                        fieldObj[0].fieldType === 'password' ||
                        fieldObj[0].fieldType === 'email') && (
                        <>
                          <TextOrNumberField
                            id={fieldObj[0].id}
                            value={fieldObj[0].value}
                            labelName={fieldObj[0].labelName}
                            fieldType={fieldObj[0].fieldType}
                            placeholder={fieldObj[0].placeholder}
                            disabled={fieldObj[0]?.disabled || isSubmitting}
                            component={fieldObj[0]?.component}
                            componentProps={fieldObj[0]?.componentProps}
                            error={errors[fieldObj[0].id]}
                            touched={touched[fieldObj[0].id]}
                            labelStyle={fieldObj[0].labelStyle}
                            inputStyle={fieldObj[0].inputStyle}
                            errorStyle={fieldObj[0].errorStyle}
                            hasMediaMatch={mediaMatch}
                          />
                        </>
                      )}
                    </>
                  )}
                </div>
              ))}
            {children}
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '10px' }}>
              {saveButton ? (
                cloneElement(saveButton, {
                  onClick: submitForm,
                  'aria-label': 'save',
                  disabled:
                    isSubmitting || Object.values(loading).filter((item) => item).length > 0 || !dirty || Object.keys(errors).length > 0,
                })
              ) : (
                <button
                  style={{ ...defaultButtonStyles, ...{ marginLeft: 0 } }}
                  aria-label="save"
                  disabled={
                    isSubmitting || Object.values(loading).filter((item) => item).length > 0 || !dirty || Object.keys(errors).length > 0
                  }
                  onClick={submitForm}
                >
                  {saveLabel}
                </button>
              )}
              {handleCancel && (
                <>
                  {cancelButton ? (
                    cloneElement(cancelButton, {
                      onClick: handleCancel,
                      'aria-label': 'cancel',
                      disabled: isSubmitting || Object.values(loading).filter((item) => item).length > 0,
                    })
                  ) : (
                    <button
                      style={defaultButtonStyles}
                      aria-label="cancel"
                      disabled={isSubmitting || Object.values(loading).filter((item) => item).length > 0}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCancel();
                      }}
                    >
                      {cancelLabel}
                    </button>
                  )}
                </>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormikForm;
