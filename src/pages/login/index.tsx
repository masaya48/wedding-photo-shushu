import React from 'react'
import { Auth as AuthComponent } from '@/features/Auth'
import { NextPageWithLayout } from '../_app'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'

const Login: NextPageWithLayout = () => (
  <section className="font-mono">
    <h1 className="p-4 text-3xl text-[#333] underline underline-offset-4">ログイン</h1>
    <main className="h-[calc(var(--vh,1vh)_*_100_-_88px)]">
      <AuthComponent />
    </main>
  </section>
)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx)
  const { data: {session} } = await supabase.auth.getSession()
  if (session) return {
    redirect: {
      destination: '/photos',
      permanent: false
    }
  }
  return {props: {}}
}

export default Login