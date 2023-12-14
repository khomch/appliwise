export const BASE_URL = 'http://localhost:3000';

export const addHeaders = () => {
  const token = localStorage.getItem('accessToken');
  console.log('token: ', token);
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};
