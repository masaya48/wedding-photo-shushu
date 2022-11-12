import React from 'react'
import type { NextPage } from 'next'
import { Container } from '@mui/material'


const Rule: NextPage = () => (
  <Container className="p-4 font-mono bg-[url('/bg-main.jpg')] bg-cover bg-no-repeat h-[100vh] bg-[top_left_85%]">
    <section>
      <h2>個人情報の取り扱いについて</h2>
    </section>
    <section>
      <h2>肖像権・著作権について</h2>
    </section>
  </Container>
)

export default Rule
