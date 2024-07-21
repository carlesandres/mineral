const IconLink = (props) => {
  return (
    <a
      className="rounded-full p-2 text-3xl 
      text-blue-500
      outline-dotted outline-transparent transition-all duration-300 
      hover:text-[color:#858500] hover:outline-[#858500]"
      href={props.href}
    >
      {props.children}
    </a>
  );
};

export default IconLink;
