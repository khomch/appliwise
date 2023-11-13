import { TJob } from '@/utils/types';

const BASE_URL = 'http://localhost:3000';

export async function fetchJobs() {
  try {
    const res = await fetch(BASE_URL + '/job', {
      method: 'GET',
    });
    const jobs = await res.json();
    return jobs;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchOneJob(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/job/${id}`, {
      method: 'GET',
    });
    const jobs = await res.json();
    return jobs;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteJob(id: string, columnId: string) {
  console.log('id: ', id);
  try {
    const res = await fetch(BASE_URL + '/job', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, columnId }),
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
    });
    const columns = await res.json();
    return columns;
  } catch (error) {
    console.error(error);
  }
}

export async function updateColumn(columnId: string, orderOfIds: string[]) {
  try {
    const res = await fetch(BASE_URL + '/column/ids', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
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

export async function addJob(link: string) {
  try {
    const res = await fetch(BASE_URL + '/column/job', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
      headers: { 'Content-Type': 'application/json' },
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
    });
    const entries = await res.json();
    return entries;
  } catch (error) {
    console.error(error);
  }
}
export async function postEntry(entryInfo: Record<string, string>) {
  try {
    console.log('entryInfo: ', entryInfo);

    const res = await fetch(BASE_URL + '/entry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
      headers: { 'Content-Type': 'application/json' },
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id }),
    });

    return res;
  } catch (error) {
    console.error(error);
  }
}
