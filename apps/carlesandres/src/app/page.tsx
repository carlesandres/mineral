import IconLink from '@/components/IconLink';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import ProfileImage from '@/components/ProfileImage';
import Link from 'next/link';

const Homepage = () => (
  <div>
    <main className="sm:mt-8">
      <div className="central-col mx-auto w-full max-w-lg text-center leading-7 sm:text-left">
        <section className="mb-8 flex flex-col text-center sm:mb-16 sm:gap-2">
          <ProfileImage className="mx-auto my-8" />
          <h1 className="mx-auto text-xl font-bold sm:text-2xl">
            Carles Andrés
          </h1>
        </section>

        <section className="my-4">
          <p>{`I'm a software engineer based in London.`}</p>
        </section>

        <section className="my-4">
          <p>
            {`I'm currently building: `}
            <Link
              href="https://gitexamples.com"
              className="text-blue-500 underline hover:text-blue-600"
            >
              Git Examples
            </Link>
          </p>
          <p>
            {`It's a collection of Git commands to help you be more productive with Git.`}
          </p>
        </section>

        <section className="my-4">
          <p>
            {`I've started a "non-blog" `}
            <Link
              href="/non-blog"
              className="text-blue-500 underline hover:text-blue-600"
            >
              here
            </Link>
            {` but I'm still figuring what to post.`}
          </p>
        </section>

        <section className="my-4">
          <p>{`Other projects I've started are:`}</p>
          <ul className="ml-4">
            <li>
              <Link
                href="https://mnral.com"
                className="text-blue-500 underline hover:text-blue-600"
              >
                Mineral
              </Link>
              {`: Minimalistic note-taking app`}
            </li>
            <li>
              <Link
                href="https://chromewebstore.google.com/detail/cookie-workshop/dlbalngihldhiaallkdaaaonlnljkaao"
                className="text-blue-500 underline hover:text-blue-600"
              >
                Cookie Workshop
              </Link>
              {`: Chrome extension for managing cookies`}
            </li>
          </ul>
        </section>

        <section className="my-4">
          <p>{`You can find me on:`}</p>
          <ul className="ml-4">
            <li>
              <IconLink href="http://twitter.com/carlesandres">
                <FaTwitter />
                <span>Twitter</span>
              </IconLink>
            </li>
            <li>
              <IconLink href="http://github.com/carlesandres">
                <FaGithub />
                <span>Github</span>
              </IconLink>
            </li>
            <li>
              <IconLink href="http://linkedin.com/in/carlesandres">
                <FaLinkedin />
                <span>LinkedIn</span>
              </IconLink>
            </li>
          </ul>
        </section>
      </div>
    </main>
  </div>
);

export default Homepage;
