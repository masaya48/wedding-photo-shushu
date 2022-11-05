import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import PhotoIcon from '@mui/icons-material/Photo'
import ProfileIcon from '@mui/icons-material/Person'
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
      <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={() => router.push('/')} />
      <BottomNavigationAction label="Photos" icon={<PhotoIcon />} onClick={() => router.push('/photos')} />
      <BottomNavigationAction label="Profile" icon={<ProfileIcon />} onClick={() => router.push('/profile')} />
    </BottomNavigation>
  )
}
