import { TJob } from '../types';
import Job from './job';

type ColumnProps = {
  jobsInColumn: TJob[];
  title: string;
};

function Column({ jobsInColumn, title }: ColumnProps) {
  return (
    <div className="">
      <h2 className="text-lg font-semibold">{title}</h2>
      <ul>
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
