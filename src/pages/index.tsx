import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { Button } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Link from 'next/link'
import { useTrail, animated, useTransition, config } from 'react-spring'

const ANIMATION_TITLE = ['P', 'h', 'o', 't', 'o', ' ','C', 'o', 'n', 't', 'e', 's', 't']
const ANIMATION_DATE = ['2', '0', '2', '2','.','1','1','.','1','9']
const ANIMATION_NAME = ['M', 'a', 's', 'a', 'y', 'a', '&', 'A', 'k', 'a', 'n', 'e']
const trailConfig = { mass: 4, tension: 2000, friction: 200 }

const Home: NextPage = () => {
  const [toggle] = useState(true)

  const baseTrail = {
    config: trailConfig,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 20,
    from: { opacity: 0, x: 20, height: 0 },
    delay: 200
  }

  const trail = useTrail(ANIMATION_TITLE.length, baseTrail)
  const dateTrail = useTrail(ANIMATION_DATE.length, {
    ...baseTrail,
    from: { opacity: 0, x: 10, height: 0 },
    delay: 1000
  })
  const nameTrail = useTrail(ANIMATION_NAME.length, {
    ...baseTrail,
    from: { opacity: 0, x: 10, height: 0 },
    delay: 1500
  })

  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShowMessage(true)
    }, 2000)
  }, [])

  const transition = useTransition(showMessage, {
    from: {opacity: 0, transform: 'translateY(20px)'},
    enter: {opacity: 1, transform: 'translateY(0)'},
    config: config.molasses
  })

  return (
    <section className="relative p-4 font-serif bg-[url('/bg-main.jpg')] bg-cover bg-no-repeat h-[calc(var(--vh,1vh)_*_100)] bg-[top_left_45%]">
      <div className="flex justify-center text-5xl font-bold mt-6 drop-shadow-lg">
        {trail.map(({ x, height, ...rest }, index) => (
          <animated.div key={index} className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-800" style={{
            ...rest,
            marginLeft: index === 5 ? '8px' : '0',
            transform: x.to(x => `translate3d(0,${x}px,0)`)
          }}>{ANIMATION_TITLE[index]}</animated.div>
        ))}
      </div>
      <div className="flex justify-center text-2xl mt-4 drop-shadow-lg">
        {dateTrail.map(({ x, height, ...rest }, index) => (
          <animated.div className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600" key={index} style={{
            ...rest,
            transform: x.to(x => `translate3d(0,${x}px,0)`)
          }}>{ANIMATION_DATE[index]}</animated.div>
        ))}
      </div>
      <div className="flex justify-center text-2xl text-sky-500 mt-1 drop-shadow-lg">
        {nameTrail.map(({ x, height, ...rest }, index) => (
          <animated.div className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600" key={index} style={{
            ...rest,
            marginLeft: index === 6 || index === 7 ? '8px' : '0',
            transform: x.to(x => `translate3d(0,${x}px,0)`)
          }}>{ANIMATION_NAME[index]}</animated.div>
        ))}
      </div>
      {transition((style, item) => item && (
        <animated.div style={style} className="absolute bottom-32 right-4 pt-5 text-md font-extrabold rounded-lg text-gray-500 text-right">
          <p>
            ??????????????????????????????<br />?????????????????????????????????
          </p>
          <p className="mt-2">
            ???????????????????????????????????????<br />
            <b className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">????????????</b>????????????????????????
          </p>
          <Button variant="text" size="medium">
            <Link href="/guide">?????????????????????</Link>
          </Button>
        </animated.div>
      ))}
      <div className="absolute bottom-10 m-auto left-4 font-bold underline">
        
      </div>
      <div className="absolute bottom-10 m-auto bg-white right-4 animate-bounce">
        <Button variant="outlined" size="large" endIcon={<ArrowForwardIosIcon />}>
          <Link href="/login">????????????</Link>
        </Button>
      </div>
    </section>
  )
}

export default Home