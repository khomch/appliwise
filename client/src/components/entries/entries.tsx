import { TEntry, TJob } from '@/utils/types';
import { Entry } from '../entry/entry';
import { Button } from '../ui/button/button';
import { Dispatch, SetStateAction, useState } from 'react';

type EntriesProps = {
  entries: TEntry[];
  job: TJob;
  setEntries: Dispatch<SetStateAction<TEntry[] | null>>;
};

export function Entries({ entries, job, setEntries }: EntriesProps) {
  const [newEntry, setNewEntry] = useState<TEntry | null>(null);
  const dummyEntry: TEntry = {
    id: new Date().getTime().toString(),
    createdAt: '',
    updatedAt: '',
    title: '',
    notes: '',
    status: '',
    itemId: job.id,
  };
  const handleAddEntry = () => {
    setNewEntry(dummyEntry);
  };

  return (
    <>
      <h1 className="text-xl font-medium truncate mt-2">{job.position}</h1>
      {!newEntry && (
        <Button
          value="Add entry"
          type="button"
          variant="secondary"
          style="border"
          size="xl"
          customStyle={'my-8'}
          dashed
          onClick={handleAddEntry}
        />
      )}

      <>
        <div className="flex flex-col-reverse">
          {newEntry && (
            <Entry
              key={newEntry.id}
              entry={newEntry}
              jobId={job.id}
              setEntries={setEntries}
              setNewEntry={setNewEntry}
            />
          )}
        </div>
        <div className="flex flex-col-reverse">
          {entries.map((entry: TEntry) => (
            <Entry
              key={entry.id}
              entry={entry}
              jobId={job.id}
              setEntries={setEntries}
              setNewEntry={setNewEntry}
            />
          ))}
        </div>
      </>
    </>
  );
}
