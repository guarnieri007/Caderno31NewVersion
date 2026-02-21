import { Header } from './component/common/header'
import { MainContent } from './component/common/mainContent'
import { Footer } from './component/common/footer'
import { Home } from './pages/home'
import { ThemeProvider } from 'styled-components'
import { darkTheme } from './component/styles/darkTheme'
import { GlobalStyles } from './globalStyle'
import { MainContainer } from './AppStyled'
import { Route, Routes } from 'react-router-dom'
import { SignUp } from './pages/signup'
import { NotFound404 } from './pages/notFound404'
import { PublishContent } from './pages/publishContent'
import { useRemoveScroll } from './context/RemoveScroll'
import { useEffect } from 'react'
import { ResetPassword } from './pages/ResetPassword'
import { Page_search } from './pages/search'

function App() {
  const mainBody = document.querySelector('body');
  const removeScroll = useRemoveScroll();

  useEffect(() => {
    if (removeScroll) {
      mainBody?.classList.add('remove-scroll');
    } else {
      mainBody?.classList.remove('remove-scroll');
    }
  }, [removeScroll]);

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
              <Route path='/reset-password' element={<ResetPassword />} />
              <Route path='/publishContent' element={<PublishContent />} />
              <Route path='/search' element={<Page_search />} />
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
