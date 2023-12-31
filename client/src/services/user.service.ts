import { BASE_URL, addHeaders } from '.';

type TUserRegister = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export const registerUser = async (user: TUserRegister) => {
  try {
    const response = await fetch(`${BASE_URL}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.errorMsg);
    }
    localStorage.setItem('accessToken', responseData.token);
    return responseData;
  } catch (err) {
    return err;
  }
};

type TUserLogin = {
  email: string;
  password: string;
};

export const loginUser = async (user: TUserLogin) => {
  try {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const responseData = await response.json();
    if (!response.ok) {
      return null;
    }
    // localStorage.setItem('accessToken', responseData.token);
    return responseData;
  } catch (err) {
    return err;
  }
};

export const getUserProfile = async () => {
  try {
    const userProfile = await fetch(`${BASE_URL}/user/profile`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (userProfile.ok) {
      const response = await userProfile.json();
      return { status: 200, data: response };
    } else {
      return { status: 400, error: 'Error getting userProfile' };
    }
  } catch (error) {
    console.error(error);
  }
};

export const logoutUser = async () => {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });
  } catch (error) {
    console.error(error);
  }
};
