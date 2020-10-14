import React, {useEffect, useState, useCallback} from 'react'
import styled from 'styled-components'
import gsap from 'gsap'

const useColoredFavicon = () => {
  const [favicon] = useState(document.querySelector('link[rel="icon"]'))

  const updateFavicon = useCallback(() => {
    if (favicon) {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        //@ts-ignore
        favicon.href = '/icon-light.svg'
      } else {
        //@ts-ignore
        favicon.href = '/icon-dark.svg'
      }
    }
  }, [favicon])

  useEffect(() => {
    updateFavicon()
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener
    ) {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', updateFavicon)
      return () =>
        window
          .matchMedia('(prefers-color-scheme: dark)')
          .removeEventListener('change', updateFavicon)
    }
  }, [updateFavicon, favicon])
}

function App() {

  useColoredFavicon()
  
  useEffect(() => {
    gsap.to('.title', {opacity: 1, scaleY: 1, y: 0, delay: .5})
  }, [])

  return (
    <Wrapper>
      <Title
      className="title"
      >Nate Stone</Title>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FBF9F5;
  height: 100vh;
`

const Title = styled.h1`
  font-size: 8vw;
  font-weight: 500;
  opacity: 0;
  transform: translate3d(0, 100px, 0) scaleY(1.2);
  text-transform: uppercase;
`
export default App;
