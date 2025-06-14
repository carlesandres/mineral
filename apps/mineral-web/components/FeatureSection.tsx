type FeatureSectionProps = {
  children: React.ReactNode;
};

const FeatureSection = (props: FeatureSectionProps) => {
  const { children } = props;

  return (
    <section className="mx-auto flex justify-center gap-4 sm:flex-row">
      {children}
    </section>
  );
};

export default FeatureSection;
