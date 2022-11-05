import { useState, useEffect } from 'react'
import { supabase } from '@/libs/supabase'
import { type Session } from '@supabase/supabase-js'

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    const fetchSession = async () => {
      const {data} = await supabase.auth.getSession()
      setSession(data.session)
    }
    fetchSession()
    supabase.auth.onAuthStateChange((_, session) => {
      if (session) setSession(session)
    })
  }, [])

  return session
}