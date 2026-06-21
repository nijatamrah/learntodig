'use client'
 
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
 
export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
 
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
 
    const { error } = await supabase.auth.signInWithPassword({ email, password })
 
    setLoading(false)
 
    if (error) {
      setError('Email və ya şifrə yanlışdır')
      return
    }
 
    router.push('/')
    router.refresh()
  }
 
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <h1 className="text-xl font-semibold text-zinc-50">Daxil ol</h1>
        <p className="mt-1 text-sm text-zinc-400">LearntoDig hesabınıza giriş edin</p>
 
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="••••••••"
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
            {loading ? 'Daxil olunur...' : 'Daxil ol'}
          </button>
        </form>
 
        <p className="mt-6 text-center text-sm text-zinc-400">
          Hesabınız yoxdur?{' '}
          <Link href="/register" className="font-medium text-amber-500 hover:text-amber-400">
            Qeydiyyatdan keçin
          </Link>
        </p>
      </div>
    </main>
  )
}
 