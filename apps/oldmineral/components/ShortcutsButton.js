import { BsKeyboard } from 'react-icons/bs';
import Button from 'components/Button';

const ShortcutsButton = () => {
  const onClick = () => {
    const keyboardEvent = new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true,
    });
    document.dispatchEvent(keyboardEvent);
  };

  return (
    <Button className="shortcuts-btn" onClick={onClick}>
      <div className="flex items-center space-x-2">
        <BsKeyboard />
        <span className="text-sm">Shortcuts</span>
      </div>
    </Button>
  );
};

export default ShortcutsButton;
