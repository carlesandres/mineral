import IconLink from '@/components/IconLink';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import ProfileImage from '@/components/ProfileImage';
import AppBanner from '@/components/AppBanner';
import gitExImage from '../../public/gitexamples.png';
import mineralImage from '../../public/mineral.png';
import cookieWorkshopImage from '../../public/cookie-workshop.png';
import Link from 'next/link';

const Homepage = () => (
  <div>
    <main className="sm:mt-8">
      <div className="central-col mx-auto w-full max-w-4xl text-center leading-7 sm:text-left">
        <section className="mb-8 sm:mb-16 text-center flex flex-col sm:gap-2">
          <div className="py-16 ">
            <ProfileImage className="mx-auto" />
          </div>
          <div className="mx-auto text-3xl font-bold sm:text-4xl">
            Carles Andrés
          </div>
          <p>Web Engineer</p>
        </section>

        <section className="mb-8 sm:mb-16 p-8 sm:p-0 text-center text-base sm:text-lg">
          <h2 className="mb-6 text-2xl font-bold ">{`Things I'm building`}</h2>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
            <AppBanner
              href="https://gitexamples.com"
              title="Git Examples"
              description="Git learning platform"
              image={gitExImage}
            />
            <AppBanner
              href="https://mnral.com"
              title="Mineral"
              description="Minimalistic note-taking app"
              image={mineralImage}
            />
            <AppBanner
              href="https://chromewebstore.google.com/detail/cookie-workshop/dlbalngihldhiaallkdaaaonlnljkaao"
              title="Cookie Workshop"
              description="Chrome extension to manage cookies"
              image={cookieWorkshopImage}
            />
          </div>
        </section>

        <section className="mb-8 sm:mb-16 p-4 text-center text-sm !leading-10 sm:text-base">
          <h2 className="mb-6 text-2xl font-bold ">{`Current interests`}</h2>
            {`Software development, essentialism, deliberate practice, productivity`}
        </section>

        <section className="mb-8 sm:mb-16 p-4 text-center text-sm !leading-10 sm:text-base">
          <h2 className="mb-6 text-2xl font-bold ">{`Read me`}</h2>
          <Link href="/non-blog"
            className="text-blue-500 hover:underline"
          >Incipient Non-blog</Link>
        </section>

        <section className="mx-auto my-auto pb-36 text-center sm:mt-6">
          <h2 className="mb-6 text-2xl font-bold ">{`Talk to me`}</h2>
          <div className="inline-flex w-48 justify-between gap-4 sm:gap-8">
            <IconLink href="http://twitter.com/carlesandres">
              <FaTwitter />
            </IconLink>
            <IconLink href="http://github.com/carlesandres">
              <FaGithub />
            </IconLink>
            <IconLink href="http://linkedin.com/in/carlesandres">
              <FaLinkedin />
            </IconLink>
          </div>
        </section>
      </div>
    </main>
  </div>
);

export default Homepage;
