import { COOKIE_NAME } from '@/constants';
import { serialize } from 'cookie';

export async function POST(request: Request) {
  const serialized = serialize(COOKIE_NAME, '', {
    httpOnly: true,
    maxAge: -1,
    path: '/',
    secure: false,
    // secure: process.env.NODE_ENV === 'production',
  });
  const response = {
    message: 'Logged out',
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': serialized,
    },
  });
}
