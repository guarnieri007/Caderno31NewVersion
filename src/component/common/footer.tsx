import React from "react";
import styles from '@/App.module.scss';

export const Footer = () => {
    return(
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerLeft}>
                    <h1>
                       Your secret is safe with us ;) 
                    </h1>
                    <p>
                        The place you can be yourself
                    </p>
                    <div>
                        <span>Caderno31 © 2021</span>
                    </div>
                </div>
                <div className={styles.footerRight}>
                    <a>Suport</a>
                    <a>Help Center</a>
                    <a>Assistance Team</a>
                    <a>Instruction</a>
                    <a>Reach out for</a>
                </div>
            </div>
        </footer>
    )
}