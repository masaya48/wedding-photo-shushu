import React from 'react'
import { Profile as ProfileComponent } from '@/features/Profile'
import { NextPageWithLayout } from '../_app'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'

const Profile: NextPageWithLayout = () => (
  <section className="font-mono">
    <h1 className="p-4 text-3xl text-[#333] underline underline-offset-4">Profile</h1>
    <main>
      <section className="p-4 font-mono">
      <ProfileComponent />
    </section>
    </main>
  </section>
)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx)
  const {data: {session}} = await supabase.auth.getSession()
  if (!session) return {
    redirect: {
      permanent: false,
      destination: '/login'
    }
  }
  return {props: {}}
}

export default Profile
