import { getSession } from "next-auth/react";

export async function middleware(req) {
  const session = await getSession({ req });

  if (!session) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
  if (session) {
    return NextResponse.redirect(new URL("/user-panel", req.url));
  }

  return NextResponse.next();
}
