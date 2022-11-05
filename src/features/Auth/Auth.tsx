

import React, { FC, useEffect, useState } from 'react'
import { useLogin } from '@/hooks/useLogin'
import { Button, FormControl, Input, InputLabel, Stack } from '@mui/material'
import { useSessionContext } from '@supabase/auth-helpers-react'
import Link from 'next/link'

export const Auth: FC = () => {
  const [email, setEmail] = useState('')
  const {loading, handleLogin} = useLogin()
  const { session } = useSessionContext()

  return session ? (
    <section>
      <p>ログイン済み</p>
      <Link href="/profile">プロフィールを編集する</Link>
    </section>
  ) : (
    <section className="p-4">
      <Stack spacing={4} className="flex flex-col">
        <FormControl className="mt-8">
          <InputLabel htmlFor="email">メールアドレス</InputLabel>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <Button
          onClick={(e) => {
            e.preventDefault()
            handleLogin(email)
          }}
          variant="outlined"
          className="mt-8"
          disabled={loading}
        >
          <span>{loading ? 'Loading...' : 'ログイン'}</span>
        </Button>
      </Stack>
    </section>
  )
}
