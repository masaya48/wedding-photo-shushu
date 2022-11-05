import React, { ChangeEvent, FC, useState } from 'react'
// import { Avatar } from '@/components/Avatar'
import { Avatar, Button, FormControl, Input, InputLabel, Stack } from '@mui/material'
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

export const Profile: FC<Props> = ({profile, avatarUrl}) => {
  const [fileName, setFileName] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = useSupabaseClient()
  const router = useRouter()
  const { session } = useSessionContext()
  const {register, handleSubmit, getValues} = useForm<InputForm>({
    defaultValues: {
      username: profile?.username ?? '',
      email: session?.user.email ?? '',
      avatar: undefined
    }
  })

  async function uploadAvatar(event: ChangeEvent<HTMLInputElement>) {
    try {
      setLoading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }
      setFileName(fileName)
      await updateProfile(getValues().username, fileName)
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile(username: string | null, fileName: string) {
    try {
      setLoading(true)

      const updates = {
        id: session?.user?.id,
        username,
        avatar_url: fileName,
        updated_at: new Date(),
      }

      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
      toast('プロフィールを更新しました！')
      router.replace(router.asPath)
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const avatarSrc = getValues().avatar?.length > 0 ? URL.createObjectURL(getValues().avatar[0]) : avatarUrl

  return (
    <Stack component="form" spacing={4} onSubmit={handleSubmit(({username}) => updateProfile(username, fileName))}>
      <div className="flex flex-end">
        <Avatar sx={{width: 100, height: 100}}>
          {avatarSrc ? <Image src={avatarSrc} alt="" width={100} height={100} /> : <PersonIcon width={100} />}
        </Avatar>
        <Button className="flex-grow-0" variant="contained" component="label">
          アバターをアップロードする
          <input type="file" hidden {...register('avatar')} onChange={uploadAvatar} />
        </Button>
      </div>
      
      <FormControl>
        <InputLabel htmlFor="username">メールアドレス</InputLabel>
        <Input
          id="email"
          type="email"
          disabled
          {...register('email')}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="username">お名前</InputLabel>
        <Input
          id="username"
          type="text"
          {...register('username')}
        />
      </FormControl>
      <Stack spacing={2}>
        <Button
          variant="outlined"
          type="submit"
          disabled={loading}
        >{loading ? 'Loading ...' : 'プロフィールを更新'}</Button>
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