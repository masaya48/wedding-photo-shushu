import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import { Button } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Link from 'next/link'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { config, useTransition } from 'react-spring'

const ANIMATION_TITLE = ['P', 'h', 'o', 't', 'o', '\t','C', 'o', 'n', 't', 'e', 's', 't']

const Home: NextPage = () => {
  const supabase = useSupabaseClient()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.onAuthStateChange((e) => {
      if (e === 'SIGNED_IN') router.push('/photos')
    })
  }, [router, supabase.auth])

  const transition = useTransition(ANIMATION_TITLE, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    delay: 200,
    config: config.molasses,
  })

  return (
    <section className="relative p-4 font-mono bg-[url('/bg-main.jpg')] bg-cover bg-no-repeat h-[calc(var(--vh,1vh)_*_100)] bg-[top_left_45%]">
      <div className="font-serif">
        <h1 className="text-center text-5xl text-yellow-300">Photo Contest</h1>
        <p>2022.11.19 Masaya & Akane</p>
      </div>
      <div className="absolute bottom-10 m-auto bg-white right-4">
        <Button variant="outlined" size="large" endIcon={<ArrowForwardIosIcon />}>
          <Link href="/login">ログイン</Link>
        </Button>
      </div>
    </section>
  )
}

export default Home