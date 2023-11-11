import { Droppable } from '@hello-pangea/dnd';
import { TJob, TJobs } from '../../../utils/types';
import Job from '../job/job';

type ColumnProps = {
  jobsInColumn: TJob[];
  title: string;
  id: string;
  setOpenedJob: (job: TJob) => void;
  setJobs: (jobs: TJobs) => void;
};

function Column({
  jobsInColumn,
  title,
  id,
  setOpenedJob,
  setJobs,
}: ColumnProps) {
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          className={`flex flex-col m-w-[312px] min-w-[312px] min-h-[204px] w-full px-2 border rounded-lg bg-appcolbg h-min my-4 py-4 mx-2 ${
            snapshot.isDraggingOver && 'bg-appprimary30'
          }`}
        >
          <h2 className="text-lg font-semibold">{title}</h2>

          <ul
            className={`flex flex-col `}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {jobsInColumn
              ? jobsInColumn.map((job: TJob, index: number) => (
                  <Job
                    key={job.id}
                    job={job}
                    id={job.id}
                    index={index}
                    setOpenedJob={setOpenedJob}
                    setJobs={setJobs}
                  />
                ))
              : ''}
            {provided.placeholder}
          </ul>
        </div>
      )}
    </Droppable>
  );
}

export default Column;