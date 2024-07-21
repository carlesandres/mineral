import React from 'react';
import { Button } from 'components/ui/button';
import Link from 'next/link';
import { canUserEdit } from '@/utils/can-user-edit';

const CMSAccessLink = async () => {
  const canEdit = await canUserEdit();

  if (!canEdit) {
    return null;
  }

  return (
    <Button asChild>
      <Link href="/">CMS</Link>
    </Button>
  );
};

export default CMSAccessLink;
