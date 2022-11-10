import React from 'react'
import { NextPageWithLayout } from '../_app'
import { Layout } from '@/components/Layout'
import { createServerSupabaseClient, SupabaseClient, User, withPageAuth } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/libs/database.types'
import { PhotoType } from '@/types/photo.type'
import {Photos as PhotosComponent} from '@/features/Photos'
import { LikeType } from '@/types/like.type'
import { GetServerSidePropsContext } from 'next'

const Photos: NextPageWithLayout = () => (
  <PhotosComponent />
)

Photos.getLayout = (page) => <Layout title="Photos">{page}</Layout>

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