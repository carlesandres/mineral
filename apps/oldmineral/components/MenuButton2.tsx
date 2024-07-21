import { forwardRef, Ref } from 'react';
import { Menu } from '@headlessui/react';
import Button2, { Button2Props } from 'components/Button2';

const MenuButton2 = forwardRef(
  (props: Button2Props, ref: Ref<HTMLButtonElement>) => {
    return (
      <Menu.Item>
        <Button2 ref={ref} {...props} />
      </Menu.Item>
    );
  }
);

export default MenuButton2;
