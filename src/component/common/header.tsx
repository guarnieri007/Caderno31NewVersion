import React from "react";
import { ReactElement } from "react";
import bookIcon from '@/assets/icons/book-open.svg'
import { Button } from '@/component/common/inputs'
import styles from '@/App.module.scss'

export const Header = ():ReactElement => {
    return(
        <header className={styles.header}>
          <div className={styles.left}>

            <div className={styles.logo}>
              <img src={bookIcon} />
              <span className={styles.title}>Caderno31</span>
            </div>
            <a>Home</a>
            <a>Categories</a>
            <a>Posts</a>
          </div>
          <div className={styles.right}>
            <Button color='secondary'>log in</Button>
            <Button color='primary'>sign up</Button>
          </div>
        </header>
    )
}