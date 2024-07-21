'use client';

import AssistForm from '@/components/AssistForm';
import AssistResponse from '@/components/AssistResponse';
import React, { useState } from 'react';

interface SEOAssistPageClientProps {
  defaultPrompt: string;
}

const SEOAssistPageClient = (props: SEOAssistPageClientProps) => {
  const { defaultPrompt } = props;
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="mb-8 max-w-3xl px-8 ">
      <h1 className="text-3xl font-bold mb-4">Assist</h1>
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

export default SEOAssistPageClient;
