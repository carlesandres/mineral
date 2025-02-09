import Link from 'next/link';

export const metadata = {
  title: 'About',
  description: 'Mineral is a project by Carles Andrés. Request your features.',
  openGraph: {
    title: 'About',
    description:
      'Mineral is a project by Carles Andrés. Request your features.',
  },
};

const AboutPage = () => {
  return (
    <div className="container mx-auto pb-4 text-center">
      <h1 className="py-16 text-2xl">About mnral</h1>
      <div className="flex flex-col gap-4">
        <p>
          mnral is a project by{' '}
          <Link
            href="https://carlesandres.com"
            className="text-yellow-500 underline"
          >
            Carles Andrés
          </Link>
        </p>
        <p>{`Reach out to me. I'd love to hear your feedback.`}</p>
      </div>
    </div>
  );
};

export default AboutPage;
