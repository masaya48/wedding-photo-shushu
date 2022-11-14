import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Fab } from '@mui/material'
import ReturnIcon from '@mui/icons-material/KeyboardReturn'

const Guide: NextPage = () => {
  const router = useRouter()
  return (
    <section className="relative">
      <div className="absolute top-4 left-4 bg-white rounded-full">
        <Fab aria-label="return" onClick={() => router.back()}>
          <ReturnIcon />
        </Fab>
      </div>
      <div className="p-4 font-mono bg-[url('/rule.jpg')] bg-contain bg-center bg-purple-900 bg-no-repeat h-[calc(var(--vh,1vh)_*_100)]" />
    </section>
  )
}

export default Guide
