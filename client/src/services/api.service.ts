export async function isUserLogged() {
  try {
    const response = await fetch('/api/auth/user');
    if (!response.ok) {
      return { user: null, error: 'Not authorized' };
    }
    const res = await response.json();
    return { token: res, error: null };
  } catch (error) {
    return { token: null, error: error };
  }
}
