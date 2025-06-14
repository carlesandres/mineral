import { openGraph } from '@/utils/shared-metadata';
import { Metadata } from 'next';
import Link from 'next/link';

const title = 'About';
const description = 'Mineral is a project by Carles Andrés.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `/about`,
  },
  openGraph: {
    ...openGraph,
    url: '/about',
    title,
    description,
  },
};

const AboutPage = () => {
  return (
    <div className="container mx-auto pb-4 text-center">
      <h1 className="sr-only py-16 text-2xl">About mnral</h1>
      <div className="mt-12 flex flex-col gap-4 sm:mt-20">
        <p>
          <strong>mnral</strong> is a project by{' '}
          <Link
            href="https://carlesandres.com"
            className="text-yellow-500 underline"
          >
            Carles Andres
          </Link>
        </p>
        <p>{`Reach out to me.`}</p>
        <p>{`I'd love to hear from you!`}</p>
      </div>
    </div>
  );
};

export default AboutPage;
