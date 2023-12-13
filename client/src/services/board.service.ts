import { BASE_URL } from '.';

export async function fetchBoards() {
  const token = localStorage.getItem('accessToken');
  try {
    const bords = await fetch(`${BASE_URL}/board`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (bords.ok) {
      const response = await bords.json();
      return { status: 200, data: response };
    } else {
      return { status: 400, error: 'Error editing project' };
    }
  } catch (error) {
    console.error(error);
  }
}
