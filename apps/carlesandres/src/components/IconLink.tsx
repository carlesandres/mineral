import Link from 'next/link';

const IconLink = (props) => {
  return (
    <Link
      className="flex items-center gap-2 text-blue-500 transition-all duration-300 hover:text-[color:#858500] hover:outline-[#858500]"
      href={props.href}
    >
      {props.children}
    </Link>
  );
};

export default IconLink;
