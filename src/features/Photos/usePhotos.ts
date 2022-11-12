import { Database } from '@/libs/database.types'
import { PhotoCardType } from '@/types/photo.type'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

export type SortKeyType = 'like' | 'upload_descend' | 'upload_ascend'

export const usePhotos = () => {
  const [sortKey, setSortKey] = useState<SortKeyType>('upload_descend')
  const [photos, setPhotos] = useState<PhotoCardType[] | null>(null)
  const supabase = useSupabaseClient<Database>()
  useEffect(() => {
    const fetch = async () => {
      const {data} = await supabase
        .from('photos')
        .select('*, likes(*), author:userId(username)')
        .order('created_at', {ascending: false})
      const sortedPhotos = (data as PhotoCardType[]).sort(sortFn[sortKey])
      setPhotos(sortedPhotos)
    }
    fetch()
  }, [sortKey, supabase])

  return {
    photos,
    sortKey,
    setSortKey
  }
}

const sortByLike = (a: PhotoCardType, b: PhotoCardType) => a.likes.length > b.likes.length ? -1 : 1
const sortByUploadDescend = (a: PhotoCardType, b: PhotoCardType) => new Date(a.created_at ?? 0) > new Date(b.created_at ?? 0) ? -1 : 1
const sortByUploadAscend= (a: PhotoCardType, b: PhotoCardType) => new Date(a.created_at ?? 0) < new Date(b.created_at ?? 0) ? -1 : 1

const sortFn = {
  like: sortByLike,
  upload_descend: sortByUploadDescend,
  upload_ascend: sortByUploadAscend
} as const
