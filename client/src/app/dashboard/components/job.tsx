import Image from 'next/image';
import { TJob } from '../types';
import iconFav from '../../../../public/icon-fav.svg';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type JobProps = {
  job: TJob;
  id: string;
};

function Job(props: JobProps) {
  const { job } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const handleClick = () => {
    console.log('CLICKED');
  };

  return (
    <li
      style={style}
      className="w-[296px] p-4 border border-appborder rounded-lg my-1 bg-appbg list-none"
      ref={setNodeRef}
      onClick={handleClick}
    >
      <div {...attributes} {...listeners}>
        <h3 className="font-medium text-lg truncate py-2 text-apptprimary">
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
            <p className="text-s text-apptprimary truncate">{job.company}</p>
            <p className="text-xs text-apptsecondary truncate">
              {job.location}
            </p>
          </div>
          <div className="flex w-full justify-end items-center">
            <Image src={iconFav} alt="make favoutite" className="" />
          </div>
        </div>
      </div>
    </li>
  );
}

export default Job;
