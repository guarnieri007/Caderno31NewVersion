import { Header } from './component/common/header'
import { MainContent } from './component/common/mainContent'
import { Footer } from './component/common/footer'
import { Home } from './component/pages/home'
import { ThemeProvider } from 'styled-components'
import { darkTheme } from './component/styles/darkTheme'
import { GlobalStyles } from './globalStyle'
import { MainContainer } from './AppStyled'
import { Route, Routes } from 'react-router-dom'
import { SignUp } from './component/pages/signup'
import { NotFound404 } from './component/pages/notFound404'

function App() {

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyles/>
        <MainContainer>
          <Header />
          <MainContent>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/signupUser' element={<SignUp />} />
              <Route path='*' element={<NotFound404/>} />
            </Routes>
          </MainContent>
          <Footer />
        </MainContainer>
      </ThemeProvider>
    </>
  )
}

export default App
