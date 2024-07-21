import { Section } from 'types/Section';
import { SectionHeaderClient } from './SectionHeaderClient';
import { getNextCheatPos } from 'utils/get-next-cheat-pos';
import SectionDetails from './SectionDetails';

interface SectionHeaderProps {
  section: Section;
}

export async function SectionHeader(props: SectionHeaderProps) {
  const { section } = props;
  const nextCheatPos = await getNextCheatPos(section.id);

  if (!nextCheatPos) {
    return null;
  }

  return (
    <div className="pb-6">
      <SectionDetails section={props.section} />
      <SectionHeaderClient sectionId={section.id} nextCheatPos={nextCheatPos} />
    </div>
  );
}
