import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'

export const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const supabase = useSupabaseClient()
  const router = useRouter()

  const signIn = async (email: string) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({email})
      if (error) throw new Error(error.message)
    } catch (error: any) {
      toast('ログインに失敗しました。')
    } finally {
      setLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({provider: 'google'})
      if (error) throw new Error(error.message)
    } catch (e) {
      toast('Googleでのログインに失敗しました。他のログイン方法をお試しください', {type: 'error'})
    } finally {
      setLoading(false)
    }
  }

  const signInWithTwitter = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({provider: 'twitter'})
      if (error) throw new Error(error.message)
      router.push('/photos')
    } catch (e) {
      toast('Twitterでのログインに失敗しました。他のログイン方法をお試しください', {type: 'error'})
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    signIn,
    signInWithGoogle,
    signInWithTwitter
  }
}