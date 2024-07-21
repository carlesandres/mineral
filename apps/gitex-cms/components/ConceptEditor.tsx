'use client';

import React, { useState } from 'react';
import { Concept } from '@/types/Concept';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import updateConcept from '@/utils/server-actions/update-concept';
import { Input } from './ui/input';
import MarkdownPreview from './MarkdownPreview';

interface ConceptEditorProps {
  concept: Concept;
}

const ConceptEditor = (props: ConceptEditorProps) => {
  const [concept, setConcept] = useState(props.concept);

  console.log('concept.seo', concept.seo);

  return (
    <div>
      <form action={updateConcept} className="flex flex-col space-y-4">
        <Input type="hidden" name="id" value={concept.id} />
        <Input type="hidden" name="name" value={concept.name} />
        <div className="flex gap-4">
          <Textarea
            rows={20}
            name="description"
            defaultValue={concept.description}
            className="text-lg p-6"
            onChange={(e) =>
              setConcept({ ...concept, description: e.target.value })
            }
          />
          <MarkdownPreview text={concept.description} />
        </div>
        <Textarea
          rows={3}
          name="seo"
          value={concept.seo}
          onChange={(e) => setConcept({ ...concept, seo: e.target.value })}
        />
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
};

export default ConceptEditor;
