import { useAppDispatch } from '@/app/hooks/hooks';
import { addNewJob, deleteJobFromState } from '@/app/store/slices/jobSlice';
import { deleteJob, handleLinkedInParsing } from '@/services/api';
import { TJob } from '@/utils/types';
import Image from 'next/image';
import { FormEvent, useEffect, useState } from 'react';
import iconNewTab from '../../../../public/icon-opentab.svg';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { LINKEDIN_JOBS } from '@/utils/constants';
import { handleAddNewJobToColumn } from '@/app/store/slices/columnSlice';

type JobExtendedProps = {
  job: TJob;
  closeModal: () => void;
  isNew?: boolean;
  status?: string;
};

export function JobExtended({
  job,
  closeModal,
  isNew = false,
  status,
}: JobExtendedProps) {
  const dispatch = useAppDispatch();
  const [isParsable, setIsParsable] = useState<boolean>(false);
  const [isParsed, setIsParsed] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(job.url);
  const [position, setPosition] = useState<string>(job.position);
  const [company, setCompany] = useState<string>(job.company);
  const [description, setDescription] = useState<string>(job.description || '');
  const [salary, setSalary] = useState<string>(job.salary || '');
  const [location, setLocation] = useState<string>(job.location || '');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (isNew && url.startsWith(LINKEDIN_JOBS)) {
      setIsParsable(true);
    } else {
      setIsParsable(false);
    }
  }, [url]);

  const handleParsing = () => {
    if (isNew && url.startsWith(LINKEDIN_JOBS)) {
      handleLinkedInParsing(url, status).then((res) => {
        setUrl(res.url);
        setPosition(res.position);
        setCompany(res.company);
        setDescription(res.description);
        setSalary(res.salary || '');
        setLocation(res.location);
        dispatch(handleAddNewJobToColumn(res));
        dispatch(addNewJob(res));
        setIsParsed(true);
      });
    }
  };

  const handleReset = (event: FormEvent) => {
    event.preventDefault();
    closeModal();
  };
  const handleDelete = (event: FormEvent) => {
    event.preventDefault();
    deleteJob(job.id).then((res) => {
      if (res?.ok) dispatch(deleteJobFromState(job.id));
    });
    closeModal();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {!isNew && (
        <>
          <h1 className="text-xl font-medium truncate mt-2">{job.position}</h1>
          <div className="flex self-end w-[88px]">
            <Button
              value={'Delete'}
              style={'border'}
              variant={'danger'}
              size={'m'}
              type="button"
              onClick={handleDelete}
            />
          </div>
        </>
      )}
      <div className="flex justify-evenly gap-6">
        <Input value={url} inputName="URL" type={'text'} setValue={setUrl} />
        {!isNew ? (
          <a target="_blank" href={url} className="mt-4 self-center">
            <Image
              src={iconNewTab}
              alt="open in new tab"
              className=" hover:cursor-pointer"
              width={20}
              height={20}
            />
          </a>
        ) : (
          <Button
            value={
              (!isParsed && url && isParsable && 'Start parsing') ||
              (!isParsed &&
                url &&
                !isParsable &&
                "Can't parse, fill in the form") ||
              (isParsed && 'Successfully parsed') ||
              'Enter a link'
            }
            style={'border'}
            variant={
              (!isParsed && url && isParsable && 'primary') || 'secondary'
            }
            size={'s'}
            type="button"
            onClick={handleParsing}
            customStyle="self-end"
            disabled={((isParsed || (url && isParsable)) && true) || false}
          />
        )}
      </div>

      <div className="flex justify-evenly gap-6">
        <Input
          value={position}
          inputName="Position"
          type={'text'}
          setValue={setPosition}
        />
        <Input
          value={company}
          inputName="Company"
          type={'text'}
          setValue={setCompany}
        />
      </div>
      {(description || isNew) && (
        <Input
          value={description}
          inputName="Description"
          type={'text'}
          textarea
          setValue={setDescription}
        />
      )}
      <div className="flex justify-evenly gap-6">
        <Input
          value={salary}
          inputName="Salary"
          type={'text'}
          setValue={setSalary}
        />
        <Input
          value={location}
          inputName="Location"
          type={'text'}
          setValue={setLocation}
        />
      </div>
      <div className="flex justify-evenly gap-6">
        <Button type="submit" variant="primary" value="Save" />
        <Button
          type="reset"
          variant="secondary"
          value="Cancel"
          onClick={handleReset}
        />
      </div>
    </form>
  );
}
