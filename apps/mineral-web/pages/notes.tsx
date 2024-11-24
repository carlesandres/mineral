import React from 'react';
import ListView from 'components/ListView';
import PageLayout from 'components/PageLayout';

const List = () => <ListView />;

List.getLayout = (page) => {
  return (
    <PageLayout isFixedHeight pageClass="h-screen" title="Notes" allowScroll>
      {page}
    </PageLayout>
  );
};

export default List;
