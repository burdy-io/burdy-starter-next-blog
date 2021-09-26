import { IBurdyBlog } from '../types/burdy-cms';
import { createUseStyles } from 'react-jss';
import React from 'react';
import ThemeUtil from '../utils/theme.util';
import Image from './image';
import Typography from './typography';
import Link from 'next/link';
import { format } from 'date-fns';

const useStyles = createUseStyles({
  blogWrapper: {
    width: '100%'
  },
  blog: {
    display: 'grid',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: ThemeUtil.colors.white,
    gridTemplateRows: '240px 1fr',
    gridAutoColumns: '1fr',
    overflow: 'hidden',
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    transition: '.2s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: 'rgba(99, 99, 99, 0.25) 0px 2px 12px 0px',
      '& .image': {
        transform: 'scale(1.07)',
      }
    }
  },
  blogContent: {
    padding: '24px 32px 18px'
  },
  title: {
    fontWeight: '700'
  },
  content: {
    opacity: 0.85
  },
  category: {
    textTransform: 'uppercase',
    letterSpacing: '0.2ch',
    fontWeight: '700'
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '2rem',
    fontSize: '0.9rem',
    opacity: 0.6,
  },
  imageWrapper: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    '& > img': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      objectFit: 'cover',
      height: '100%',
      width: '100%',
      transition: '.15s ease-in-out',
      transform: 'scale(1.01)'
    }
  }
});

export interface IBlogPostProps {
  blog: IBurdyBlog;
}

const BlogPost: React.VoidFunctionComponent<IBlogPostProps> = ({blog}) => {
  const classes = useStyles();
  const content = blog.meta.content;
  const featured = content?.featured?.[0] ?? null;
  const category = blog.tags.filter(tag => tag.slugPath.startsWith('category'))?.[0]?.name ?? 'Category';

  return (
    <Link href={`/${blog.slug}`} passHref>
      <a className={classes.blogWrapper}>
        <article className={classes.blog}>
          {featured && (
            <div className={classes.imageWrapper}>
              <Image image={featured}/>
            </div>
          )}
          <div className={classes.blogContent}>
            <Typography className={classes.category} color="secondary">
              {category}
            </Typography>
            <Typography variant="h4" className={classes.title}>
              {content.title}
            </Typography>
            <Typography className={classes.content}>
              {content.description}
            </Typography>
            <div className={classes.info}>
              <div>{blog?.author?.firstName ?? 'Unknown'} {blog?.author?.lastName ?? 'Author'}</div>
              <div>{format(new Date(blog.updatedAt), 'LLL dd yyyy')}</div>
            </div>
          </div>
        </article>
      </a>
    </Link>
  );
};

export default BlogPost;
