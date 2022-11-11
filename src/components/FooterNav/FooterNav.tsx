import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import PhotoIcon from '@mui/icons-material/Photo'
import React, { FC } from 'react'
import { useRouter } from 'next/router'

export const FooterNav: FC = () => {
  const router = useRouter()
  return (
    <BottomNavigation
      showLabels
      value="写真投稿"
    >
      <BottomNavigationAction sx={{maxWidth: '100%'}} label="写真投稿" icon={<PhotoIcon />} onClick={() => router.push('/photos/post')} />
    </BottomNavigation>
  )
}
