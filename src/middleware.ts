import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Siyahı/seçim səhifələri (məs. /modules, /lessons) AÇIQDIR — hər kəs gəzə bilər.
// Yalnız konkret bir modula/dərsə girəndə login tələb olunur.
function isProtectedPath(pathname: string): boolean {
  // Konkret modul səhifələri: /learn/well-log, /learn/drilling və s.
  if (pathname.startsWith('/learn/') || pathname === '/learn') return true

  // Konkret dərs səhifələri: /lessons/geology, /lessons/drilling və s.
  // DİQQƏT: bare "/lessons" (seçim səhifəsi) bilərəkdən bura daxil edilmir
  if (pathname.startsWith('/lessons/')) return true

  // İnteraktiv oyun — leaderboard hesab tələb edir
  if (pathname.startsWith('/game')) return true

  return false
}

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
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

  // DİQQƏT: Bu sətri silməyin — sessiyanın etibarlı qalması üçün vacibdir
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  if (isProtectedPath(pathname) && !user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    loginUrl.search = `?redirect=${encodeURIComponent(pathname)}`
    return NextResponse.redirect(loginUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}