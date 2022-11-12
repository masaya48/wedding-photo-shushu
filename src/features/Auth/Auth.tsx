

import React, { FC } from 'react'
import { useLogin } from '@/hooks/useLogin'
import { Button, Chip, Divider, FormControl, Input, InputLabel, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import GoogleIcon from '@mui/icons-material/Google'
import TwitterIcon from '@mui/icons-material/Twitter'

export const Auth: FC = () => {
  const {loading, signIn, signInWithGoogle, signInWithTwitter} = useLogin()
  const {register, handleSubmit} = useForm({
    defaultValues: {
      email: '',
    }
  })
  return (
    <section className="p-4">
      <Stack spacing={4} component="form" onSubmit={handleSubmit(({email}) => signIn(email))} className="flex flex-col">
        <FormControl className="mt-8">
          <InputLabel htmlFor="email">メールアドレス</InputLabel>
          <Input
            id="email"
            type="email"
            {...register('email')}
          />
        </FormControl>
        <Button
          type="submit"
          variant="outlined"
          className="mt-8"
          disabled={loading}
        >
          <span>{loading ? 'Loading...' : 'ログイン'}</span>
        </Button>
      </Stack>
      <div className="mt-10 mb-10">
        <Divider>
          <Chip label="または" />
        </Divider>
      </div>
      <Stack spacing={2}>
        <Button variant="outlined" startIcon={<GoogleIcon />} onClick={() => signInWithGoogle()}>Googleでログイン</Button>
        <Button variant="outlined" startIcon={<TwitterIcon />} onClick={() => signInWithTwitter()}>Twitterでログイン</Button>
      </Stack>
    </section>
  )
}
