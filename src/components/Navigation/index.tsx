'use client';

import clsx from 'clsx';
import css from './Navigation.module.css';

type NavigationProps = {
    currentPath?: string;
}

export const Navigation = ({ currentPath = '/' }: NavigationProps) => (
    <div className={css.navigationContainer}>
        <header className={css.masthead}>
            <a href="/">
                <img src="/caesar-logo.png" width={56} height={56} alt="Logo" />
                <span className={css.applicationName}>Caesar X</span>
                <span className={css.applicationVersion}>v0.1.0</span>
            </a>
        </header>
        <nav className={css.navigationMenu}>
            <div className={css.subAppContainer}>
                <span className={css.subAppTitle}>Analyseverktøy</span>
                <ul className={css.subAppMenu}>
                    <li className={clsx({
                        [css.current]: currentPath === '/',
                    })}>
                        <span className={clsx(css.icon, css.inspector)} />
                        <a href="/">Inspektør</a>
                    </li>
                    <li className={clsx({
                        [css.current]: currentPath === '/upload',
                    })}>
                        <span className={clsx(css.icon, css.upload)} />
                        <a href="/upload">Last opp filer</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
);