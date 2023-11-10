export type TJob = {
  id: string;
  columnId: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  img: string;
  position: string;
  company: string;
  description?: string;
  location?: string;
  salary?: string;
  seniorityLevel?: string;
  jobFunction?: string;
  employmentType?: string;
  isFavourite?: boolean;
  industries?: string;
  notes?: string;
  entries?: [];
  prevId: string | null;
  nextId: string | null;
};

export type TJobs = {
  [key: string]: TJob;
};

export type TColumn = {
  id: string;
  title: string;
  colNum: string;
  status: string;
  orderOfIds: string[];
  index: number;
  items: [];
};

export type TColumns = {
  [key: string]: TColumn;
};
