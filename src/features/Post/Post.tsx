import React, { FC, useState } from 'react'
import { Button, FormControl, IconButton, Input, InputLabel, Stack } from '@mui/material'
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import NoImageIcon from '@mui/icons-material/HideImage'
import ClearIcon from '@mui/icons-material/Clear'

type InputForm = {
  title: string
  photo: FileList
}

export const Post: FC = () => {
  const [loading, setLoading] = useState(false)
  const supabase = useSupabaseClient()
  const router = useRouter()
  const { session } = useSessionContext()
  const {register, handleSubmit, getValues, resetField, setValue} = useForm<InputForm>({
    defaultValues: {
      title: '',
      photo: undefined
    }
  })

  const [preview, setPreview] = useState<string | null>(null)

  const postPhoto = async(title: string, photo: FileList) => {
    try {
      if (!photo) {
        toast('写真を選択してね！', {type: 'error'})
        return
      }
      setLoading(true)

      const file = photo[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const {error: uploadError} = await supabase.storage.from('photos').upload(fileName, file)
      if (uploadError) throw new Error(uploadError.message)

      const {data: {publicUrl}} = supabase.storage.from('photos').getPublicUrl(fileName)

      const insertItem = {
        userId: session?.user?.id,
        url: publicUrl,
        updated_at: new Date(),
        created_at: new Date(),
        title: title
      }

      const { error } = await supabase.from('photos').insert(insertItem)

      if (error) {
        throw new Error(error.message)
      }
      toast('写真を投稿しました！\n素敵な写真をありがとう！')
      router.push('/photos')
    } catch (error) {
      toast('写真投稿に失敗しました。リロードして再チャレンジしてね！')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Stack component="form" spacing={4} onSubmit={handleSubmit(({title, photo}) => postPhoto(title, photo))}>
      <div className="w-full h-[400px] flex justify-center items-center border-dotted border">
        {preview
          ? <div className="relative w-full h-full">
              <Image alt="" fill className="object-contain" src={preview} />
              <IconButton className="absolute right-0 top-0" onClick={() => {
                resetField('photo')
                setPreview(null)
              }}>
                <ClearIcon />
              </IconButton>
            </div>
          : <label className="flex justify-center flex-col items-center w-full h-full">
              <NoImageIcon color="disabled" sx={{width: 100, height: 100}} />
              <p className="mt-4 text-[#333]">写真を選択してね！</p>
              <input type="file" accept="image/*" hidden id="photo" onChange={(e) => {
                setValue('photo', e.target.files!)
                setPreview(URL.createObjectURL((e.target.files as FileList)[0]))
              }} />
            </label>
        }
      </div>
      
      <FormControl>
        <InputLabel htmlFor="username">ひとこと！</InputLabel>
        <Input
          id="title"
          type="title"
          {...register('title', {maxLength: 20})}
        />
      </FormControl>
      <Button
        variant="outlined"
        type="submit"
        disabled={loading}
      >{loading ? 'Loading ...' : '写真を投稿する'}</Button>
    </Stack>
  )
}