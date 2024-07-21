import React, { useCallback, useEffect, useState } from 'react';
import { Card } from './ui/card';
import { ExampleInsert } from '@/types/Example';
import { Button } from './ui/button';
import toast from 'react-hot-toast';
import { mdStyle } from '@/utils/md-style';
import { marked } from 'marked';
import { useRouter } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { supabaseBrowserClient } from '@/utils/supabase/create-browser-supabase-client';

interface AssistResponseProps {
  jsonString: string;
  loading: boolean;
}

const AssistResponse = (props: AssistResponseProps) => {
  const { jsonString, loading } = props;
  const [parsedJson, setParsedJson] = useState<ExampleInsert | null>(null);
  const [isValidJson, setIsValidJson] = useState(false);
  const supabase = supabaseBrowserClient();
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsValidJson(false);
    if (!loading && jsonString) {
      try {
        setParsedJson(JSON.parse(jsonString));
        setIsValidJson(true);
      } catch (e) {
        console.error(`Cannot parse ${jsonString}`);
      }
    }
  }, [loading, jsonString]);

  const handleSaveAsDraftExample = useCallback(async () => {
    if (!parsedJson?.example) {
      toast.error(`Weird problem. Check console.`);
      setSaving(false);
      return;
    }
    setSaving(true);
    // extract the first two words from the example
    const baseCommand = parsedJson.example.split(' ').slice(0, 2).join(' ');
    const { data: baseCommandId, error } = await supabase
      .from('base_commands')
      .select('id')
      .eq('command', baseCommand)
      .single();

    if (error || !baseCommandId) {
      console.error(error);
      toast.error(`Error obtaining base command id for ${baseCommand}`);
      setSaving(false);
      return;
    }

    const example = {
      ...parsedJson,
      difficulty: 3,
      draft: true,
      base_command_id: baseCommandId.id,
    };
    const { data, error: error2 } = await supabase
      .from('examples')
      .insert([example])
      .select('id')
      .single();

    setSaving(false);
    if (error2) {
      console.error(error2);
      toast.error('Error saving example');
      return;
    }
    console.log('data', data);
    toast.success('Example saved');
    router.push(`/examples/${data.id}`);
  }, [parsedJson, supabase, router]);

  if (isValidJson && parsedJson) {
    return (
      <div className="space-y-4 mt-4">
        <Tabs defaultValue="md" className="">
          <TabsList className="grid grid-cols-2 w-[300px]">
            <TabsTrigger value="md">Markdown</TabsTrigger>
            <TabsTrigger value="raw">Raw</TabsTrigger>
          </TabsList>
          <TabsContent value="md" className="h-[300px] overflow-auto">
            <div className="bg-white border rounded-lg p-4 flex flex-col gap-4 overflow-auto">
              <p className="font-bold text-lg">{parsedJson.example}</p>
              <p>{parsedJson.short_description}</p>
              <p
                className={`${mdStyle} mt-4 pb-4`}
                dangerouslySetInnerHTML={{
                  __html: marked(parsedJson.long_description ?? ''),
                }}
              />
            </div>
          </TabsContent>
          <TabsContent value="raw" className="h-[300px] ">
            <div className="bg-white rounded-lg border p-4 flex flex-col gap-4 overflow-auto">
              <p className="p-2 text-sm">{parsedJson.example}</p>
              <p className="p-2 text-sm">{parsedJson.short_description}</p>
              <p className="p-2 text-sm">{parsedJson.long_description}</p>
            </div>
          </TabsContent>
        </Tabs>
        <Button
          onClick={handleSaveAsDraftExample}
          disabled={!isValidJson || saving}
        >
          Save as Draft
        </Button>
      </div>
    );
  }

  return <Card className="mt-8 p-4 whitespace-pre-wrap">{jsonString}</Card>;
};

export default AssistResponse;
