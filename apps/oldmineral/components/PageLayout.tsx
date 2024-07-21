import { ReactNode } from 'react';
import MainMenu from 'components/MainMenu';
import ShortcutsModal from 'components/ShortcutsModal';
import Head from 'next/head';

interface PageLayoutProps {
  pageClass?: string;
  isFixedHeight?: boolean;
  title?: string;
  children?: ReactNode;
  menu?: ReactNode;
  allowScroll?: boolean;
}

const PageLayout = (props: PageLayoutProps) => {
  const {
    pageClass = '',
    allowScroll,
    isFixedHeight,
    title,
    menu = <MainMenu />,
  } = props;
  const fixedHeight = 'flex overflow-hidden flex-1 ';
  const fhClass = isFixedHeight ? fixedHeight : 'px-4 lg:px-0';
  const fhClassInner = isFixedHeight ? 'flex flex-1' : 'px-4 lg:px-0';
  const allowScrollClass = allowScroll ? 'overflow-y-auto' : 'overflow-hidden';

  const renderedDocTitle = title ? (
    <Head>
      <title>{title}</title>
    </Head>
  ) : null;

  return (
    <div className={`page-content min-h-screen ${pageClass} ${fhClass} `}>
      {renderedDocTitle}
      <ShortcutsModal />
      {menu}
      <div className={`${fhClassInner} ${allowScrollClass}`}>
        {props.children}
      </div>
    </div>
  );
};

export default PageLayout;
