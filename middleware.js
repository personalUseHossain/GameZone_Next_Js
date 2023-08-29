import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(req) {
    const token = req.cookies.get('gamezonetoken')?.value || null;
    const path = req.nextUrl.pathname;

    if (token && ['/login', '/signup'].includes(path)) {
        return NextResponse.redirect('http://localhost:3000');
    }
    return NextResponse.next()
}

//  See "Matching Paths" below to learn more
export const config = {
    matcher: ['/login', '/signup']
}
