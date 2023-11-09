import { TJob } from '../types';
import Job from './job';

type ColumnProps = {
  jobsInColumn: TJob[];
  title: string;
};

function Column({ jobsInColumn, title }: ColumnProps) {
  return (
    <div className="flex flex-col m-w-[312px] px-2 border rounded-lg mx-2 bg-appcolbg h-min my-4 py-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <ul className="flex flex-col">
        {jobsInColumn
          ? jobsInColumn.map((job: TJob, index: number) => (
              <Job key={job.id} job={job} index={index} />
            ))
          : ''}
      </ul>
    </div>
  );
}

export default Column;
