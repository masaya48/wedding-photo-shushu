import React, { ChangeEvent, FC, useState } from 'react'
// import { Avatar } from '@/components/Avatar'
import { Avatar, Button, FormControl, FormHelperText, Input, InputLabel, Stack } from '@mui/material'
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { Profile as ProfileType } from '@/types/profile.types'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import PersonIcon from '@mui/icons-material/Person'


type Props = {
  profile: ProfileType | null
  avatarUrl: string
}

type InputForm = {
  username: string
  email: string
  avatar: FileList
}

export const Profile: FC<Props> = () => {
  const [loading, setLoading] = useState(false)
  const supabase = useSupabaseClient()
  const router = useRouter()
  const { session } = useSessionContext()
  const {register, handleSubmit} = useForm<InputForm>({
    defaultValues: {
      username: ''
    }
  })

  const updateProfile = async (username: string) => {
    try {
      setLoading(true)

      const updates = {
        id: session?.user?.id,
        username,
        updated_at: new Date(),
      }

      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw new Error(error.message)
      }
      toast('お名前を登録しました！早速写真を投稿しましょう！')
      router.push('/photos')
    } catch (error: any) {
      toast('お名前の登録に失敗しました。再度登録してください', {type: 'error'})
    } finally {
      setLoading(false)
    }
  }


  return (
    <Stack component="form" spacing={4} onSubmit={handleSubmit(({username}) => updateProfile(username))}>
      <FormControl>
        <InputLabel htmlFor="username">お名前</InputLabel>
        <Input
          id="username"
          type="text"
          {...register('username')}
        />
        <FormHelperText>お名前を<b>フルネーム</b>で登録してください！景品をお渡しするために必要です！</FormHelperText>
      </FormControl>
      <Stack spacing={2}>
        <Button
          variant="outlined"
          type="submit"
          disabled={loading}
        >{loading ? 'Loading ...' : 'お名前を登録'}</Button>
        <Button
          variant="text"
          onClick={async () => {
            await supabase.auth.signOut()
            router.push('/')
          }}
          disabled={loading}
        >ログアウト</Button>
      </Stack>
    </Stack>
  )
}