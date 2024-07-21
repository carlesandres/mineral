'use client';
import React, { useCallback } from 'react';
import { Button } from './ui/button';
import { addSection } from 'utils/server-actions/add-section';

interface AddSectionButtonProps {
  sheetId: string;
}

const AddSectionButton = (props: AddSectionButtonProps) => {
  const { sheetId } = props;

  const handleClick = useCallback(() => {
    addSection(sheetId);
  }, [sheetId]);

  return (
    <div className="mt-4 mx-auto text-center">
      <Button onClick={handleClick}>Add Section</Button>
    </div>
  );
};

export default AddSectionButton;
