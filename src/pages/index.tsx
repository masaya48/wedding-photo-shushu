import React, { useEffect, useState } from 'react'
import type { GetServerSidePropsContext, NextPage } from 'next'
import { Button, Container } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Link from 'next/link'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'


const Home: NextPage = () => {
  const supabase = useSupabaseClient()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.onAuthStateChange((e) => {
      if (e === 'SIGNED_IN') router.push('/photos')
    })
  }, [router, supabase.auth])

  return (
    <Container className="p-4 font-mono bg-[url('/bg-main.jpg')] bg-cover bg-no-repeat h-[100vh] bg-[top_left_85%]">
      <Button classes={{root: 'absolute bottom-10 m-auto bg-white right-4'}} variant="outlined" endIcon={<ArrowForwardIosIcon />}>
        <Link href="/login">ログイン</Link>
      </Button>
    </Container>
  )
}

export default Home