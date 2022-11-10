import { User, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useEffect, useState } from "react"

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null)
  const supabase = useSupabaseClient()

  useEffect(() => {
    const getUser = async () => {
      const {data: {user}} = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [supabase])

  return user
}