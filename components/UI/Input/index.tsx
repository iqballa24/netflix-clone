import { FormAuth } from '@/types/global';
import { useController, UseControllerProps } from 'react-hook-form';

interface InputProps {
  type: 'text' | 'email' | 'address' | 'password';
  placeholder: string;
  form: UseControllerProps<FormAuth>;
}

const Input: React.FC<InputProps> = ({ type, placeholder, form }) => {
  const { field, fieldState } = useController(form);
  
  return (
    <div className="relative">
      <input
        type={type}
        {...field}
        className="block rounded-md px-6 py-4 w-full text-md text-white bg-neutral-700 invalid:border-b-1"
        placeholder={placeholder}
        autoComplete="off"
      />
      {fieldState.error && (
        <p className="text-red-500 text-xs p-1 pt-2">{fieldState.error.message}</p>
      )}
    </div>
  );
};

export default Input;
