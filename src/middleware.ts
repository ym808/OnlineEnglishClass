import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const ROLE_HOME: Record<string, string> = {
  student: '/dashboard',
  instructor: '/instructor/dashboard',
  admin: '/admin',
}

const PUBLIC_PATHS = ['/', '/login', '/signup', '/join/instructor']

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const { pathname } = request.nextUrl

  // Allow public paths
  if (PUBLIC_PATHS.some(p => pathname === p || pathname.startsWith('/api/'))) {
    return supabaseResponse
  }

  // Unauthenticated → login
  if (!user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // Get role from user metadata
  const role = user.user_metadata?.role as string | undefined

  // Role-based guard
  if (pathname.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL(ROLE_HOME[role ?? 'student'] ?? '/', request.url))
  }
  if (pathname.startsWith('/instructor') && role !== 'instructor' && role !== 'admin') {
    return NextResponse.redirect(new URL(ROLE_HOME[role ?? 'student'] ?? '/', request.url))
  }
  if (
    (pathname.startsWith('/dashboard') || pathname.startsWith('/lessons') || pathname.startsWith('/profile')) &&
    role !== 'student' && role !== 'admin'
  ) {
    return NextResponse.redirect(new URL(ROLE_HOME[role ?? 'instructor'] ?? '/', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
