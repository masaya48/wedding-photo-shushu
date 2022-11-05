import React from 'react'
import type { NextPage } from 'next'
import { Button } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Link from 'next/link'


const Home: NextPage = () => (
  <section className="p-4 font-mono bg-[url('/bg-main.jpg')] bg-cover bg-no-repeat h-[100vh] bg-[top_left_85%]">
    <h1 className="mt-16 text-3xl text-center text-[#333] underline underline-offset-4">Masaya & Akane</h1>
    <p className="text-center text-2xl text-[#333] mt-40 underline underline-offset-4">Welcome to our wedding party!</p>
    <Button className="absolute bottom-10 m-auto bg-white right-4" variant="outlined" endIcon={<ArrowForwardIosIcon />}>
      <Link href="/login">ログイン</Link>
    </Button>
  </section>
)

export default Home