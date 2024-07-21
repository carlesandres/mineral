import ExampleForm from 'components/ExampleForm';
import { defaultExample } from 'utils/default-example';
import ProgressBar from 'components/ProgressBar';
import { exampleProgress } from 'utils/example-progress';

const NewExamplePage = () => {
  const progress = exampleProgress(defaultExample);

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-800 pt-24">
        <div className="examples content mx-auto max-w-4xl p-4">
          <div className="my-8 flex items-center justify-between gap-4">
            <ProgressBar progress={progress} />
            <div className="text-lg font-bold flex-1">New example</div>
          </div>
          <ExampleForm cheat={null} relatedExamples={null} />
        </div>
      </div>
    </>
  );
};

export default NewExamplePage;
