import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getUserData } from './utils/getUserData';

// This function can be marked `async` if using `await` inside
export async function middleware(req) {
    const token = req.cookies.get('gamezonetoken')?.value || null;
    const path = req.nextUrl.pathname;
    if (token && ['/login', '/signup'].includes(path)) {
        return NextResponse.redirect('http://localhost:3000');
    }
    if (!token && path.startsWith('/game')) {
        return NextResponse.redirect('http://localhost:3000/login');
    }

    if (path.startsWith('/dashboard')) {

        const userData = await getUserData(token);
        if (userData.isAdmin === undefined) {
            return NextResponse.redirect('http://localhost:3000');
        }
    }
    return NextResponse.next();
}

//  See "Matching Paths" below to learn more
export const config = {
    matcher: ['/login', '/signup', '/dashboard/:path*', '/game/:path*']
}
