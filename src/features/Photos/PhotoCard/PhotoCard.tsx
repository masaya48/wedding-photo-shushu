import { PhotoCardType, PhotoType } from '@/types/photo.type'
import { Badge, IconButton, Modal } from '@mui/material'
import React, {FC, useCallback, useMemo, useState} from 'react'
import Image from 'next/image'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { User } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/libs/database.types'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { LikeType } from '@/types/like.type'
import { useDebounce } from '@/hooks/useDebounceState'

type Props = {
  photo: PhotoCardType
  user: User
}

export const PhotoCard: FC<Props> = ({photo, user}) => {
  const supabase = useSupabaseClient<Database>()
  const router = useRouter()

  const likes = photo.likes as LikeType[]
  const author = Array.isArray(photo?.author) ? '' : photo?.author?.username as string

  const [badgeState, setBadgeState] = useState({
    isLiked: likes.some(like => like.userId === user.id),
    counts: likes.length
  })

  const {debouncedValue: loading, setDebouncedValue: setLoading} = useDebounce(false, 3000)

  const likePhoto = async () => {
    try {
      setLoading(true)
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
      setBadgeState(prev => ({
        isLiked: true,
        counts: prev.counts + 1
      }))
    } catch (e) {
      toast('イイネできなかったよ...', {type: 'error'})
      router.reload()
    } finally {
      setLoading(false)
    }
  }

  const unlikedPhoto = async () => {
    try {
      setLoading(true)
      const target = likes.filter(like => like.userId === user.id)[0]
      const {error} = await supabase.from('likes').delete().match({'id': target.id})
      if (error) throw new Error(error.message)
      router.replace(router.asPath)
      setBadgeState(prev => ({
        isLiked: false,
        counts: prev.counts - 1
      }))
    } catch (e) {
      toast('イイネが外せなかったよ...', {type: 'error'})
      router.reload()
    } finally {
      setLoading(false)
    }
  }

  const [open, setOpen] = useState(false)

  return (
    <div>
      <div className="relative h-[150px]" onClick={() => setOpen(true)}>
        <Image src={photo.url} alt={photo.title ?? ''} fill className="object-contain" priority />
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="bg-slate-100 outline-none">
          <div className="relative w-full h-[60vh]">
            <Image src={photo.url} alt={photo.title ?? ''} fill className="object-contain" priority />
          </div>
          <div className="flex justify-between items-center p-2">
            <div>
              <p className="line-clamp-2 text-xs break-all font-bold">@{author}</p>
              <p className="line-clamp-2 text-xs break-all">{photo.title}</p>
            </div>
            <IconButton aria-label="add to favorites" onClick={() => {
              if (loading) return
              badgeState.isLiked ? unlikedPhoto() : likePhoto()
            }} disabled={loading}>
              <Badge badgeContent={badgeState.counts} color="error">
                <FavoriteIcon fontSize="small" color={badgeState.isLiked ? 'error' : 'inherit'} />
              </Badge>
            </IconButton>
          </div>
        </div>
      </Modal>
      <div className="flex justify-between items-center h-[40px] p-1 bg-slate-100">
        <p className="line-clamp-2 text-xs break-all">@{author}</p>
        <IconButton aria-label="add to favorites" onClick={() => {
          if (loading) return
          badgeState.isLiked ? unlikedPhoto() : likePhoto()
        }} disabled={loading}>
          <Badge badgeContent={badgeState.counts} color="error">
            <FavoriteIcon fontSize="small" color={badgeState.isLiked ? 'error' : 'inherit'} />
          </Badge>
        </IconButton>
      </div>
    </div>
  )
}