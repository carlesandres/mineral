'use client';

import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
import { useSingleQueryParam } from '@/utils/hooks/useSingleQueryParam';
import CustomSelect, { CustomSelectProps } from '@/components/CustomSelect';

interface SelectFromQueryParamsProps
  extends Omit<CustomSelectProps, 'value' | 'onChange'> {
  defaultTab: string;
  paramName: string;
}

const SelectFromQueryParams = (props: SelectFromQueryParamsProps) => {
  const { defaultTab, paramName, ...rest } = props;
  const [selectedTab, setSelectedTab] = useState(defaultTab);
  const paramFromUrl = useSingleQueryParam(paramName, defaultTab);
  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    if (!initialised && paramFromUrl) {
      setInitialised(true);
      setSelectedTab(paramFromUrl);
    }
  }, [paramFromUrl, initialised]);

  const handleSelectedTabChange = (value: string | number) => {
    setSelectedTab(String(value));
  };

  return (
    <CustomSelect
      value={selectedTab}
      onChange={handleSelectedTabChange}
      {...rest}
    />
  );
};

export default SelectFromQueryParams;
