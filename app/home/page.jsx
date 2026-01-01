'use client'

import { auth } from '@/app/lib/firebase'
import { useEffect, useState } from 'react'
import Protected from '../components/protected'
import Sidebar from '../components/Sidebar'

export default function DashboardPage() {
    return (
      <Protected>
        <Home />
      </Protected>
    )
  }

function Home() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(auth.currentUser)
  }, [])

  if (!user) return <p>Loading...</p>

  return (
    <>
    <div>
      {/* <h1>Dashboard</h1>
      <p>{user.email}</p>
      <img src={user.photoURL} width={50} /> */}
      <Sidebar user={user} />
    </div>
    </>
  )
}
