import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import PhotoIcon from '@mui/icons-material/Photo'
import React, { FC, useState } from 'react'
import { useRouter } from 'next/router'

export const FooterNav: FC = () => {
  const [value, setValue] = useState('Home')
  const router = useRouter()
  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction sx={{maxWidth: '100%'}} label="写真投稿" icon={<PhotoIcon />} onClick={() => router.push('/photos/post')} />
    </BottomNavigation>
  )
}
