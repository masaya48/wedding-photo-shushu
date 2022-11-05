import Router from 'next/router'
import { Auth } from '@supabase/ui'
import { useEffect, useState } from 'react'
import { supabase } from '@/libs/supabase'

export type Profile = {
  avatar_url: string | null
  username: string | null
  id: string | null
}

const useUser = () => {
  const { user, session } = Auth.useUser()
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        fetch('/api/auth', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ event, session }),
        }).then((res) => res.json())
      }
    )
  }, [])

  useEffect(() => {
    const setupProfile = async () => {
      if (session?.user?.id) {
        const { data: user } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        setProfile(user)
      }
    }
    setupProfile()
  }, [session])

  const signOut = () => {
    supabase.auth.signOut()
    setProfile(null)
    Router.push('/')
  }

  return {
    user,
    session,
    profile,
    signOut,
  }
}

export { useUser }
