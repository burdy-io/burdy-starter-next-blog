import { GetServerSideProps } from 'next';
import axios from 'axios';
import { IBurdyBlog } from '../types/burdy-cms';
import { createUseStyles } from 'react-jss';
import Image from '../components/image';
import { richtextToHtml } from 'burdy-web-utils';
import React, { useMemo } from 'react';
import classNames from 'classnames';
import { format } from 'date-fns';
import SeoHead from '../components/seo-head';

const useStyles = createUseStyles({
  container: {
    paddingTop: 100,
  },
  term: {
    borderRadius: 12,
    padding: '4px 16px',
    background: 'rgba(0, 0, 0, 0.06)',
    transition: '.2s ease-in-out',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.08)',
    }
  },
  termContainer: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridGap: 8,
    gridAutoColumns: 'max-content',
    marginBottom: 16
  }
});

interface IBlogPageProps {
  blog: IBurdyBlog
}

const BlogPage: React.VoidFunctionComponent<IBlogPageProps> = ({blog}) => {
  const classes = useStyles();
  const content = blog.meta.content;
  const html = useMemo(() => richtextToHtml(content.content), [content.content]);
  const terms = blog.tags.filter(tag => tag.slugPath.startsWith('term'));

  return (
    <>
      <SeoHead title={content.seo.title} featured={content.seo.featured?.[0]} description={content.seo.description} />
      <div className="richtext">
        <div className={classNames('richtext-container', 'richtext', classes.container)}>
          <div className="meta">
            <div className="info">
              <h1>{content.title}</h1>
              <p className="subtitle">{content.description}</p>
              <div className={classes.termContainer}>
                {terms.map(term => (
                  <div key={term.id} className={classes.term}>{term.name}</div>
                ))}
              </div>
              <div className="author">
                <div className="authorInfo">
                  <div className="authorName">
                    {blog?.author?.firstName ?? 'Unknown'} {blog?.author?.lastName ?? 'Author'}
                  </div>
                  <div className="authorSub">
                    {format(new Date(blog.updatedAt), 'dd LLL y')}
                  </div>
                </div>
              </div>
            </div>
            <Image image={content.featured[0]} className="image"/>
          </div>
          <main className="article" dangerouslySetInnerHTML={{__html: html}}/>
        </div>
      </div>
    </>
  );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = (context.params as any).id;
  const {data: blog} = await axios.get(`http://localhost:4000/api/blogs/${id}`);

  return {
    props: {
      blog
    }
  };
};

export default BlogPage;
