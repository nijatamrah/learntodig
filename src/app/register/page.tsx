'use client'
 
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
 
export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClient()
 
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
 
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
 
    if (password.length < 6) {
      setError('Şifrə ən azı 6 simvol olmalıdır')
      setLoading(false)
      return
    }
 
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    })
 
    setLoading(false)
 
    if (error) {
      setError(
        error.message === 'User already registered'
          ? 'Bu email ilə artıq hesab mövcuddur'
          : 'Qeydiyyat zamanı xəta baş verdi: ' + error.message
      )
      return
    }
 
    setSuccess(true)
  }
 
  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
        <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
            <svg className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-zinc-50">Email-inizi yoxlayın</h1>
          <p className="mt-2 text-sm text-zinc-400">
            <span className="text-zinc-200">{email}</span> ünvanına təsdiq linki göndərdik.
            Hesabınızı aktivləşdirmək üçün linkə klikləyin.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block text-sm font-medium text-amber-500 hover:text-amber-400"
          >
            Giriş səhifəsinə qayıt →
          </Link>
        </div>
      </main>
    )
  }
 
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <h1 className="text-xl font-semibold text-zinc-50">Hesab yarat</h1>
        <p className="mt-1 text-sm text-zinc-400">LearntoDig platformasına qoşulun</p>
 
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-zinc-300">
              Ad Soyad
            </label>
            <input
              id="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="Nicat Əmrahlı"
            />
          </div>
 
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="ad@nümunə.com"
            />
          </div>
 
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
              Şifrə
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="ən azı 6 simvol"
            />
          </div>
 
          {error && (
            <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>
          )}
 
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-amber-500 px-4 py-2 font-medium text-zinc-950 transition hover:bg-amber-400 disabled:opacity-50"
          >
            {loading ? 'Yaradılır...' : 'Hesab yarat'}
          </button>
        </form>
 
        <p className="mt-6 text-center text-sm text-zinc-400">
          Artıq hesabınız var?{' '}
          <Link href="/login" className="font-medium text-amber-500 hover:text-amber-400">
            Daxil olun
          </Link>
        </p>
      </div>
    </main>
  )
}
 