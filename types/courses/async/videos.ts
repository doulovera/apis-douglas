export type Item = {
  kind: string,
  id: { kind: string, videoId: string },
  snippet: {
    publishedAt: string,
    channelId: string,
    title: string,
    description: 'Has visto películas como Matrix o Mr Robot? Aunque sea ciencia ficción, con la tecnología y la PROGRAMACIÓN puedes crear ...',
    thumbnails: { default: any, medium: any, high: any },
    channelTitle: string,
    liveBroadcastContent: string,
    publishTime: string
  },
};

export type MappedItem = {
  title: string,
  description: string,
  thumbnail: string,
};
