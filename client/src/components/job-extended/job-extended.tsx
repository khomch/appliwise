import { TColumn, TJob } from '@/utils/types';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import iconNewTab from '../../../public/icon-opentab.svg';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { deleteJob } from '@/services/api';

type JobExtendedProps = {
  job: TJob;
  closeModal: () => void;
};

export function JobExtended({ job, closeModal }: JobExtendedProps) {
  const [url, setUrl] = useState<string>(job.url);
  const [position, setPosition] = useState<string>(job.position);
  const [company, setCompany] = useState<string>(job.company);
  const [description, setDescription] = useState<string>(job.description || '');
  const [salary, setSalary] = useState<string>(job.salary || '');
  const [location, setLocation] = useState<string>(job.location || '');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('SUBMIT');
  };
  const handleReset = (event: FormEvent) => {
    event.preventDefault();
    closeModal();
  };
  const handleDelete = (event: FormEvent) => {
    event.preventDefault();
    deleteJob(job.id, job.columnId).then((res) => console.log(res));
    console.log('DELETE');
    closeModal();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
      <div className="flex justify-evenly gap-6">
        <Input value={url} inputName="URL" type={'text'} setValue={setUrl} />
        <a target="_blank" href={url} className="mt-4 self-center">
          <Image
            src={iconNewTab}
            alt="open in new tab"
            className=" hover:cursor-pointer"
            width={20}
            height={20}
          />
        </a>
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
      {description && (
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
