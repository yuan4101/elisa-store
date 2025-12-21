import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_PASSWORD = 'camila29';

export async function POST(request: Request) {
  const { password } = await request.json();
  
  if (password === ADMIN_PASSWORD) {
    (await cookies()).set('admin-authenticated', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
    });
    
    return NextResponse.json({ success: true });
  }
  
  return NextResponse.json({ success: false }, { status: 401 });
}