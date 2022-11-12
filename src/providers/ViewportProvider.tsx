import React, {FC, ReactNode, useEffect} from 'react'

const setFillHeight = () => {
  if (typeof window === 'undefined') return
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

type Props = {
  children: ReactNode
}

export const ViewportProvider: FC<Props> = ({children}) => {
  setFillHeight()

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.addEventListener('resize', setFillHeight)
    return () => {
      window.removeEventListener('resize', setFillHeight)
    }
  }, [])

  return <>{children}</>
}
