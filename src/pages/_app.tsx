import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'
import { Database } from '@/libs/database.types'
import { CssBaseline } from '@mui/material'

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: JSX.Element) => JSX.Element
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page): JSX.Element => page)
  const [supabaseClient] = useState(() => createBrowserSupabaseClient<Database>())
  return getLayout(
    <SessionContextProvider supabaseClient={supabaseClient}>
      <Component {...pageProps} />
      <ToastContainer />
      {/* <CssBaseline /> */}
    </SessionContextProvider>
  )
}
