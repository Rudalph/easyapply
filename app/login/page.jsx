'use client'

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@/app/lib/firebase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const signInWithGoogle = async () => {
    setIsLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      router.push('/home')
    } catch (error) {
      console.error('Error signing in:', error)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Left/Top Section - Black Background */}
      <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
        {/* Subtle diagonal overlay lines for depth */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent rotate-12 scale-150"></div>
        </div>

        <div className="relative z-10 text-center px-8 py-16 md:py-0 max-w-2xl">
          {/* App Logo */}
          <div className="mb-12">
            <div className="w-32 h-32 mx-auto bg-white rounded-3xl flex items-center justify-center shadow-2xl">
              <span className="text-black text-6xl font-bold">Ez</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Welcome Back
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-lg mx-auto">
            Sign in to access your personalized dashboard and pick up right where you left off.
          </p>

          {/* Decorative elements */}
          <div className="mt-12 flex justify-center gap-8">
            <div className="w-24 h-1 bg-white/50 rounded-full"></div>
            <div className="w-12 h-1 bg-white/30 rounded-full"></div>
            <div className="w-24 h-1 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Right/Bottom Section - White Login Card */}
      <div className="flex-1 bg-white flex items-center justify-center px-8 py-16 md:py-0">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-12 border border-gray-100">
            <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-4">
              Sign In
            </h2>
            <p className="text-gray-600 text-center mb-10 text-lg">
              Continue with your Google account
            </p>

            <button
              onClick={signInWithGoogle}
              disabled={isLoading}
              className="group relative w-full flex items-center justify-center gap-5 bg-black text-white rounded-2xl px-8 py-5 font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  {/* Google Icon - White version */}
                  <svg className="w-7 h-7" viewBox="0 0 24 24">
                    <path
                      fill="#FFFFFF"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#FFFFFF"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FFFFFF"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#FFFFFF"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="group-hover:translate-x-2 transition-transform">
                    Continue with Google
                  </span>
                </>
              )}
            </button>

            <p className="mt-10 text-sm text-gray-500 text-center leading-relaxed">
              By continuing, you agree to our{' '}
              <span className="underline hover:text-black transition">Terms of Service</span>{' '}
              and{' '}
              <span className="underline hover:text-black transition">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}