export type Item = {
  snippet: {
    title: string,
    description: string,
    thumbnails: { default: any, medium: any, high: any },
    publishedAt: string,
    localized: {
      title: string,
      description: string,
    },
  },
};

export type MappedItem = {
  title: string,
  description: string,
  thumbnail: string,
};
