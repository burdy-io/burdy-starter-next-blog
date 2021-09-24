import { IBurdyTag } from '../types/burdy-cms';
import React from 'react';
import { Container } from 'react-bootstrap';
import { createUseStyles } from 'react-jss';
import Link from 'next/link';
import ThemeUtil from '../utils/theme.util';
import classNames from 'classnames';

const useStyles = createUseStyles({
  wrapper: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
    marginTop: 65,
    background: 'white',
  },
  container: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content'
  },
  category: {
    padding: '8px 24px',
    display: 'inline-block',
    '&.active, &:hover': {
      color: ThemeUtil.colors.primary
    }
  }
});

interface ICategoryTabsProps {
  tags: IBurdyTag[];
  activeSlug?: string;
}

const CategoryTabs: React.VoidFunctionComponent<ICategoryTabsProps> = ({tags, activeSlug}) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Container>
        <Link href="/" passHref>
          <a className={classNames(classes.category, {active: !activeSlug})}>
            All Blogs
          </a>
        </Link>
        {tags.map(tag => (
          <Link key={tag.id} href={`/category/${tag.slug}`} passHref>
            <a className={classNames(classes.category, {active: activeSlug === tag.slugPath})}>
              {tag.name}
            </a>
          </Link>
        ))}
      </Container>
    </div>
  )
}

export default CategoryTabs;
