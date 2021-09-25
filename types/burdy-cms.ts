export interface IBurdyPage<T extends {}> {
  id: number;
  name: string;
  slug: string;
  slugPath: string;
  updatedAt: Date;
  author: {
    firstName: string;
    lastName: string;
  }
  meta: {
    content: T
  }
  tags: IBurdyTag[];
}

export interface IBurdyTag {
  id: number;
  name: string;
  slug: string;
  slugPath: string;
  parent: Omit<IBurdyTag, 'parent'>
}

export interface IBurdyImage {
  id: number;
  name: string;
  height: number;
  width: number;
  mimeType: string;
  tags: IBurdyTag[];
  src: string;
  alt?: string;
}

export type IBurdyBlog = IBurdyPage<{
  title: string;
  description: string;
  featured: [IBurdyImage]
  content: any;
  seo: {
    title: string;
    description: string;
    featured: [IBurdyImage];
  }
}>
