import { COOKIE_MAX_AGE, COOKIE_NAME } from '@/constants';
import { loginUser } from '@/services/user.service';
import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  const { email, password } = body;

  if (!(email && password)) return;
  const user = await loginUser({ email, password });
  if (!user) {
    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      {
        status: 401,
      }
    );
  }
  const secret = process.env.JWT_SECRET || 'secret';
  const token = sign(
    {
      id: user.id,
    },
    secret,
    {
      expiresIn: COOKIE_MAX_AGE,
    }
  );
  const serialized = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: COOKIE_MAX_AGE,
    path: '/',
    secure: false,
    sameSite: false,
    // domain: "appliwise-server.fly.dev",
    // secure: process.env.NODE_ENV === 'production',
  });
  const response = {
    message: 'Authenticated',
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': serialized,
    },
  });
}
