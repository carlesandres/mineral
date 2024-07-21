'use client';

import { Example } from '@/types/Example';
import { ArrowDownAZ, Calendar, GraduationCap } from 'lucide-react';
import React, { useState } from 'react';
import CMSExampleRow from './CMSExampleRow';
import TabWithIcon from './TabWithIcon';
import TabsFromQueryParams from './TabsFromQueryParams';
import { useSearchParams } from 'next/navigation';
import { Input } from './ui/input';
import ListActions from './ListActions';

const DEFAULT_TAB = 'all';
const FILTER_NAME = 'filter';

const ORDER_PARAM_NAME = 'order';
const DEFAULT_ORDER = 'created';

const DEFAULT_DIFFICULTY = 'all';
const DIFFICULTY_PARAM_NAME = 'difficulty';

const DEFAULT_MISSING_INFO = 'all';
const MISSING_INFO_PARAM_NAME = 'missing_info';

interface CmsListProps {
  examples: Example[];
}

const CmsList = (props: CmsListProps) => {
  const { examples } = props;
  const selectedTab = useSearchParams()?.get(FILTER_NAME) ?? DEFAULT_TAB;
  const orderTab = useSearchParams()?.get(ORDER_PARAM_NAME) ?? DEFAULT_ORDER;
  const difficultyTab =
    useSearchParams()?.get(DIFFICULTY_PARAM_NAME) ?? DEFAULT_DIFFICULTY;
  const missingInfoTab =
    useSearchParams()?.get(MISSING_INFO_PARAM_NAME) ?? DEFAULT_MISSING_INFO;
  const [search, setSearch] = useState('');

  const searchExamples = search
    ? examples.filter((example) => {
        return example.example.toLowerCase().includes(search.toLowerCase());
      })
    : examples;

  const sortedExamples =
    orderTab === 'abc'
      ? searchExamples
      : [...searchExamples].sort((a, b) => {
          return (
            new Date(b.created_at || '').getTime() -
            new Date(a.created_at || '').getTime()
          );
        });

  const filteredExamples = sortedExamples.filter((example) => {
    if (difficultyTab === 'basic') {
      return example.difficulty === 1;
    }
    if (difficultyTab === 'intermediate') {
      return example.difficulty === 2;
    }
    if (difficultyTab === 'advanced') {
      return example.difficulty === 3;
    }
    if (difficultyTab === 'expert') {
      return example.difficulty === 4;
    }
    return true;
  });

  const filteredExamplesWithMissingInfo = filteredExamples.filter((example) => {
    if (missingInfoTab === 'seo') {
      return !example.seo_description;
    }

    if (missingInfoTab === 'notes') {
      return Boolean(example.editor_notes.trim());
    }

    if (missingInfoTab === 'specific') {
      return Boolean(example.specific_example);
    }
    return true;
  });

  const published = filteredExamplesWithMissingInfo.filter(
    (example) => !example.draft,
  );
  const drafts = filteredExamplesWithMissingInfo.filter(
    (example) => example.draft,
  );
  const renderedPublishedExamples = published.map((example) => (
    <CMSExampleRow key={example.id} {...example} />
  ));
  const renderedDraftExamples = drafts.map((example) => (
    <CMSExampleRow key={example.id} {...example} />
  ));
  const renderedAllExamples = filteredExamplesWithMissingInfo.map((example) => (
    <CMSExampleRow key={example.id} {...example} />
  ));

  const tabsToListMap = {
    published: renderedPublishedExamples,
    drafts: renderedDraftExamples,
    all: renderedAllExamples,
  };

  const tabDescriptors = {
    all: (
      <TabWithIcon
        icon={<GraduationCap size={14} />}
        label={`All`}
        count={renderedAllExamples.length}
      />
    ),
    published: (
      <TabWithIcon
        icon={<GraduationCap size={14} />}
        label={`Published`}
        count={renderedPublishedExamples.length}
      />
    ),
    drafts: (
      <TabWithIcon
        icon={<GraduationCap size={14} />}
        label={`Drafts`}
        count={renderedDraftExamples.length}
      />
    ),
  };

  const orderTabDescriptors = {
    abc: <TabWithIcon icon={<ArrowDownAZ size={14} />} label={`A-Z`} />,
    created: <TabWithIcon icon={<Calendar size={14} />} label={`Created`} />,
  };

  const validTabs = Object.keys(tabsToListMap);

  if (!validTabs.includes(selectedTab)) {
    console.error(`Invalid tab: ${selectedTab}`);
    return null;
  }

  type ValidTab = keyof typeof tabsToListMap;

  const difficultyTabDescriptors = {
    all: <TabWithIcon icon={null} label="All" />,
    basic: <TabWithIcon icon={null} label="1" />,
    intermediate: <TabWithIcon icon={null} label="2" />,
    advanced: <TabWithIcon icon={null} label="3" />,
    expert: <TabWithIcon icon={null} label="4" />,
  };

  const missingInfoDescriptors = {
    all: <TabWithIcon icon={null} label="All" />,
    seo: <TabWithIcon icon={null} label="SEO desc." />,
    notes: <TabWithIcon icon={null} label="With note" />,
    specific: <TabWithIcon icon={null} label="With specific" />,
  };

  // TO-DO: Fix this type (need to learn more)
  const renderedExamples = tabsToListMap[selectedTab as ValidTab];

  return (
    <div className="w-full max-w-3xl pt-8">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-8">
        <TabsFromQueryParams
          tabDescriptors={tabDescriptors}
          paramName={FILTER_NAME}
          defaultTab={DEFAULT_TAB}
          className=""
        />

        <TabsFromQueryParams
          tabDescriptors={orderTabDescriptors}
          paramName={ORDER_PARAM_NAME}
          defaultTab={DEFAULT_ORDER}
          className=""
        />

        <TabsFromQueryParams
          tabDescriptors={difficultyTabDescriptors}
          paramName={DIFFICULTY_PARAM_NAME}
          defaultTab={DEFAULT_DIFFICULTY}
          className=""
        />

        <TabsFromQueryParams
          tabDescriptors={missingInfoDescriptors}
          paramName={MISSING_INFO_PARAM_NAME}
          defaultTab={DEFAULT_MISSING_INFO}
          className=""
        />

        <ListActions />
      </div>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
      />
      <div className="flex items-center justify-between pt-4 text-xs">{`${renderedExamples.length} examples`}</div>

      <div className="space-y-3 py-8">{renderedExamples}</div>
    </div>
  );
};

export default CmsList;
