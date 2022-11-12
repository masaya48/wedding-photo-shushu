import React, { type ReactNode, type FC } from 'react'
import { FooterNav } from '../FooterNav'

type Props = {
  children: ReactNode
  title: string
}

export const Layout: FC<Props> = ({children, title}) => {
  return (
    <section className="font-mono">
      <h1 className="p-4 text-3xl text-[#333] underline underline-offset-4">{title}</h1>
      <main className="h-[calc(var(--vh,1vh)_*_100_-_124px)]">{children}</main>
      <FooterNav />
    </section>
  )
}