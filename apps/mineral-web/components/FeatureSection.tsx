import FeatureSectionTitle from './FeatureSectionTitle';

type FeatureSectionProps = {
  children: React.ReactNode;
  title: string;
};

const FeatureSection = (props: FeatureSectionProps) => {
  const { title, children } = props;

  return (
    <section className="mx-auto justify-center gap-4 px-4 sm:px-0">
      <FeatureSectionTitle>{title}</FeatureSectionTitle>
      <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-6">
        {children}
      </div>
    </section>
  );
};

export default FeatureSection;
