import React from 'react'
import { NextPageWithLayout } from '../_app'
import { Layout } from '@/components/Layout'
import { SupabaseClient, User, withPageAuth } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/libs/database.types'
import { PhotoType } from '@/types/photo.type'
import {Photos as PhotosComponent} from '@/features/Photos'
import { LikeType } from '@/types/like.type'

type Props = {
  photos: (PhotoType & {likes: LikeType[]} & {author: {username: string}})[]
  user: User
}

const Photos: NextPageWithLayout<Props> = ({photos, user}) => (
  <PhotosComponent photos={photos} user={user} />
)

Photos.getLayout = (page) => <Layout title="Photos">{page}</Layout>

export const getServerSideProps = withPageAuth({
  redirectTo: '/login',
  async getServerSideProps(_, supabase: SupabaseClient<Database>) {
    const { data: photos } = await supabase.from('photos').select('*, likes(*), author:userId(username)')

    return { props: { photos } };
  }
})

export default Photos