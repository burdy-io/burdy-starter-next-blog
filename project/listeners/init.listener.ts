import Hooks from 'burdy/src/shared/features/hooks';
import { getEnhancedRepository } from 'burdy/src/server/common/orm-helpers';
import User from 'burdy/src/server/models/user.model';
import { UserStatus } from 'burdy/src/shared/interfaces/model';
import ContentType from 'burdy/src/server/models/content-type.model';
import Post from 'burdy/src/server/models/post.model';
import Asset from 'burdy/src/server/models/asset.model';
import Tag from 'burdy/src/server/models/tag.model';
import { getManager } from 'typeorm';
import FileDriver from 'burdy/src/server/drivers/file.driver';
import imageSize from 'image-size';
import { v4 } from 'uuid';
import fs from 'fs-extra';
import path from 'path';
import Migration from '../data/migration';

const defaultAssets = [
  {name: 'mars', file: 'mars.jpg'},
  {name: 'it-industry', file: 'it-industry.jpg'},
  {name: 'innovation', file: 'innovation.jpg'}
];

// Base Set-up
Hooks.addAction('core/firstInit', async () => {
  const fileDriver = FileDriver.getInstance();
  const localAssetsPath = path.join(process.cwd(), 'assets');

  await getManager().transaction(async entityManager => {
    try {
      const userRepository = getEnhancedRepository(User, entityManager);
      const assetRepository = getEnhancedRepository(Asset, entityManager);
      const contentTypeRepository = getEnhancedRepository(ContentType, entityManager);
      const postRepository = getEnhancedRepository(Post, entityManager);
      const tagsRepository = getEnhancedRepository(Tag, entityManager);

      const author = await userRepository.save({
        email: 'team@burdy.io',
        firstName: 'Team',
        lastName: 'Burdy',
        password: '/',
        status: UserStatus.DISABLED,
      });

      const assetPromises = defaultAssets.map(assetEntry => (async () => {
        const uuid = v4();
        const localFile = await fs.readFile(path.join(localAssetsPath, assetEntry.file));
        await fileDriver.write(uuid, localFile);
        const fileStats = await fileDriver.stat(uuid);
        const dimensions = imageSize(localFile);

        return assetRepository.save({
          author,
          npath: assetEntry.name,
          name: assetEntry.name,
          contentLength: fileStats.contentLength,
          document: uuid,
          provider: fileDriver.getName(),
          mimeType: 'image/jpeg',
          meta: [
            {key: 'height', value: dimensions.height},
            {key: 'width', value: dimensions.width}
          ]
        });
      })());

      const [marsAsset, innovationAsset, itIndustryAsset] = await Promise.all(assetPromises);

      const contentType = await contentTypeRepository.save(Migration.contentType);

      const categoryTag = await tagsRepository.save({
        author,
        slug: 'category',
        slugPath: 'category',
        name: 'Category',
      });

      const termTag = await tagsRepository.save({
        author,
        slug: 'term',
        slugPath: 'term',
        name: 'Term',
      });

      const scienceCategory = await tagsRepository.save({
        author,
        slug: 'science',
        slugPath: 'category/science',
        name: 'Science',
        parent: categoryTag
      });

      const itCategory = await tagsRepository.save({
        author,
        slug: 'it-industry',
        slugPath: 'category/it-industry',
        name: 'IT Industry',
        parent: categoryTag
      });

      const newTerm = await tagsRepository.save({
        author,
        slug: 'new',
        slugPath: 'term/new',
        name: 'New',
        parent: termTag
      });

      await postRepository.save({
        ...Migration.posts.executingOnInnovation,
        author,
        contentType,
        tags: [itCategory, newTerm],
        publishedAt: new Date(),
        meta: [
          ...Migration.posts.executingOnInnovation.meta,
          {
            'key': 'content.seo.featured',
            'value': `[{"id":${innovationAsset.id}}]`
          },
          {
            'key': 'content.featured',
            'value': `[{"id":${innovationAsset.id}}]`
          },
        ]
      });

      await postRepository.save({
        ...Migration.posts.lifeOnMars,
        author,
        contentType,
        tags: [scienceCategory, newTerm],
        publishedAt: new Date(),
        meta: [
          ...Migration.posts.lifeOnMars.meta,
          {
            'key': 'content.seo.featured',
            'value': `[{\"id\":${marsAsset.id}}]`
          },
          {
            'key': 'content.featured',
            'value': `[{\"id\":${marsAsset.id}}]`
          },
        ]
      });

      await postRepository.save({
        ...Migration.posts.scalabilityInSoftware,
        author,
        contentType,
        tags: [itCategory, newTerm],
        publishedAt: new Date(),
        meta: [
          ...Migration.posts.scalabilityInSoftware.meta,
          {
            'key': 'content.seo.featured',
            'value': `[{\"id\":${itIndustryAsset.id}}]`
          },
          {
            'key': 'content.featured',
            'value': `[{\"id\":${itIndustryAsset.id}}]`
          },
        ]
      });

      await userRepository.remove(author);
    } catch (e) {
      console.log(e);
    }
  });
});
