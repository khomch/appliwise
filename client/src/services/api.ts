import { TJob } from '@/types/types';
import { BASE_URL, addHeaders } from '.';

export async function fetchJobs() {
  try {
    const res = await fetch(BASE_URL + '/job', {
      method: 'GET',
      headers: addHeaders(),
    });
    const jobs = await res.json();
    return jobs;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchOneJob(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/job/${id}`, { headers: addHeaders() });
    const jobs = await res.json();
    return jobs;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteJob(id: string) {
  try {
    const res = await fetch(BASE_URL + '/job', {
      method: 'DELETE',
      headers: addHeaders(),
      body: JSON.stringify({ id }),
    });

    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchColumns() {
  try {
    const res = await fetch(BASE_URL + '/column', {
      method: 'GET',
      headers: addHeaders(),
    });
    const columns = await res.json();
    return columns;
  } catch (error) {
    console.error(error);
  }
}

export async function updateColumn(columnId: string, orderOfIds: string[]) {
  try {
    const res = await fetch(BASE_URL + '/column/one', {
      method: 'PUT',
      headers: addHeaders(),
      body: JSON.stringify({
        id: columnId,
        orderOfIds: orderOfIds,
      }),
    });
    const jobs = await res.json();
    return jobs;
  } catch (error) {
    console.error(error);
  }
}

type TUpdateTwoColumns = {
  columnFromId: string;
  columnToId: string;
  jobId: string;
  columnToOrderOfIds: string[];
};

export async function sendUpdateTwoColumns(data: TUpdateTwoColumns) {
  try {
    const res = await fetch(BASE_URL + '/column/two', {
      method: 'PUT',
      headers: addHeaders(),
      body: JSON.stringify(data),
    });
    const jobs = await res.json();
    return jobs;
  } catch (error) {
    console.error(error);
  }
}

export async function addJob(link: string) {
  try {
    const res = await fetch(BASE_URL + '/column/job', {
      method: 'POST',
      headers: addHeaders(),
      body: JSON.stringify({ url: link }),
    });
    const job = await res.json();
    return job;
  } catch (error) {
    console.error(error);
  }
}

export async function toggleFavJob(id: string): Promise<TJob | undefined> {
  try {
    const res = await fetch(BASE_URL + '/job/fav', {
      method: 'PUT',
      headers: addHeaders(),
      body: JSON.stringify({ id: id }),
    });
    const job = await res.json();
    return job;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchEntries(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/entry/${id}`, {
      method: 'GET',
      headers: addHeaders(),
    });
    const entries = await res.json();
    return entries;
  } catch (error) {
    console.error(error);
  }
}
export async function postEntry(entryInfo: Record<string, string>) {
  try {
    const res = await fetch(BASE_URL + '/entry', {
      method: 'POST',
      headers: addHeaders(),
      body: JSON.stringify({
        title: entryInfo.title,
        notes: entryInfo.notes,
        status: entryInfo.status,
        itemId: entryInfo.itemId,
      }),
    });
    const newEntry = await res.json();
    return newEntry;
  } catch (error) {
    console.error(error);
  }
}

export async function updateEntry(entryInfo: Record<string, string>) {
  try {
    const res = await fetch(BASE_URL + '/entry', {
      method: 'PUT',
      headers: addHeaders(),
      body: JSON.stringify({
        id: entryInfo.id,
        title: entryInfo.title,
        notes: entryInfo.notes,
        status: entryInfo.status,
        itemId: entryInfo.itemId,
      }),
    });
    const updatedEntry = await res.json();
    return updatedEntry;
  } catch (error) {
    console.error(error);
  }
}
export async function deleteEntry(id: string) {
  try {
    const res = await fetch(BASE_URL + '/entry', {
      method: 'DELETE',
      headers: addHeaders(),
      body: JSON.stringify({ id: id }),
    });

    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function handleLinkedInParsing(url: string, columnId: string) {
  try {
    const res = await fetch(BASE_URL + '/job/parse', {
      method: 'POST',
      mode: 'cors',
      headers: addHeaders(),
      body: JSON.stringify({ url, columnId }),
    });
    const newJob = await res.json();
    return newJob;
  } catch (error) {
    console.error(error);
  }
}

export async function postJob(
  jobInfo: Record<string, string>,
  status?: string
) {
  try {
    const res = await fetch(BASE_URL + '/job', {
      method: 'POST',
      headers: addHeaders(),
      body: JSON.stringify({ jobInfo, status }),
    });
    const newJob = await res.json();
    return newJob;
  } catch (error) {
    console.error(error);
  }
}

export async function updateJob(jobInfo: Record<string, string>) {
  try {
    const res = await fetch(BASE_URL + '/job', {
      method: 'PUT',
      headers: addHeaders(),
      body: JSON.stringify(jobInfo),
    });
    const updatedJob = await res.json();
    return updatedJob;
  } catch (error) {
    console.error(error);
  }
}
