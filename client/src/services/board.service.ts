import { BASE_URL, addHeaders } from '.';

export async function fetchBoards() {
  try {
    const bords = await fetch(`${BASE_URL}/board`, {
      method: 'GET',
      mode: 'cors',
      headers: addHeaders(),
    });

    if (bords.ok) {
      const response = await bords.json();
      return { status: 200, data: response };
    } else {
      return { status: 400, error: 'Error editing project' };
    }
  } catch (error) {
    // console.error(error);
  }
}
