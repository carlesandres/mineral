import { useState, useCallback } from 'react';
import Modal from 'components/Modal';
import Error from 'components/Error';
import useCreateFile from 'hooks/useCreateFile';
import useUIZStore from 'hooks/useUIZStore';
import SuccessToast from 'components/SuccessToast';

export const readLocalFile = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new window.FileReader();

    fileReader.onload = (event) => {
      const fileContents = event.target?.result;
      resolve(fileContents);
    };

    fileReader.onerror = reject;
    fileReader.readAsText(file);
  });
};

const FileImporter = () => {
  const [errorMsg, setErrormsg] = useState<string | null>(null);
  const createFile = useCreateFile();
  const { toast, fileImportModalVisible, hideFileImport } = useUIZStore();

  const closeModal = useCallback(() => {
    hideFileImport();
    setErrormsg(null);
  }, [hideFileImport]);

  const onFileSelect = async (event) => {
    const files = event.target.files;
    const file = files.length ? files[0] : null;
    try {
      const text = await readLocalFile(file);
      createFile({ title: file.name, text });
      toast(<SuccessToast>File imported</SuccessToast>);
      closeModal();
    } catch (err) {
      setErrormsg('There has been a problem loading your file');
    }
  };

  return (
    <Modal
      isOpen={fileImportModalVisible}
      onClose={closeModal}
      title="Load file"
    >
      <div className="p-4">
        <input type="file" onChange={onFileSelect} />
        <Error>{errorMsg}</Error>
      </div>
    </Modal>
  );
};

export default FileImporter;
