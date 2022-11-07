import React, {Suspense} from 'react'
import { Auth as AuthComponent } from '@/features/Auth'
import { NextPageWithLayout } from '../_app'
import { Layout } from '@/components/Layout/Layout'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'

const Login: NextPageWithLayout = () => (
  <Suspense>
    <AuthComponent />
  </Suspense>
)

Login.getLayout = (page) => <Layout title="ログイン">{page}</Layout>

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx)
  const { data: {session} } = await supabase.auth.getSession()
  if (session) return {
    redirect: {
      destination: '/profile',
      permanent: false
    }
  }
  return {}
}

export default Login