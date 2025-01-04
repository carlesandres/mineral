import { Checkbox } from 'components/ui/checkbox';

type CheckboxProps =
  typeof Checkbox extends React.ComponentType<infer P> ? P : never;

interface Props extends CheckboxProps {
  label: string;
}

const SettingsCheckbox = (props: Props) => {
  const { label, ...rest } = props;

  return (
    <div className="row flex cursor-pointer items-center space-x-4 py-4 hover:text-gray-900 dark:hover:text-gray-300">
      <Checkbox {...rest} id={label} />
      <label className="cursor-pointer" htmlFor={label}>
        {label}
      </label>
    </div>
  );
};

export default SettingsCheckbox;
