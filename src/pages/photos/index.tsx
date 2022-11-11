import React from 'react'
import { NextPageWithLayout } from '../_app'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Photos as PhotosComponent } from '@/features/Photos'
import { GetServerSidePropsContext } from 'next'

const Photos: NextPageWithLayout = () => (
  <PhotosComponent />
)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx)
  const { data: {user} } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user?.id).single()
  if (!profile) return {
    redirect: {
      destination: '/profile',
      permanent: false
    }
  }
  return {props: {}}
}

export default Photos