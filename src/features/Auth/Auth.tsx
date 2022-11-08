

import React, { FC, useState } from 'react'
import { useLogin } from '@/hooks/useLogin'
import { Button, FormControl, Input, InputLabel, Stack } from '@mui/material'

export const Auth: FC = () => {
  const [email, setEmail] = useState('')
  const {loading, handleLogin} = useLogin()

  return (
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
