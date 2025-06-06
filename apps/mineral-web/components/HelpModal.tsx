import React from 'react';
import Modal from 'components/Modal';
import MDCheatsheet from 'components/MDCheatsheet';
import useUIZStore from 'hooks/useUIZStore';

const HelpModal = () => {
  const { mdCheatVisible, hideMdCheat } = useUIZStore((state) => state);

  return (
    <Modal
      isOpen={mdCheatVisible}
      title="Markdown Cheatsheet"
      onOpenChange={hideMdCheat}
      className="md:max-w-4xl"
    >
      <MDCheatsheet />
    </Modal>
  );
};

export default HelpModal;
