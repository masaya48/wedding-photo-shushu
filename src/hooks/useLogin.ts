import { supabase } from '@/libs/supabase'
import { useState } from 'react'
import { toast } from 'react-toastify'

export const useLogin = () => {
  const [loading, setLoading] = useState(false)

  const handleLogin = async (email: string) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({email})
      if (error) throw error
      toast('メールにログインリンクが届いているのでそちらをクリックしてください！')
    } catch (error: any) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    handleLogin
  }
}