import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import { useRouter } from 'next/router'
import React, { type ReactNode, type FC } from 'react'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'

type Props = {
  children: ReactNode
}

export const PostLayout: FC<Props> = ({children}) => {
  const router = useRouter()
  return (
    <section className="font-mono">
      <h1 className="h-[88px] p-4 text-3xl text-[#333] underline underline-offset-4 flex items-center">Post</h1>
      <main className="h-[calc(var(--vh,1vh)_*_100_-_144px]">{children}</main>
      <BottomNavigation
        showLabels
        value="写真一覧"
      >
        <BottomNavigationAction sx={{maxWidth: '100%'}} label="写真一覧" icon={<KeyboardReturnIcon />} onClick={() => router.push('/photos')} />
      </BottomNavigation>
    </section>
  )
}