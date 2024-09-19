import { getSession } from 'next-auth/react';

export async function middleware(req) {
  const session = await getSession({ req });

  if (req.nextUrl.pathname === '/user-panel') {
    if (!session || session.user.role !== 'superuser') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  return NextResponse.next();
}
