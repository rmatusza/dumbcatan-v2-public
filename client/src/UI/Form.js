import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Button from './Button';
import { CUSTOM_STYLES, ERROR_CONTEXTS } from '../Utils/data';

const Form = ({
  fields = [],
  formSubmitHandler,
  styles = {},
  buttons = [],
  currentContext,
  formInstructions
}) => {

  const [topLevelFormError, setTopLevelFormError] = useState(null);
  const applicationError = useSelector(state => state.applicationErrors);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /// what is this?
  // const [formValues, setFormValues] = useState(
  //   fields.reduce((acc, field) => {
  //     acc[field.name] = initialValues[field.name] || '';
  //     return acc;
  //   }, {})
  // );

  const onSubmit = async (data) => {
    formSubmitHandler(data);
  };

  return (
    <>
      {
        applicationError.context === currentContext 
        && 
        <p className={CUSTOM_STYLES.largeErrorMessage}>
          {applicationError.message}
        </p>
      }
      {
        (!applicationError.message || applicationError.context !== currentContext) && topLevelFormError
        &&
        <div className='rounded-xl bg-cream/60 mb-5'>
          <p className={`${CUSTOM_STYLES.largeErrorMessage} text-center`}>
            {topLevelFormError}
          </p>
        </div>
      }
      {
        !topLevelFormError && (!applicationError.message || applicationError.context !== currentContext) && formInstructions
        &&
        <p className={`${CUSTOM_STYLES.modalTextYellow} text-center underline mb-5 text-3xl`}>
          {formInstructions}
        </p>
      }

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form || "flex flex-col space-y-4"}>
        {fields.map((field) => (
          <label key={field.labelKey} className={styles.label || "block"}>
            <h3 className={styles.fieldHeading || "mb-1 font-medium"}>{field.headingName}</h3>
            <input
              {...register(field.inputName, typeof field.getValidation === "function" ? field.getValidation(getValues, setTopLevelFormError) : field.validation)}
              type={field.type || 'text'}
              placeholder={field.placeholder}
              className={styles.input || "w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"}
            />
            {
              errors[field.inputName] 
              && 
              <div className='flex justify-center'>
                <span className={styles.validationError || "text-red-500 text-sm"}>{errors[field.inputName]?.message}</span>
              </div>
            }
          </label>
        ))}
        <div className="flex-1 flex flex-col justify-end">
          <div className={`flex flex-row justify-between gap-4 ${styles.buttonContainer}`}>
            {
              buttons.map((button) => {
                return (
                  <Button
                    type={button.type}
                    name={button.name}
                    replacementStyle={button.replacementStyle}
                    styleAddOns={button.styleAddOns}
                    customCSS={button.customCSS}
                    namedStyles={button.namedStyles}
                    namedStyleAsAddOn={button.namedStyleAsAddOn}
                    callBack={button.callBack}
                    args={button.args}
                  />
                )
              })
            }
          </div>
        </div>
      </form>
    </>
  );
}

export default Form;