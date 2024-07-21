'use client';

import { useState } from 'react';
import NewCheatFormClient from './NewCheatFormClient';
import { Section } from 'types/Section';
import { Button } from './ui/button';
import { PlusIcon } from 'lucide-react';

interface SectionHeaderClientProps {
  sectionId: Section['id'];
  nextCheatPos: string;
}

export function SectionHeaderClient(props: SectionHeaderClientProps) {
  const { sectionId, nextCheatPos } = props;
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return (
      <NewCheatFormClient
        sectionId={sectionId}
        nextCheatPos={nextCheatPos}
        showForm={showForm}
        setShowForm={setShowForm}
      />
    );
  }

  return (
    <div className="text-center">
      <Button
        className="gap-2"
        variant="outline"
        size="sm"
        onClick={() => setShowForm(true)}
      >
        <PlusIcon size={14} />
        <span>Add cheat</span>
      </Button>
    </div>
  );
}
