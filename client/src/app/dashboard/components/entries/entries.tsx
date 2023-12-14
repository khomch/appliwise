import { TEntry, TJob } from '@/types/types';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import iconNewTab from '../../../../../public/icon-opentab.svg';
import { Entry } from '../entry/entry';
import { Button } from '../../../../components/ui/button/button';

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
      <div className="flex items-center gap-6 ">
        <h1 className="text-xl font-medium truncate mt-2 max-w-xl">
          {job.position}
        </h1>
        <a target="_blank" href={job.url} className="mt-2 self-center">
          <Image
            src={iconNewTab}
            alt="open in new tab"
            className=" hover:cursor-pointer"
            width={20}
            height={20}
          />
        </a>
      </div>
      {/* </Link> */}
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
