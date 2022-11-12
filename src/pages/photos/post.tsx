import React from 'react'
import { Post as PostComponent } from '@/features/Post'
import { NextPageWithLayout } from '../_app'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { PostLayout } from '@/components/Layout/PostLayout'
import { GetServerSidePropsContext } from 'next'

const Post: NextPageWithLayout = () => {
  
  return (
    <section className="p-4 font-mono">
      <PostComponent />
    </section>
  )
}

Post.getLayout = (page) => <PostLayout>{page}</PostLayout>

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

export default Post
