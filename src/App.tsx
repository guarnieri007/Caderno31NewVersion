import { Header } from './component/common/header'
import { MainContent } from './component/common/mainContent'
import { Footer } from './component/common/footer'
import { Home } from './pages/home'
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
  const removeScroll = useRemoveScroll();

  useEffect(() => {
    document.body.classList.toggle("remove-scroll", removeScroll);
  }, [removeScroll]);

  return (
    <>

        <GlobalStyles />
        <MainContainer>
          <Header />
          <MainContent>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/signupUser' element={<SignUp />} />
              <Route path='/reset-password' element={<ResetPassword />} />
              <Route path='/publishContent' element={<PublishContent />} />
              <Route path='/search' element={<Page_search />} />
              <Route path='*' element={<NotFound404 />} />
            </Routes>
          </MainContent>
          <Footer />
        </MainContainer>
    </>
  )
}

export default App
