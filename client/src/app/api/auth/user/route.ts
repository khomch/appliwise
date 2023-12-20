import { COOKIE_NAME } from '@/constants';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(): Promise<void | Response> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME);
  if (!token) {
    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      {
        status: 401,
      }
    );
  }
  const secret = process.env.JWT_SECRET || '';
  try {
    verify(token.value, secret);
    const response = {
      userData: token.value,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Something went wrong. Please try again later.',
      },
      {
        status: 401,
      }
    );
  }
}
