import React from 'react'
import { Profile as ProfileComponent } from '@/features/Profile'
import { NextPageWithLayout } from '../_app'
import { Layout } from '@/components/Layout'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'

const Profile: NextPageWithLayout = () => (
  <section className="p-4 font-mono">
    <ProfileComponent />
  </section>
)

Profile.getLayout = (page) => <Layout title="Profile">{page}</Layout>

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
