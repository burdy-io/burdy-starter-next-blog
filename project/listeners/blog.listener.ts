import Hooks from 'burdy/src/shared/features/hooks';
import asyncMiddleware from 'burdy/src/server/middleware/async.middleware';
import Tag from 'burdy/src/server/models/tag.model';
import { getEnhancedRepository } from 'burdy/src/server/common/orm-helpers';
import Post from 'burdy/src/server/models/post.model';
import { compilePost, publishedQuery } from 'burdy/src/server/common/post.utility';


Hooks.addAction('api/init', async (app) => {
  app.get('/categories', asyncMiddleware(async (req, res) => {
    const tagsRepository = getEnhancedRepository(Tag);
    const qb = tagsRepository.createQueryBuilder('tag')
      .leftJoinAndSelect('tag.parent', 'parent')
      .where('parent.slug = :slug', {slug: 'category'})

    const categories = await qb.getMany();
    res.send(categories);
  }));

  app.get('/blogs', asyncMiddleware(async (req, res) => {
    const {tags} = req.query as any;
    const postRepository = getEnhancedRepository(Post);

    const countQb = postRepository.createQueryBuilder('post_count')
      .leftJoinAndSelect('post_count.contentType', 'contentType')
      .leftJoinAndSelect('post_count.tags', 'tags')
      .leftJoinAndSelect('tags.parent', 'tags.parent')
      .where('post_count.type = :type', {type: 'post'})
      .andWhere('contentType.name = :name', {name: 'blogs'})

    if (tags?.length > 0) {
      countQb.andWhere('tags.slugPath IN(:...tags)', {tags})
    }

    publishedQuery(countQb, 'post_count' as any);

    const qb = postRepository.createQueryBuilder('post')
      .leftJoinAndSelect('post.contentType', 'contentType')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.meta', 'meta')
      .leftJoinAndSelect('post.tags', 'tags')
      .leftJoinAndSelect('tags.parent', 'tags.parent')
      .where('post.type = :type', {type: 'post'})
      .andWhere('contentType.name = :name', {name: 'blogs'})

    publishedQuery(qb);

    if (tags?.length > 0) {
      qb.andWhere('tags.slugPath IN(:...tags)', {tags})
    }

    qb.addOrderBy('post.updatedAt', 'DESC');

    const [posts, count] = await Promise.all([
      qb.getMany(),
      countQb.getCount()
    ]);

    const compiledPosts = await Promise.all(posts.map(post => compilePost(post)));

    res.send({
      count,
      data: compiledPosts
    });
  }));

  app.get('/blogs/:slug', asyncMiddleware(async (req, res) => {
    const postRepository = getEnhancedRepository(Post);

    const qb = postRepository.createQueryBuilder('post')
      .leftJoinAndSelect('post.contentType', 'contentType')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.meta', 'meta')
      .leftJoinAndSelect('post.tags', 'tags')
      .leftJoinAndSelect('tags.parent', 'tags.parent')
      .where('post.slug = :slug', {slug: req.params.slug})
      .andWhere('post.type = :type', {type: 'post'})
      .andWhere('contentType.name = :name', {name: 'blogs'})

    publishedQuery(qb);

    const post = await qb.getOne();
    const compiled = await compilePost(post);

    res.send(compiled);
  }));

  app.get('/uncompiled/:slug', asyncMiddleware(async (req, res) => {
    const postRepository = getEnhancedRepository(Post);

    const qb = postRepository.createQueryBuilder('post')
      .leftJoinAndSelect('post.contentType', 'contentType')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.meta', 'meta')
      .leftJoinAndSelect('post.tags', 'tags')
      .leftJoinAndSelect('tags.parent', 'tags.parent')
      .where('post.slug = :slug', {slug: req.params.slug})
      .andWhere('post.type = :type', {type: 'post'})
      .andWhere('contentType.name = :name', {name: 'blogs'})

    publishedQuery(qb);

    const post = await qb.getOne();

    res.send(post);
  }))
})
