import CreateNoteButton from './CreateNoteButton';

const FourOhFour = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-8 text-center text-3xl font-bold sm:mb-24 sm:text-5xl">
          Oops! Page does not exist
        </h1>
        <CreateNoteButton />
      </div>
    </div>
  );
};

export default FourOhFour;
