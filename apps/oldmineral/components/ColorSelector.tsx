import React from 'react';
import Modal from 'components/Modal';
import CloseButton from 'components/CloseButton';
import ColorBall from 'components/ColorBall';
import colors from 'components/colors';

interface ColorSelectorProps {
  onChange: (arg0: string) => void;
  onClose: () => void;
  show: boolean;
  selectedColor?: string;
}

const ColorSelector = (props: ColorSelectorProps) => {
  const { selectedColor } = props;

  const colorballs = colors.map((color) => (
    <ColorBall
      key={color}
      onClick={props.onChange}
      selected={color === selectedColor}
      color={color}
    />
  ));

  return (
    <Modal
      onClose={props.onClose}
      title={'Choose a label color'}
      isOpen={props.show}
    >
      <CloseButton onClick={props.onClose} />
      <div className="p-4">
        <p className="px-4 py-2">
          Different colors can help you find your notes faster in the notes
          list.
        </p>
        <div className="flex w-full flex-wrap justify-start gap-4 overflow-hidden sm:p-4">
          {colorballs}
        </div>
      </div>
    </Modal>
  );
};

export default ColorSelector;
