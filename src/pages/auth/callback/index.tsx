import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { Database } from '@/libs/database.types'
import { LinearProgress } from '@mui/material'


const AuthCallback: NextPage = () => {
  const supabase = useSupabaseClient<Database>()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (_, session) => {
      const {data: profile} = await supabase.from('profiles').select('*').eq('id', session?.user.id).single()
      if (!profile) {
        router.push('/profile', undefined, {shallow: true})
        return
      }
      router.push('/photos', undefined, {shallow: true})
    })
  }, [router, supabase])
  return (
    <LinearProgress />
  )
}

export default AuthCallback