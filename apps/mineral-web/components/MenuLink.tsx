import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  className?: string;
  link?: string;
  onClick?: () => void;
  children: ReactNode;
  tabIndex?: number;
}

const MenuLink = (props: Props) => {
  const router = useRouter();
  const { className = '', link, onClick, children, ...otherProps } = props;
  const activeClassName =
    router.pathname === link
      ? `text-yellow-600 dark:text-yellow-300
      border-l-current left-0.5 px-3`
      : '';

  const completeClassName = `relative px-1 py-2 flex items-center gap-2 btn
    btn-default dark:hover:bg-gray-700 dark:hover:text-yellow-300
    hover:bg-gray-200
     rounded
    border-l-2 border-transparent
    transition-all  ${className} ${activeClassName}`;

  if (link) {
    return (
      <div className="">
        <Link href={link} className={completeClassName} {...otherProps}>
          {children}
        </Link>
      </div>
    );
  }

  return (
    <div className="">
      <button onClick={onClick} className={completeClassName} {...otherProps}>
        {children}
      </button>
    </div>
  );
};

export default MenuLink;
