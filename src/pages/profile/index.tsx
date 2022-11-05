import React from 'react'
import { Profile as ProfileComponent } from '@/features/Profile'
import { NextPageWithLayout } from '../_app'
import { Layout } from '@/components/Layout'
import { withPageAuth, User, SupabaseClient} from '@supabase/auth-helpers-nextjs'
import { Database } from '@/libs/database.types'
import { Profile } from '@/types/profile.types'

type Props = {
  user: User,
  profile: Profile | null
  avatarUrl: string
}

const Profile: NextPageWithLayout<Props> = ({user, profile, avatarUrl}) => {
  console.log('avatarUrl', avatarUrl);
  
  return (
    <section className="p-4 font-mono">
      <ProfileComponent profile={profile} avatarUrl={avatarUrl} />
    </section>
  )
}

Profile.getLayout = (page) => <Layout title="Profile">{page}</Layout>

export const getServerSideProps = withPageAuth({
  redirectTo: '/login',
  async getServerSideProps(_, supabase: SupabaseClient<Database>) {
    const { data: {user}} = await supabase.auth.getUser()
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user?.id).single()
    const { data: avatar } = await supabase.storage.from('avatars').getPublicUrl(profile?.avatar_url ?? '')

    return { props: { profile, avatarUrl: profile?.avatar_url ? avatar.publicUrl : '' } };
  }
})

export default Profile
