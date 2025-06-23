import mdExamples from 'utils/markdown-example-text';
import type { MdExample } from 'utils/markdown-example-text';
import MDExample from 'components/MDExample';

interface MDSectionProps {
  examples: MdExample[];
  sectionTitle: string;
}

const MDSection = (props: MDSectionProps) => {
  const { examples, sectionTitle = '' } = props;

  const renderedExamples = examples.map((el, index2) => (
    <MDExample {...el} key={index2} />
  ));

  return (
    <section className="markdown-examples mb-8">
      <h2 className="mb-4 text-2xl font-bold text-yellow-700 dark:text-yellow-400">
        {sectionTitle}
      </h2>
      <div className="flex flex-col">{renderedExamples}</div>
    </section>
  );
};

const MDCheatsheet = () => (
  <div className="overflow-y-auto p-8">
    {mdExamples.map((sectionProps, index) => (
      <MDSection {...sectionProps} key={index} />
    ))}
  </div>
);

export default MDCheatsheet;
