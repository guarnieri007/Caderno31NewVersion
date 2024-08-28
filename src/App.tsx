import React from 'react'
import styles from '@/App.module.scss'
import { Header } from '@/component/common/header'
import { MainContent } from './component/common/mainContent'
import { Footer } from './component/common/footer'
function App() {

  return (
    <>
      <div className={styles.mainContainer}>
        <Header />
        <MainContent>
          Novo post
        </MainContent>
        <Footer />
      </div>
    </>
  )
}

export default App
