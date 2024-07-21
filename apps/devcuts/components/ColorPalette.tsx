import { MouseEvent } from 'react';
import { colors } from 'utils/colors';

interface ColorPaletteProps {
  value: string;
  onSelected: (color: string) => void;
  className?: string;
}

const ColorPalette = (props: ColorPaletteProps) => {
  const onSelect = (event: MouseEvent<HTMLButtonElement>) => {
    // @ts-ignore
    const { color } = event.target.dataset;
    props.onSelected(color);
  };

  const renderedColors = colors.map((c) => {
    const ringClass =
      c.toUpperCase() === props.value.toUpperCase()
        ? 'ring-4 ring-gray-600'
        : '';

    return (
      <button
        key={c}
        onClick={onSelect}
        className={`m-2 h-8 w-8 cursor-pointer rounded-full hover:opacity-50
        ${ringClass} `}
        data-color={c}
      >
        <style jsx>{`
          button {
            background-color: ${c};
          }
        `}</style>
      </button>
    );
  });

  return (
    <div className={props.className || ''}>
      <div className="mx-auto flex flex-wrap ">{renderedColors}</div>
    </div>
  );
};

export default ColorPalette;
