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
  lastStatus?: string;
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
  colNum: number;
  orderOfIds: string[];
  items: [];
  jobs: TJob[];
};

export type TColumns = {
  [key: string]: TColumn;
};

export type TBoards = {
  id: string;
  title: string;
  userId: string;
  columns: TColumn[];
};

export type TEntry = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  notes: string;
  status: string;
  itemId: string;
};

export type TUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};
