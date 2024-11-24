export interface ShortcutDescriptionProps {
  keys: string[];
  description: string;
  onClick: (key: string) => void;
}

const ShortcutDescription = (props: ShortcutDescriptionProps) => {
  const { keys, description } = props;

  const renderedKeys = keys.map((k) => {
    return (
      <kbd
        key={k}
        className={`inline-flex h-full w-12 justify-center rounded-sm bg-purple-200
        p-1 text-center dark:bg-purple-700`}
      >
        {k}
      </kbd>
    );
  });

  return (
    <li
      className={`kb-sh-wrapper flex flex-1 cursor-pointer items-center
space-x-2 overflow-hidden rounded border border-[var(--border-color)]
hover:opacity-80
`}
      onClick={() => props.onClick(keys[0])}
    >
      {renderedKeys}
      <div className="right p-2">
        <div>{description}</div>
      </div>
    </li>
  );
};

export default ShortcutDescription;
