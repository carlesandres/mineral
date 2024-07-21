'use client';

import { useCallback, useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from 'components/ui/tabs';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useSingleQueryParam } from '@/utils/hooks/useSingleQueryParam';

type IParam = Record<string, React.ReactNode>;
type IParamAsArray = [string, React.ReactNode];

export interface TabsFromQueryParamsProps {
  tabDescriptors: IParam;
  paramName: string;
  defaultTab: string;
  className?: string;
}

const TabsFromQueryParams = (props: TabsFromQueryParamsProps) => {
  const { tabDescriptors, paramName } = props;
  const tabIds = Object.keys(tabDescriptors);
  const defaultTab = props.defaultTab || tabIds[0];
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const pathname = usePathname();
  const [selectedTab, setSelectedTab] = useState(defaultTab);
  const paramFromUrl = useSingleQueryParam(paramName, defaultTab);
  const [initialised, setInitialised] = useState(false);

  const handleTabChange = useCallback(
    (tab: string) => {
      setSelectedTab(tab);
      const params = new URLSearchParams(searchParams);

      params.set(paramName, tab);
      const href = `${pathname}?${params.toString()}`;
      router.replace(href);
    },
    [router, paramName, searchParams, pathname],
  );

  useEffect(() => {
    if (!initialised && paramFromUrl) {
      setInitialised(true);
      setSelectedTab(paramFromUrl);
    }
  }, [paramFromUrl, initialised]);

  const renderedTabs = Object.entries(tabDescriptors).map(
    (param: IParamAsArray) => {
      const [key, value] = param;
      return (
        <TabsTrigger key={key} value={key}>
          {value}
        </TabsTrigger>
      );
    },
  );

  return (
    <Tabs
      value={selectedTab}
      onValueChange={handleTabChange}
      className={props.className}
    >
      <TabsList>{renderedTabs}</TabsList>
    </Tabs>
  );
};

export default TabsFromQueryParams;
