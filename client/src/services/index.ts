export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

export const addHeaders = () => {
  const token = localStorage.getItem('accessToken');
  console.log('token: ', token);
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};
