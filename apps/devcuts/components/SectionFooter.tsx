import { Section } from 'types/Section';
import { getNextCheatPos } from 'utils/get-next-cheat-pos';
import { SectionHeaderClient } from './SectionHeaderClient';

interface SectionFooterProps {
  sectionId: Section['id'];
}

export async function SectionFooter(props: SectionFooterProps) {
  const { sectionId } = props;
  const nextCheatPos = await getNextCheatPos(sectionId, false);

  if (!nextCheatPos) {
    return null;
  }

  return (
    <SectionHeaderClient sectionId={sectionId} nextCheatPos={nextCheatPos} />
  );
}
