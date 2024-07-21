const PleaseWait = (props) => {
  const { message = 'Mineral' } = props;

  return (
    <div className="generic-content flex items-center justify-center">
      <p
        className="animate-pulse
        font-mono text-4xl text-[var(--editor-text-color)] sm:text-6xl
        "
      >
        {message}
      </p>
    </div>
  );
};

export default PleaseWait;
