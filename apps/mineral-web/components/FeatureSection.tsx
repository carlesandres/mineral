type FeatureSectionProps = {
  children: React.ReactNode;
};

const FeatureSection = (props: FeatureSectionProps) => {
  const { children } = props;

  return (
    <section className="mx-auto inline-grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </section>
  );
};

export default FeatureSection;
