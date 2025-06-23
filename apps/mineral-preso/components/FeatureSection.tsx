type FeatureSectionProps = {
  children: React.ReactNode;
};

const FeatureSection = (props: FeatureSectionProps) => {
  const { children } = props;

  return (
    <section className="mx-auto flex flex-col justify-center gap-4 px-4 sm:flex-row sm:px-0">
      {children}
    </section>
  );
};

export default FeatureSection;
