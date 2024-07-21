'use client';
import React, { useCallback, useState } from 'react';
import { Section } from 'types/Section';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { updateSection } from 'utils/server-actions/update-section';

interface SectionDetailsProps {
  section: Section;
}

const SectionDetails = (props: SectionDetailsProps) => {
  const { section } = props;
  const [show, setShow] = useState(false);

  const saveSection = useCallback(
    (formData: FormData) => {
      const title = formData.get('title') as string;
      updateSection({ description: title }, section.id, section.sheet_id);
      setShow(false);
    },
    [section],
  );

  if (!show) {
    return (
      <Button
        variant="ghost"
        className="px-0 font-bold text-lg w-full justify-start"
        onClick={() => setShow(true)}
        size="lg"
      >
        {section.description || '(Section description)'}
      </Button>
    );
  }

  return (
    <form action={saveSection}>
      <Input name="title" defaultValue={section.description} />
    </form>
  );
};

export default SectionDetails;
