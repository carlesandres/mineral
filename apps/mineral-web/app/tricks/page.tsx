import FeatureSectionTitle from 'components/FeatureSectionTitle';

const FeaturesPage = () => {
  return (
    <div className="tricks mx-auto pt-8 text-gray-600 dark:text-gray-300 sm:my-8">
      <div className="container mx-auto max-w-2xl space-y-4 text-center">
        <h2 className="mb-16 flex items-center justify-center gap-2 text-4xl font-bold">
          <span>Tricks</span>
        </h2>

        <FeatureSectionTitle>Shortcuts</FeatureSectionTitle>
        <p>
          Type <kbd>Cmd + K</kbd> to show all available keyboard shortcuts.
        </p>
        <p>
          You can immediately choose a shortcut with just one more keystroke.
        </p>
        <p className="example !mb-12">
          For example, type <kbd>Cmd + K</kbd> and then <kbd>N</kbd> to create a
          new note.
        </p>
        <FeatureSectionTitle>Editor</FeatureSectionTitle>
        <p>
          Press <kbd>Cmd</kbd> and double-click on any panel in the editor to
          togglr between <strong>read-only</strong> and{' '}
          <strong>write-focus</strong> modes.
        </p>

        <p>
          Press <kbd>Cmd</kbd> and <kbd>ENTER</kbd> to alternate between{' '}
          <strong>read-only</strong>, <strong>write-focus</strong> and{' '}
          side-by-side modes.
        </p>
      </div>
    </div>
  );
};

export default FeaturesPage;
