import Link from 'next/link';

const FileNotFound = (id) => {
  const message = id
    ? `Oh file with id ${id.id} has not been found`
    : 'No file id has been provided';

  return (
    <div className="">
      <h2>{message}</h2>
      <p>
        Click <Link href="/notes">here</Link> to go back to the notes list
      </p>
    </div>
  );
};

export default FileNotFound;
