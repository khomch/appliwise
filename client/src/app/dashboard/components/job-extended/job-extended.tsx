import { useAppDispatch } from '@/hooks/hooks';
import {
  deleteJob,
  handleLinkedInParsing,
  postJob,
  updateJob,
} from '@/services/job.service';
import { TJob } from '@/types/types';
import Image from 'next/image';
import { FormEvent, useEffect, useState } from 'react';
import iconNewTab from '../../../../../public/icon-opentab.svg';
import { Button } from '../../../../components/ui/button/button';
import { Input } from '../../../../components/ui/input/input';
import { LINKEDIN_JOBS } from '@/constants';
import {
  addNewJob,
  deleteJobFromState,
  handleAddNewJobToColumn,
} from '@/store/slices/columnSlice';

type JobExtendedProps = {
  job: TJob;
  closeModal: () => void;
  isNew?: boolean;
  columnId: string;
};

export function JobExtended({
  job,
  closeModal,
  isNew = false,
  columnId,
}: JobExtendedProps) {
  const dispatch = useAppDispatch();
  const [jobId, setJobId] = useState<string>(job.id);
  const [isNewJob, setIsNewJob] = useState<boolean>(isNew);
  const [isParsable, setIsParsable] = useState<boolean>(false);
  const [isParsed, setIsParsed] = useState<boolean>(false);
  const [isUpdated, setIsUdated] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(job.url);
  const [position, setPosition] = useState<string>(job.position);
  const [company, setCompany] = useState<string>(job.company);
  const [description, setDescription] = useState<string>(job.description || '');
  const [salary, setSalary] = useState<string>(job.salary || '');
  const [location, setLocation] = useState<string>(job.location || '');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isNewJob) {
      const jobInfo = {
        url,
        position,
        company,
        description,
        salary,
        location,
      };
      postJob(jobInfo, columnId).then((res) => {
        if (res.id) {
          dispatch(handleAddNewJobToColumn(res));
          dispatch(addNewJob(res));
          closeModal();
        } else {
          console.log('Error while adding a job');
        }
      });
    } else {
      const jobInfo = {
        url,
        position,
        company,
        description,
        salary,
        location,
        id: jobId,
      };
      updateJob(jobInfo, columnId).then((res) => {
        if (res.id) {
          dispatch(addNewJob(res));
          setIsParsed(false);
          setIsUdated(true);
        } else {
          console.log('Error while updating a job');
        }
      });
    }
  };

  useEffect(() => {
    if (isNewJob && url.startsWith(LINKEDIN_JOBS)) {
      setIsParsable(true);
    } else {
      setIsParsable(false);
    }
  }, [url]);

  const handleParsing = () => {
    if (isNewJob && url.startsWith(LINKEDIN_JOBS)) {
      handleLinkedInParsing(url, columnId).then((res) => {
        setUrl(res.url);
        setPosition(res.position);
        setCompany(res.company);
        setDescription(res.description);
        setSalary(res.salary || '');
        setLocation(res.location);
        dispatch(handleAddNewJobToColumn(res));
        dispatch(addNewJob(res));
        setJobId(res.id);
        setIsParsed(true);
        setIsNewJob(false);
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
      if (res?.ok)
        dispatch(deleteJobFromState({ id: job.id, columnId: job.columnId }));
    });
    closeModal();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {!isNewJob && (
        <>
          <h1 className="text-xl font-medium truncate mt-2">{position}</h1>
          <div className="flex w-full justify-between items-center">
            <p className="text-appprimary80 text-xs">
              {isParsed && 'Successfully parsed'}
              {isUpdated && 'Successfully updated'}
            </p>
            <div className=" w-[88px]">
              <Button
                value={'Delete'}
                style={'border'}
                variant={'danger'}
                size={'m'}
                type="button"
                onClick={handleDelete}
              />
            </div>
          </div>
        </>
      )}
      <div className="flex justify-evenly gap-6">
        <Input value={url} inputName="URL" type={'text'} setValue={setUrl} />
        {!isNewJob ? (
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
              'Paste link to Job on LinkedIn'
            }
            style={'border'}
            variant={
              (!isParsed && url && isParsable && 'primary') || 'secondary'
            }
            size={'s'}
            type="button"
            onClick={handleParsing}
            customStyle="self-end"
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
      {(description || isNewJob) && (
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
        <Button
          type="submit"
          variant="primary"
          value={isNewJob ? 'Save' : 'Update'}
        />
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
