import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<any> {
  loading: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  ...props
}) => {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <button
      {...props}
      className={`bg-indigo-500 text-white w-40 h-10 flex items-center justify-around font-bold border border-solid border-transparent rounded-2xl cursor-pointer py-3 px-4 text-sm ${
        loading ? '' : 'cursor-pointer'
      }s`}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};
