interface MyLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

const MyLink = (props: MyLinkProps) => {
  const { href, children, className = '' } = props;

  return (
    <a
      className={`bg-[#f5f5dc] font-semibold text-inherit underline 
      transition hover:bg-[#fddfdf] ${className}`}
      href={href}
    >
      {children}
    </a>
  );
};

export default MyLink;
