'use client'
import { auth } from '@/app/lib/firebase'

export default function Dashboard() {
  return (
    <button onClick={() => auth.signOut()}>
      Logout
    </button>
  )
}

