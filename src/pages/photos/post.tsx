import React from 'react'
import { Post as PostComponent } from '@/features/Post'
import { NextPageWithLayout } from '../_app'
import { Layout } from '@/components/Layout'
import { withPageAuth} from '@supabase/auth-helpers-nextjs'

const Post: NextPageWithLayout = () => {
  
  return (
    <section className="p-4 font-mono">
      <PostComponent />
    </section>
  )
}

Post.getLayout = (page) => <Layout title="Post">{page}</Layout>

export const getServerSideProps = withPageAuth({
  redirectTo: '/login',
})

export default Post
