import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import '../styles/main.scss';
import ThemeUtil from '../utils/theme.util';
import Header from '../components/header';

const useGlobalStyles = createUseStyles({
  '@global': {
    '*': {
      margin: 0,
      padding: 0,
    },
    html: {
      background: ThemeUtil.colors.white
    },
    body: {
      fontFamily: '"Lato", sans-serif',
      fontWeight: 400,
      lineHeight: 1.75,
      color: ThemeUtil.colors.black,
    },
    '#__next': {
      background: ThemeUtil.colors.blank,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: '5rem'
    },
    button: {
      fontFamily: '"Lato", sans-serif',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0 0 1.38rem',
      lineHeight: 1.3,
      fontWeight: 700,
      fontFamily: ''
    },
    h1: {
      fontSize: '3.2rem',
      [ThemeUtil.mobileBreakpoint()]: {
        fontSize: '2.6rem',
      }
    },
    h2: {
      fontSize: '2.8rem',
      [ThemeUtil.mobileBreakpoint()]: {
        fontSize: '2.4rem'
      }
    },
    h3: {
      fontSize: '2.4rem',
      [ThemeUtil.mobileBreakpoint()]: {
        fontSize: '2.2rem'
      }
    },
    h4: {
      fontSize: '1.8rem',
      [ThemeUtil.mobileBreakpoint()]: {
        fontSize: '1.7rem'
      }
    },
    h5: {
      fontSize: '1.33rem',
    },
    h6: {
      fontSize: '0.9rem',
    },
    small: {
      fontSize: '0.75rem'
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
      position: 'relative'
    },
    'input, textarea': {
      boxSizing: 'border-box',
      fontFamily: '"Lato", sans-serif',
    }
  }
});

function MyApp({Component, pageProps}: AppProps) {
  useGlobalStyles();

  useEffect(() => {
    const style = document.getElementById('server-side-styles');
    style?.remove?.();
  }, []);

  return (
    <>
      <Header/>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
