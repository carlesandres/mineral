const ResizeSlider = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div
      name={props.name}
      className={`resizer w-2 ${props.resizing}`}
      onMouseDown={props.onMouseDown}
    />
  );
};

export default ResizeSlider;
