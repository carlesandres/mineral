import { InputHTMLAttributes } from "react";

const defaultStyles = `border-b border-transparent bg-transparent font-mono
p-2 hover:border-gray-500 form-control cursor-pointer text-base font-bold
dark:text-gray-300 print:border-none print:text-black`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const TextInput = (props: Props) => {
  const { className = defaultStyles, ...rest } = props;
  return <input type="text" className={className} {...rest} />;
};

export default TextInput;
