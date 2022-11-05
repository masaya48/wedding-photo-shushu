import { PhotoType } from '@/types/photo.type'
import { Fab } from '@mui/material'
import React, { FC } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { useRouter } from 'next/router'
import { PhotoCard } from './PhotoCard'
import { LikeType } from '@/types/like.type'
import { User } from '@supabase/auth-helpers-nextjs'

type Props = {
  photos: (PhotoType & {likes: LikeType[]} & {author: {username: string}})[]
  user: User
}

export const Photos: FC<Props> = ({photos, user}) => {
  const router = useRouter()
  return (
    <section className="py-4 h-full overflow-y-auto">
      {photos.length === 0 && <p>まだ投稿はないよ！<br />みんないっぱい投稿しよう！</p>}
      <ul className="inline-grid grid-cols-3 w-full">
        {photos.map((photo) => (
          <li key={photo.id}>
            <PhotoCard photo={photo} user={user} />
          </li>
        ))}
      </ul>
      <Fab aria-label="add" className="fixed bottom-20 right-8" onClick={() => router.push('/photos/post')}>
        <AddIcon />
      </Fab>
    </section>
  )
}
