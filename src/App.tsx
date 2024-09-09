import React from 'react'
import { Header } from '@/component/common/header'
import { MainContent } from './component/common/mainContent'
import { Footer } from './component/common/footer'
import { Home } from './component/pages/home'
import { ThemeProvider } from 'styled-components'
import { darkTheme } from './component/styles/default-theme'
import { GlobalStyles } from './globalStyle'
import { MainContainer } from './AppStyled'

function App() {

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyles/>
        <MainContainer>
          <Header />
          <MainContent>
            <Home />
          </MainContent>
          <Footer />
        </MainContainer>
      </ThemeProvider>
    </>
  )
}

export default App
