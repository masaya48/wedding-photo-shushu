import React from 'react'
import type { GetServerSidePropsContext, NextPage } from 'next'
import { Button, Container } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Link from 'next/link'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'


const Home: NextPage = () => (
  <Container className="p-4 font-mono bg-[url('/bg-main.jpg')] bg-cover bg-no-repeat h-[100vh] bg-[top_left_85%]">
    <Button classes={{root: 'absolute bottom-10 m-auto bg-white right-4'}} variant="outlined" endIcon={<ArrowForwardIosIcon />}>
      <Link href="/login">ログイン</Link>
    </Button>
  </Container>
)

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   const supabase = createServerSupabaseClient(ctx)
//   const { data: {session} } = await supabase.auth.getSession()
//   if (session) return {
//     redirect: {
//       destination: '/photos',
//       permanent: false
//     }
//   }
//   return {props: {}}
// }

export default Home