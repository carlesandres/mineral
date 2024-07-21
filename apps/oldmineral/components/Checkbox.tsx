import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox = (props: Props) => {
  const { name, label, checked, onChange } = props;

  return (
    <div
      className="row flex cursor-pointer items-center
        space-x-4 py-4 hover:text-gray-900 dark:hover:text-gray-300"
    >
      <input
        className="cursor-pointer"
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label className="cursor-pointer" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
