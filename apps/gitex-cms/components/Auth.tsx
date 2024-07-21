import LoginButton from './LoginButton';
import signUpWithGithub from '@/utils/server-actions/sign-up-github'

export default function Auth() {

  return (
    <div className="flex-center mx-auto flex max-w-2xl flex-col items-center p-4 pt-16 sm:pt-32">
      <h1 className="text-3xl font-bold text-center mb-16">Git Examples CMS</h1>

      <form>
        <LoginButton
          className="button mx-auto inline-flex items-center justify-center space-x-2"
          formAction={signUpWithGithub}
        />
      </form>
    </div>
  );
}
