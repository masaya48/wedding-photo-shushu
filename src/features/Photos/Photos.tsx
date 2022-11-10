import { PhotoType } from '@/types/photo.type'
import { Fab } from '@mui/material'
import React, { FC } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { useRouter } from 'next/router'
import { PhotoCard } from './PhotoCard'
import { usePhotos } from './usePhotos'
import { useUser } from '@supabase/auth-helpers-react'


export const Photos: FC = () => {
  const photos = usePhotos()
  const user = useUser()
  return (
    <section className="py-4 h-full overflow-y-auto">
      {photos?.length === 0 && <p>まだ投稿はないよ！<br />みんないっぱい投稿しよう！</p>}
      {user && (
        <ul className="inline-grid grid-cols-3 w-full gap-2">
          {photos?.map((photo) => (
            <li key={photo.id}>
              <PhotoCard photo={photo} user={user} />
            </li>
          ))}
        </ul>
        )}
    </section>
  )
}
