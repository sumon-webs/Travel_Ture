import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    const pathname = request.nextUrl.pathname;

    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })

    if(pathname =='/destinations'){
        return NextResponse.next()
    }

    if (session) {
        return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/log-in', request.url))
}

export const config = {
    matcher: ['/destinations/:path*', '/my-bookings'],
}