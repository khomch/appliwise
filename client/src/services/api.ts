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
