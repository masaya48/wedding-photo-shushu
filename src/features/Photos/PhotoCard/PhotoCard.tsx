import { PhotoType } from '@/types/photo.type'
import { Badge, IconButton, Modal } from '@mui/material'
import React, {FC, useCallback, useState} from 'react'
import Image from 'next/image'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { User } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/libs/database.types'
import { toast } from 'react-toastify'
import { LikeType } from '@/types/like.type'
import { useRouter } from 'next/router'

type Props = {
  photo: PhotoType & {likes: LikeType[]} & {author: {username: string}}
  user: User
}

export const PhotoCard: FC<Props> = ({photo, user}) => {
  const supabase = useSupabaseClient<Database>()
  const router = useRouter()

  const likePhoto = async () => {
    try {
      const params = {
        photoId: photo.id,
        userId: user.id
      }
      const {error} = await supabase.from('likes').insert(params)
      if (error) {
        console.error(error)
        throw new Error(error.message)
      }
      router.replace(router.asPath)
    } catch (e) {
      toast('イイネできなかったよ...', {type: 'error'})
    }
  }

  const unlikedPhoto = async () => {
    try {
      const target = photo.likes.filter(like => like.userId === user.id)[0]
      const {error} = await supabase.from('likes').delete().match({'id': target.id})
      if (error) throw new Error(error.message)
      router.replace(router.asPath)
    } catch (e) {
      toast('イイネが外せなかったよ...', {type: 'error'})
    }
  }

  const isLiked = useCallback(() => {
    return photo.likes.some(like => like.userId === user.id)
  }, [photo.likes, user.id])

  const [open, setOpen] = useState(false)

  return (
    <div>
      <div className="relative h-[150px]" onClick={() => setOpen(true)}>
        <Image src={photo.url} alt={photo.title} fill className="object-contain" priority />
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="bg-slate-100 outline-none">
          <div className="relative w-full h-[60vh]">
            <Image src={photo.url} alt={photo.title} fill className="object-cover" priority />
          </div>
          <div className="flex justify-between items-center p-2">
            <div>
              <p className="line-clamp-2 text-sm break-all font-bold">by: {photo.author.username}</p>
              <p className="line-clamp-2 text-sm break-all">{photo.title}</p>
            </div>
            <IconButton aria-label="add to favorites" onClick={() => isLiked() ? unlikedPhoto() : likePhoto()}>
              <Badge badgeContent={photo.likes.length} color="error">
                <FavoriteIcon fontSize="small" color={isLiked() ? 'error' : 'inherit'} />
              </Badge>
            </IconButton>
          </div>
        </div>
      </Modal>
      <div className="flex justify-between items-center h-[40px] p-1 bg-slate-100">
        <p className="line-clamp-2 text-sm break-all">{photo.title}</p>
        <IconButton aria-label="add to favorites" onClick={() => isLiked() ? unlikedPhoto() : likePhoto()}>
          <Badge badgeContent={photo.likes.length} color="error">
            <FavoriteIcon fontSize="small" color={isLiked() ? 'error' : 'inherit'} />
          </Badge>
        </IconButton>
      </div>
    </div>
  )
}