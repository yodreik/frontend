import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get("token")?.value
    
    if (currentUser && request.nextUrl.pathname.startsWith('/auth')) {
        return Response.redirect(new URL('/dashboard', request.url))
    }
    
    if (!currentUser && request.nextUrl.pathname !== "/" && !request.nextUrl.pathname.startsWith('/auth')) {
        return Response.redirect(new URL('/auth', request.url))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}