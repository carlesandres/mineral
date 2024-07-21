'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'types/supabase';
import { ExtendedSheet } from 'types/ExtendedSheet';
import { generateKeyBetween } from 'fractional-indexing';

interface MigrateProps {}

const Migrate = (_props: MigrateProps) => {
  const supabase = createClientComponentClient<Database>();
  const [migrating, setMigrating] = useState(false);
  const [numSectionsAdded, setNumSectionsAdded] = useState(0);
  const [finished, setFinished] = useState(false);

  const getSheets = useCallback(async () => {
    const { data: sheets, error } = await supabase
      .from('sheets')
      .select('*, sections(*), cheats(*)');
    if (error) {
      console.error(error);
      return;
    }

    return sheets as ExtendedSheet[];
  }, [supabase]);

  const createSections = useCallback(
    async (sheets: ExtendedSheet[]) => {
      console.log('creating sections ');
      if (!sheets) {
        return 0;
      }

      const sheetsWithNoSections = sheets.filter(
        (sheet) => sheet.sections.length === 0,
      );

      let numSectionsAdded = 0;

      for (const sheet of sheetsWithNoSections) {
        const { id, sections } = sheet;
        if (sections.length === 0) {
          const position = generateKeyBetween(null, null);
          const { error } = await supabase
            .from('sections')
            .insert({ sheet_id: id, position });

          if (error) {
            console.error(error);
          }
          numSectionsAdded++;
        }
      }
      console.log('sectons created ');
      return numSectionsAdded;
    },
    [supabase],
  );

  const migrateCheats = useCallback(
    async (sheets: ExtendedSheet[]) => {
      const sheetsWithSections = sheets.filter(
        (sheet) => sheet.sections.length > 0,
      );
      for (const sheet of sheetsWithSections) {
        const { sections, id } = sheet;
        const section = sections[0];
        const { error } = await supabase
          .from('cheats')
          .update({ section_id: section.id })
          .eq('sheet_id', id);
        if (error) {
          console.error(error);
        }
      }
    },
    [supabase],
  );

  useEffect(() => {
    const migrate = async () => {
      setMigrating(true);
      const extendedSheets = await getSheets();
      if (!extendedSheets) {
        setMigrating(false);
        return;
      }
      const numSectionsAdded = await createSections(extendedSheets);
      await migrateCheats(extendedSheets);
      setNumSectionsAdded(numSectionsAdded);
      setMigrating(false);
      setFinished(true);
    };

    if (!migrating && !finished) {
      migrate();
    }
  }, [getSheets, createSections, migrating, finished, migrateCheats]);

  if (migrating && !finished) {
    return <div>Migrating please wait...</div>;
  }

  return (
    <div className="pt-20">
      <h1>Migration Complete</h1>
      <p>Added {numSectionsAdded} sections</p>
    </div>
  );
};

export default Migrate;
