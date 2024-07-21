import { Popover, Transition } from '@headlessui/react';

interface Props {
  show: boolean;
  text?: string;
  disabled: boolean;
  className?: string;
}

const Tooltip = (props: Props) => {
  const { show, text = '', className = '' } = props;

  const contentClass = text.trim() ? '' : 'text-gray-400 dark:text-gray-400';
  const renderedText = text.trim() || '(no content)';

  return (
    <Popover className={`absolute ${className}`}>
      <Transition
        show={show}
        enter="transition duration-300 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-100 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel static className="">
          <div
            className={`relative top-px left-1/2 -ml-2 h-0
              w-0
              border-r-8 border-l-8
              border-b-8
              border-r-transparent
              border-l-transparent
              border-b-gray-100 dark:border-b-gray-600`}
          ></div>
          <div
            className={`w-max max-w-xs
              rounded border border-gray-500 bg-gray-100
              p-2 font-mono text-xs text-gray-900
              dark:bg-gray-600 dark:text-gray-100`}
          >
            <p className={`line-clamp-3 m-2 ${contentClass}`}>{renderedText}</p>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Tooltip;
