import React, {Suspense} from 'react'
import { Auth as AuthComponent } from '@/features/Auth'
import { NextPageWithLayout } from '../_app'
import { Layout } from '@/components/Layout/Layout'

const Login: NextPageWithLayout = () => (
  <Suspense>
    <AuthComponent />
  </Suspense>
)

Login.getLayout = (page) => <Layout title="ログイン">{page}</Layout>

export default Login