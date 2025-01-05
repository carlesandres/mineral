import FeatureCard from 'components/FeatureCard';
import FeatureSectionTitle from 'components/FeatureSectionTitle';
import HeroSection from 'components/HeroSection';
import { HiOutlineArrowDown } from 'react-icons/hi';

const IntroPage = () => {
  return (
    <div className="pt-8 text-gray-600 sm:my-32 dark:text-gray-300">
      <HeroSection />
      <div className="container mx-auto text-center" id="features">
        <p className="mb-8 inline-flex items-center justify-center gap-2 text-sm">
          <HiOutlineArrowDown className="animate-bounce" />
          <span>Or check out the features</span>
          <HiOutlineArrowDown className="animate-bounce" />
        </p>
        <FeatureSectionTitle>Writing</FeatureSectionTitle>
        <div className="feature-section">
          <FeatureCard title="Focus">
            {`We've designed a minimalistic UI to help you focus on your writing.`}
          </FeatureCard>
          <FeatureCard title="Local storage">
            {`Your notes stay on your computer and you choose when to share them.`}{' '}
          </FeatureCard>
          <FeatureCard title="Auto-saving">
            {`Your changes are automatically saved so that you don't have to remember doing it. `}{' '}
          </FeatureCard>
          {/*
          <FeatureCard title="Import text">
            {`Import any text file from the side panel or by simply dragging it into the notes list. `}
          </FeatureCard>
              */}
          <FeatureCard title="Bin">
            {`Send any note to the Bin folder and decide to recover it later or delete it forever.`}
          </FeatureCard>
        </div>
        <FeatureSectionTitle>Productivity</FeatureSectionTitle>
        <div className="feature-section">
          <FeatureCard title="Keyboard shortcuts">
            {`Use Command + K to open a menu with all available shortcuts`}
          </FeatureCard>
          <FeatureCard title="Full search">
            {`Search your notes by title or content`}
          </FeatureCard>
          {/*
          <FeatureCard title="Content preview">
            {`Hover over a note in the notes list to see a preview of its content`}
          </FeatureCard>
              */}
          <FeatureCard title="Color labels">
            {`Assing different colors to different notes to find them more easily`}
          </FeatureCard>
        </div>
        <FeatureSectionTitle>Customisation</FeatureSectionTitle>
        <div className="feature-section">
          <FeatureCard title="Dark mode">
            {`Choose between light and dark mode to suit your preferences.`}
          </FeatureCard>
          <FeatureCard title="Custom line spacing">
            {`Choose from 5 different line-spacing options`}
          </FeatureCard>
        </div>
        <FeatureSectionTitle>Markdown</FeatureSectionTitle>
        <div className="feature-section">
          <FeatureCard title="Preview panel">
            {`A separate preview panel you can toggle separately from the editor.`}
          </FeatureCard>
          {/*
          <FeatureCard title="Markdown Themes">
            {`Choose between 4 different themes in your markdown preview.`}
          </FeatureCard>
          <FeatureCard title="Syntax highlighting">
            {`Your code as beautiful as possible`}
          </FeatureCard>
            */}
          <FeatureCard title="Table of contents">
            {`Automatically generated ToC based on your markdown headings.`}
          </FeatureCard>
        </div>
      </div>
      <div className="container mx-auto max-w-lg text-center">
        <FeatureSectionTitle>And more...</FeatureSectionTitle>
        <ul className="flex flex-col gap-2">
          <li>Create a new note with a link</li>
          <li>Visit most recent note from a link</li>
          {/*
          <li>Note statistics in the footer</li>
          <li>Full backup of all notes</li>
          <li>Export note as text file</li>
          */}
        </ul>
      </div>
    </div>
  );
};

export default IntroPage;
