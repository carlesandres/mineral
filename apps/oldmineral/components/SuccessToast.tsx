import { HiOutlineCheckCircle } from 'react-icons/hi2';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const SuccessToast = (props: Props) => {
  return (
    <div
      className="flex items-center space-x-2 text-[var(---success-color)]"
      {...props}
    >
      <HiOutlineCheckCircle className="h-5 w-5 " />
      <p className="text-sm">{props.children}</p>
    </div>
  );
};

export default SuccessToast;
