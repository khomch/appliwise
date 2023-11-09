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
  industries?: string;
  notes?: string;
  entries?: [];
  prevId: string | null;
  nextId: string | null;
};

export type TColumn = {
  id: string;
  title: string;
  colNum: string;
  status: string;
  orderOfIds: string[];
  items: [];
};
