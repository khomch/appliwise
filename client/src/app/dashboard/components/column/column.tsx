import { Droppable } from '@hello-pangea/dnd';
import { TJob } from '../../../../types/types';
import Job from '../job/job';
import { Button } from '../../../../components/ui/button/button';
import { useRouter } from 'next/navigation';

type ColumnProps = {
  jobsInColumn: TJob[];
  title: string;
  id: string;
};

function Column({ jobsInColumn, title, id }: ColumnProps) {
  const router = useRouter();
  const handleAddNewJobClick = () => {
    router.push(`/dashboard/job/add?columnId=${id}`);
  };

  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          className={`flex flex-col m-w-[312px] min-w-[312px] w-full px-2 border rounded-lg bg-appcolbg h-min my-4 mx-2 ${
            snapshot.isDraggingOver && 'bg-appprimary30'
          }`}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold py-4">{title}</h2>
            <div className="w-full max-w-[40px]">
              <Button
                value="+"
                type="button"
                variant="secondary"
                style="border"
                size="s"
                customStyle={'border-0'}
                onClick={handleAddNewJobClick}
              />
            </div>
          </div>
          <ul
            className={`flex flex-col min-h-[20px]`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {jobsInColumn
              ? jobsInColumn.map(
                  (job: TJob, index: number) =>
                    job && (
                      <Job key={job.id} job={job} id={job.id} index={index} />
                    )
                )
              : ''}
            {provided.placeholder}
          </ul>
          <Button
            value="+"
            type="button"
            variant="secondary"
            style="border"
            size="xl"
            customStyle={'my-2'}
            dashed
            onClick={handleAddNewJobClick}
          />
        </div>
      )}
    </Droppable>
  );
}

export default Column;
