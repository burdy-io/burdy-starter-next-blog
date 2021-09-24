import { GetServerSideProps } from 'next';
import Home from '../index';
import axios from 'axios';


export const getServerSideProps: GetServerSideProps = async (context) => {
  const categorySlug = 'category/' + (context.params as any).slug;

  const [
    {data: {data: blogs, count}},
    {data: categories}
  ] = await Promise.all([
    axios.get('http://localhost:4000/api/blogs', {
      params: {
        tags: [categorySlug]
      }
    }),
    axios.get('http://localhost:4000/api/categories')
  ]);

  return {
    props: {
      blogs,
      count,
      categorySlug,
      categories
    }
  }
}

export default Home;
