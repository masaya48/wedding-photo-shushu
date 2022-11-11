import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { FC } from 'react'
import { PhotoCard } from './PhotoCard'
import { SortKeyType, usePhotos } from './usePhotos'
import { useUser } from '@supabase/auth-helpers-react'
import { FooterNav } from '@/components/FooterNav'


export const Photos: FC = () => {
  const {photos, sortKey, setSortKey} = usePhotos()
  const user = useUser()
  return (
    <section className="font-mono">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-3xl text-[#333] underline underline-offset-4">Photos</h1>
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
            <MenuItem value="like">イイネ順</MenuItem>
            <MenuItem value="upload_descend">新しい順</MenuItem>
            <MenuItem value="upload_ascend">古い順</MenuItem>
          </Select>
        </FormControl>
      </div>
      <main className="h-[calc(100vh_-_124px)]">
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
