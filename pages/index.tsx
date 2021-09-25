import type { GetServerSideProps, NextPage } from 'next';
import { Container } from 'react-bootstrap';
import { createUseStyles } from 'react-jss';
import Typography from '../components/typography';
import axios from 'axios';
import BlogPost from '../components/blog-post';
import { IBurdyBlog, IBurdyTag } from '../types/burdy-cms';
import CategoryTabs from '../components/category-tabs';
import SeoHead from '../components/seo-head';

interface IHomeProps {
  blogs: IBurdyBlog[];
  categories: IBurdyTag[],
  categorySlug?: string;
  count: number;
}

const useStyles = createUseStyles({
  container: {
    paddingTop: 40
  },
  blogs: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '2rem',
    '@media(max-width: 1080px)': {
      gridTemplateColumns: 'repeat(2, 1fr)'
    },
    '@media(max-width: 767px)': {
      gridTemplateColumns: '1fr'
    }
  },
  heading: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    paddingBottom: '0.5rem'
  }
});

const Home: NextPage<IHomeProps> = ({blogs, categories, count, categorySlug}) => {
  const classes = useStyles();

  return (
    <>
      <SeoHead title="Burdy - Next Blog" description="" />
      <CategoryTabs tags={categories} activeSlug={categorySlug} />
      <Container className={classes.container}>
        <Typography variant="h1" className={classes.heading}>
          My Creative Corner
        </Typography>
        {blogs.length === 0 ? (
          <Typography variant="h5" style={{fontWeight: 'normal'}}>
            It appears that there are no blogs here, start by creating them on&nbsp;
            <a href={'http://localhost:4000/admin'} target="_blank">http://localhost:4000/admin</a>.
          </Typography>
        ) : (
          <section className={classes.blogs}>
            {blogs.map(blog => (
              <BlogPost key={blog.id} blog={blog}/>
            ))}
          </section>
        )}
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const [
    {data: {data: blogs, count}},
    {data: categories}
  ] = await Promise.all([
    axios.get('http://localhost:4000/api/blogs'),
    axios.get('http://localhost:4000/api/categories')
  ]);

  return {
    props: {
      blogs,
      count,
      categories,
      categorySlug: null
    }
  };
};

export default Home;
