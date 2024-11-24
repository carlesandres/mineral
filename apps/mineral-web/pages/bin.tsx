import React from 'react';
import BinList from 'components/BinList';
import PageLayout from 'components/PageLayout';

const List = () => <BinList />;

List.getLayout = (page) => {
  return (
    <PageLayout isFixedHeight pageClass="h-screen" title="Bin" allowScroll>
      {page}
    </PageLayout>
  );
};

export default List;
