// Imports
import {
  SubmitHandler,
  useForm,
  useFormContext,
  FormProvider,
} from 'react-hook-form';

// Components
import { InputField } from '@/components/Input/InputField.component';
import Button from '../UI/Button.component';

// Constants
import { INPUT_FIELDS } from '@/utils/constants/INPUT_FIELDS';
import { ICheckoutDataProps } from '@/utils/functions/functions';

interface IBillingProps {
  handleFormSubmit: SubmitHandler<ICheckoutDataProps>;
}

const OrderButton = () => {
  const { register } = useFormContext();

  return (
    <div className="w-full mt-6">
      <input
        placeholder="paymentMethod"
        type="hidden"
        value="cod"
        checked
        {...register('paymentMethod')}
      />
      <Button fullWidth>ORDER</Button>
    </div>
  );
};

const Billing = ({ handleFormSubmit }: IBillingProps) => {
  const methods = useForm<ICheckoutDataProps>();

  return (
    <section className="w-full max-w-2xl mx-auto">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleFormSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
            {INPUT_FIELDS.map(({ id, label, name, customValidation }) => (
              <InputField
                key={id}
                inputLabel={label}
                inputName={name}
                customValidation={customValidation}
              />
            ))}
          </div>
          <OrderButton />
        </form>
      </FormProvider>
    </section>
  );
};

export default Billing;
