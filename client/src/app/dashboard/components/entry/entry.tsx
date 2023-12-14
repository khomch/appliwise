import { deleteEntry, postEntry, updateEntry } from '@/services/job.service';
import { TEntry } from '@/types/types';
import {
  Dispatch,
  FormEvent,
  MouseEventHandler,
  SetStateAction,
  useState,
} from 'react';
import { Button } from '../../../../components/ui/button/button';
import { Input } from '../../../../components/ui/input/input';
import { Select } from '../../../../components/ui/select/select';
import { STATUS_OPTIONS } from "@/constants";
import { useAppDispatch } from '@/hooks/hooks';
import { updateJobState } from '@/store/slices/jobSlice';

type EntryProps = {
  entry: TEntry;
  jobId: string;
  setEntries: Dispatch<SetStateAction<TEntry[] | null>>;
  setNewEntry: Dispatch<SetStateAction<TEntry | null>>;
};

export function Entry({ entry, jobId, setEntries, setNewEntry }: EntryProps) {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>(entry.title);
  const [created, setCreated] = useState<string>(entry.createdAt.slice(0, -8));
  const [notes, setNotes] = useState<string>(entry.notes);
  const [status, setStatus] = useState<string>(entry.status || '');
  const [isDisabled, setIsDisabled] = useState<boolean>(
    entry.createdAt ? true : false
  );
  const [saved, setIsSaved] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!entry.createdAt) {
      const entryInfo = {
        title: title,
        notes: notes,
        status: status,
        itemId: jobId,
      };
      postEntry(entryInfo).then((data) => {
        if (data.id) {
          toggleDisabled(event);
          setEntries((prev = []) => prev && [...prev, data]);
          setNewEntry(null);
          setIsSaved(true);
        } else {
          // TODO: handleError
        }
      });
    } else {
      const entryInfo = {
        id: entry.id,
        title: title,
        notes: notes,
        status: status,
        itemId: jobId,
      };
      updateEntry(entryInfo).then((data) => {
        if (data.id) {
          toggleDisabled(event);
          setIsSaved(true);
        } else {
          // TODO: handleError
        }
      });
    }
  };

  const handleReset = (event: FormEvent) => {
    event.preventDefault();
    if (!entry.createdAt) {
      setNewEntry(null);
    } else {
      setTitle(entry.title);
      setCreated(entry.createdAt.slice(0, -8));
      setNotes(entry.notes);
      setStatus(entry.status || '');
      setIsDisabled((prev) => !prev);
    }
  };
  const handleDelete = (event: FormEvent) => {
    event.preventDefault();
    deleteEntry(entry.id).then((data) => {
      if (data?.ok) {
        setEntries((prev: any) => {
          const indexOfDeleted = prev?.map((x: any) => x.id).indexOf(entry.id);
          const itemsBefore = prev.slice(0, indexOfDeleted);
          const itemsAfter = prev.slice(indexOfDeleted + 1);
          const newArr = [...itemsBefore, ...itemsAfter];
          return newArr;
        });
      } else {
        // TODO: handleError
      }
    });
  };

  const handleSelectStatus = (event: any) => {
    setStatus(event.target.value);
    dispatch(
      updateJobState({ jobId, key: 'lastStatus', value: event.target.value })
    );
  };

  const toggleDisabled = (event: FormEvent) => {
    event.preventDefault();
    setIsSaved(false);
    setIsDisabled((prev) => !prev);
  };

  return (
    <form className="flex flex-col gap-4 my-8">
      {!entry.createdAt && (
        <div className=" border-t border-appprimary border-dashed text-center pt-4 text-xs text-apptsecondary">
          New entry
        </div>
      )}
      <div className="flex justify-evenly gap-6">
        <Input
          value={title}
          inputName="Subject"
          type={'text'}
          setValue={setTitle}
          disabled={isDisabled}
        />
        <div className="flex w-full items-end gap-6">
          {isDisabled ? (
            <Button
              size="s"
              variant={`${saved ? 'primary' : 'secondary'}`}
              style="border"
              type="button"
              value={`${saved ? 'Saved' : 'Edit'}`}
              onClick={toggleDisabled}
              dashed={saved && true}
            />
          ) : (
            <>
              <Button
                size="s"
                variant="primary"
                style="border"
                type="submit"
                value="Save"
                onClick={handleSubmit}
              />
              <Button
                size="s"
                variant="secondary"
                style="border"
                type="button"
                value="Cancel"
                onClick={handleReset}
              />
              {entry.createdAt && (
                <Button
                  size="s"
                  variant="danger"
                  style="border"
                  type="button"
                  value="Delete"
                  onClick={handleDelete}
                />
              )}
            </>
          )}
        </div>
      </div>
      <div className="flex space-between">
        <Input
          value={created}
          inputName="Date"
          type={'datetime-local'}
          setValue={setCreated}
          disabled={isDisabled}
          customClasses="max-w-[312px]"
        />
        <div className="flex flex-col w-full max-w-[312px]">
          <label
            className="text-s text-apptextprimary font-regular"
            htmlFor={'status'}
          >
            Status
          </label>
          <Select
            id="status"
            selectedStatus={status}
            options={STATUS_OPTIONS}
            handleSelectStatus={handleSelectStatus}
            isDisabled={isDisabled}
          />
        </div>
      </div>
      <Input
        value={notes}
        inputName="Notes"
        setValue={setNotes}
        type={'text'}
        disabled={isDisabled}
        textarea
      />
      {!entry.createdAt && (
        <div className=" border-b border-appprimary border-dashed"></div>
      )}
    </form>
  );
}
