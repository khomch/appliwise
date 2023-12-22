import { useAppDispatch } from '@/hooks/hooks';
import { STATUS_OPTIONS } from '@/constants';
import { Draggable } from '@hello-pangea/dnd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import iconNoImage from '../../../../../public/icon-noimage.svg';
import { toggleFavJob } from '../../../../services/job.service';
import { TJob } from '../../../../types/types';
import { setFavourite } from '@/store/slices/columnSlice';

type JobProps = {
  job: TJob;
  id: string;
  index: number;
};

function Job(props: JobProps) {
  const dispatch = useAppDispatch();
  const { job, id, index } = props;

  const archived =
    job.lastStatus === 'archive' ||
    job.lastStatus === 'cancelled' ||
    job.lastStatus === 'not-consider' ||
    (job.lastStatus && job.lastStatus?.startsWith('reject'));

  const lastStatusValue: any | undefined =
    job.lastStatus &&
    STATUS_OPTIONS.find((option) => option.value === job.lastStatus);

  const router = useRouter();

  const handleClick = () => {
    router.push(`/dashboard/job/entries/${job.id}`);
  };

  const handleFavClick = async () => {
    const newState = await toggleFavJob(job.id);
    if (newState !== undefined) {
      dispatch(setFavourite({ id: job.id, newState, columnId: job.columnId }));
    }
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          className={`w-[296px] min-h-[80px] p-4 border border-appborder shadow-sm rounded-lg my-1 bg-appbg list-none hover:shadow-md group ${
            snapshot.isDragging && 'border-appprimary'
          } ${archived && ' bg-appcolbg'}`}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <div>
            <h3
              className={`font-medium text-lg truncate py-2 text-apptprimary hover:cursor-pointer transition-colors group-hover:text-appprimary  hover:underline ${
                archived && 'text-apptsecondary py-0'
              }`}
              onClick={handleClick}
            >
              {job.position}
            </h3>
            {job.salary && !archived && (
              <p className="text-xs text-apptsecondary">Salary: {job.salary}</p>
            )}
            {archived && (
              <p className="text-xs text-apptsecondary">
                {job.company} — {lastStatusValue.text}
              </p>
            )}
            {!archived && (
              <div className="flex w-full mt-2">
                <Image
                  src={job.img || iconNoImage}
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
                <div className="flex w-full gap-2 justify-end items-center">
                  <Link
                    href={`/dashboard/job/details/${job.id}?columnId=${job.columnId}`}
                    className="hidden group-hover:block"
                  >
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.767609 12.2705C0.767609 13.5596 1.8223 14.6142 3.11136 14.6142C4.40042 14.6142 5.46488 13.5596 5.46488 12.2705C5.46488 10.9814 4.40042 9.92674 3.11136 9.92674C1.8223 9.92674 0.767609 10.9814 0.767609 12.2705ZM1.96878 12.2705C1.96878 11.626 2.47659 11.1279 3.12113 11.1279C3.76566 11.1279 4.2637 11.626 4.2637 12.2705C4.2637 12.915 3.76566 13.4131 3.12113 13.4131C2.47659 13.4131 1.96878 12.915 1.96878 12.2705ZM3.12113 0.932602C2.68167 0.932602 2.33011 1.28416 2.33011 1.72362V10.7178H3.90238V1.72362C3.90238 1.28416 3.56058 0.932602 3.12113 0.932602ZM3.12113 18.1201C3.56058 18.1201 3.90238 17.7685 3.90238 17.3681V13.9697H2.33011V17.3681C2.33011 17.7685 2.68167 18.1201 3.12113 18.1201ZM7.34964 6.62596C7.34964 7.91502 8.41409 8.96971 9.70316 8.96971C10.9922 8.96971 12.0469 7.91502 12.0469 6.62596C12.0469 5.3369 10.9922 4.28221 9.70316 4.28221C8.41409 4.28221 7.34964 5.3369 7.34964 6.62596ZM8.56058 6.62596C8.56058 5.99119 9.06839 5.48338 9.70316 5.48338C10.3477 5.48338 10.8457 5.99119 10.8457 6.62596C10.8457 7.27049 10.3477 7.76854 9.70316 7.76854C9.06839 7.76854 8.56058 7.27049 8.56058 6.62596ZM9.70316 0.932602C9.2637 0.932602 8.92191 1.28416 8.92191 1.68455V4.94627H10.4942V1.68455C10.4942 1.28416 10.1426 0.932602 9.70316 0.932602ZM9.70316 18.1201C10.1426 18.1201 10.4942 17.7685 10.4942 17.3291V8.17869H8.92191V17.3291C8.92191 17.7685 9.2637 18.1201 9.70316 18.1201ZM13.9512 12.2705C13.9512 13.5596 15.0059 14.6142 16.2949 14.6142C17.584 14.6142 18.6387 13.5596 18.6387 12.2705C18.6387 10.9814 17.584 9.92674 16.2949 9.92674C15.0059 9.92674 13.9512 10.9814 13.9512 12.2705ZM15.1524 12.2705C15.1524 11.626 15.6602 11.1279 16.2949 11.1279C16.9492 11.1279 17.4375 11.626 17.4375 12.2705C17.4375 12.915 16.9492 13.4131 16.2949 13.4131C15.6602 13.4131 15.1524 12.915 15.1524 12.2705ZM16.2949 0.932602C15.8555 0.932602 15.5039 1.28416 15.5039 1.72362V10.7666H17.0762V1.72362C17.0762 1.28416 16.7344 0.932602 16.2949 0.932602ZM16.2949 18.1201C16.7344 18.1201 17.0762 17.7685 17.0762 17.3681V13.833H15.5039V17.3681C15.5039 17.7685 15.8555 18.1201 16.2949 18.1201Z"
                        fill="#767F8C"
                      />
                    </svg>
                  </Link>
                  <div
                    className="hover:cursor-pointer"
                    onClick={handleFavClick}
                  >
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
                </div>
              </div>
            )}
          </div>
        </li>
      )}
    </Draggable>
  );
}

export default Job;
