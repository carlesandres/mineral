import Header from '@/components/Header';

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  return (
    <div>
      <Header />
      <main>
        <div className="prose mx-auto w-full max-w-3xl px-6 py-6 sm:py-12">
          {props.children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
