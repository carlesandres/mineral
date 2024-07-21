import { RadioGroup } from '@headlessui/react';

interface HorzRadioGroupProps {
  onChange: (arg0: any) => void;
  options: Map<string, string>;
  selectedOption: string;
  label: string;
}

const HorzRadioGroup = (props: HorzRadioGroupProps) => {
  const { label, options, onChange, selectedOption } = props;

  const optionClassName = `p-2 rounded-sm bg-gray-200 dark:bg-gray-700
    cursor-pointer transition`;

  const renderedOptions = [...options].map(([optionName, value]) => (
    <RadioGroup.Option key={optionName} value={value}>
      {({ checked }) => (
        <span
          className={`${optionClassName} ${
            checked
              ? '!bg-blue-200 dark:!bg-blue-800'
              : 'hover:bg-gray-300 hover:dark:bg-gray-600'
          }`}
        >
          {optionName}
        </span>
      )}
    </RadioGroup.Option>
  ));

  return (
    <RadioGroup
      className="my-4 flex items-center space-x-4"
      value={selectedOption}
      onChange={onChange}
    >
      <RadioGroup.Label>{label}</RadioGroup.Label>
      {renderedOptions}
    </RadioGroup>
  );
};

export default HorzRadioGroup;
