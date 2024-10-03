import { FieldValues, useFormContext, UseFormRegister } from 'react-hook-form';

interface ICustomValidation {
  required?: boolean;
  minlength?: number;
}

interface IErrors {}

export interface IInputRootObject {
  inputLabel: string;
  inputName: string;
  customValidation: ICustomValidation;
  errors?: IErrors;
  register?: UseFormRegister<FieldValues>;
  type?: string;
}

/**
 * Input field component displays a text input in a form, with label.
 * The various properties of the input field can be determined with the props:
 * @param {ICustomValidation} [customValidation] - the validation rules to apply to the input field
 * @param {IErrors} errors - the form errors object provided by react-hook-form
 * @param {string} inputLabel - used for the display label
 * @param {string} inputName - the key of the value in the submitted data. Must be unique
 * @param {UseFormRegister<FieldValues>} register - register function from react-hook-form
 * @param {boolean} [required=true] - whether or not this field is required. default true
 * @param {string} [type='text'] - the input type. defaults to text
 */
export const InputField = ({
  customValidation,
  inputLabel,
  inputName,
}: IInputRootObject) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full">
      <label
        htmlFor={inputName}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {inputLabel}
      </label>
      <input
        id={inputName}
        type="text"
        {...register(inputName, customValidation)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
      />
      {errors[inputName] && (
        <p className="mt-1 text-sm text-red-600">
          {errors[inputName]?.message as string}
        </p>
      )}
    </div>
  );
};
