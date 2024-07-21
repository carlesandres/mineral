'use client';

import AssistForm from '@/components/AssistForm';
import AssistResponse from '@/components/AssistResponse';
import React, { useState } from 'react';

interface AssistPageClientProps {
  defaultPrompt: string;
}

const AssistPageClient = (props: AssistPageClientProps) => {
  const { defaultPrompt } = props;
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="mb-8 px-8 ">
      <AssistForm
        defaultPrompt={defaultPrompt}
        promptTableName="assist_prompts"
        onResultChange={setResult}
        loading={loading}
        setLoading={setLoading}
      />
      <AssistResponse jsonString={result} loading={loading} />
    </div>
  );
};

export default AssistPageClient;
