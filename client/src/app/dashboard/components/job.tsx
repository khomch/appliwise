import { Draggable } from '@hello-pangea/dnd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Dispatch } from 'react';
import { toggleFavJob } from '../../../../services/api';
import { TJob, TJobs } from '../types';

type JobProps = {
  job: TJob;
  id: string;
  index: number;
  setOpenedJob: (job: TJob) => void;
  setJobs: Dispatch<React.SetStateAction<TJobs>>;
};

function Job(props: JobProps) {
  const { job, id, index, setOpenedJob, setJobs } = props;
  const router = useRouter();

  const handleClick = () => {
    console.log('CLICKED');
    setOpenedJob(job);
    router.push('/dashboard?showDialog=y');
  };

  const handleFavClick = async () => {
    const newState = await toggleFavJob(job.id);
    if (newState !== undefined) {
      setJobs((prev: TJobs) => ({ ...prev, [job.id]: newState }));
    }
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          className={`w-[296px] p-4 border border-appborder shadow-sm rounded-lg my-1 bg-appbg list-none hover:shadow-md ${
            snapshot.isDragging && 'border-appprimary'
          } `}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <div>
            <h3
              className="font-medium text-lg truncate py-2 text-apptprimary hover:text-appprimary hover:cursor-pointer transition-colors"
              onClick={handleClick}
            >
              {job.position}
            </h3>
            <div className="flex w-full mt-2">
              <Image
                src={job.img}
                alt={`Logo of ${job.company}`}
                width={48}
                height={48}
                className="w-12 h-12 rounded"
              />
              <div className="mx-2 max-w-[152px]">
                <p className="text-s text-apptprimary truncate">
                  {job.company}
                </p>
                <p className="text-xs text-apptsecondary truncate">
                  {job.location}
                </p>
              </div>
              <div className="flex w-full justify-end items-center">
                <div className="hover:cursor-pointer" onClick={handleFavClick}>
                  <svg
                    className={`${
                      job.isFavourite && 'fill-appprimary'
                    } hover:fill-appprimary`}
                    width="14"
                    height="20"
                    viewBox="0 0 14 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 19L6.99931 15.25L1 19V2.5C1 2.30109 1.07902 2.11032 1.21967 1.96967C1.36032 1.82902 1.55109 1.75 1.75 1.75H12.25C12.4489 1.75 12.6397 1.82902 12.7803 1.96967C12.921 2.11032 13 2.30109 13 2.5V19Z"
                      stroke="#007AFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {/* <Image
                  src={iconFav}
                  alt="make favoutite"
                  className="hover:cursor-pointer"
                  onClick={handleFavClick}
                /> */}
              </div>
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
}

export default Job;
