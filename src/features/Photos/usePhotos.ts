import { Database } from '@/libs/database.types'
import { PhotoCardType } from '@/types/photo.type'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

export const usePhotos = () => {
  const [photos, setPhotos] = useState<PhotoCardType[] | null>(null)
  const supabase = useSupabaseClient<Database>()
  useEffect(() => {
    const fetch = async () => {
      const {data} = await supabase
        .from('photos')
        .select('*, likes(*), author:userId(username)')
        .order('created_at', {ascending: false})
      setPhotos(data)
    }
    fetch()
  }, [supabase])

  return photos
}