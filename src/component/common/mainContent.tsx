import React, { ReactNode } from "react";
import styles from '@/App.module.scss'

interface MaindContentProps {
    children: ReactNode
}

export const MainContent = ({children}:MaindContentProps) => {
    return (
        <main className={styles.content}>
            {children}
        </main>
    )
}