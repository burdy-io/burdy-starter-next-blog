import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import React from 'react';
import Button from './button';
import { Container } from 'react-bootstrap';
import ThemeUtil from '../utils/theme.util';
import Link from 'next/link';

const useStyles = createUseStyles({
  header: {
    paddingTop: 12,
    paddingBottom: 12,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    borderBottom: '1px solid rgba(0,0,0,0.06)',
    background: ThemeUtil.colors.white,
    zIndex: 20,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    lineHeight: 0,
    display: 'grid',
    gridGap: '0.5rem',
    gridAutoFlow: 'column',
    alignItems: 'center'
  }
});

const Header = () => {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <Container className={classNames(classes.container, 'container')}>
        <Link href="/" passHref>
          <a className={classes.image}>
            <img src="/burdy.svg" alt="Burdy Blog" width={40} height={40}/>
            <span>Blogs</span>
          </a>
        </Link>
        <Button color="primary"
                href="https://burdy.io/docs?utm_source=starter-template&utm_medium=next-blog"
                target="_blank"
        >
          Documentation
        </Button>
      </Container>
    </header>
  );
};


export default Header;
