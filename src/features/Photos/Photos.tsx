import { Fab, FormControl, MenuItem, Select } from '@mui/material'
import React, { FC } from 'react'
import { PhotoCard } from './PhotoCard'
import { SortKeyType, usePhotos } from './usePhotos'
import { useUser } from '@supabase/auth-helpers-react'
import { FooterNav } from '@/components/FooterNav'
import QuizIcon from '@mui/icons-material/Quiz'
import { useRouter } from 'next/router'


export const Photos: FC = () => {
  const {photos, sortKey, setSortKey} = usePhotos()
  const user = useUser()
  const router = useRouter()
  return (
    <section className="font-mono">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-3xl text-[#333] underline underline-offset-4">Photos</h1>
        <div className="flex items-center gap-2">
          <QuizIcon fontSize="large" onClick={() => router.push('guide')} />
          <FormControl>
            <Select
              sx={{outline: 'none'}}
              labelId="sort"
              id="sort-select"
              value={sortKey}
              onChange={(e) => {
                const value = e.target.value as string
                setSortKey(value as SortKeyType)
              }}
            >
              <MenuItem value="upload_descend">新着順</MenuItem>
              <MenuItem value="upload_ascend">投稿順</MenuItem>
              <MenuItem value="like">イイネ順</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <main className="h-[calc(var(--vh,1vh)_*_100_-_144px)]">
        <section className="h-full overflow-y-auto">
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
      </main>
      <FooterNav />
    </section>
  )
}
