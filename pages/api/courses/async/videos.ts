import type { NextApiRequest, NextApiResponse } from 'next';
import getRapidApi from '@utils/getRapidApi';
import { Item, MappedItem } from '@typests/courses/async/videos';

type Data = {
  data?: {
    items: MappedItem[],
  },
  error?: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, query } = req;

  if (method !== 'GET') return res.status(400).json({ error: 'Bad request' });
  if (!query?.channelId) return res.status(400).json({ error: 'Missing \"channelId\"' })

  const data = await getRapidApi(`https://youtube-v31.p.rapidapi.com/search?channelId=${query.channelId}&part=snippet%2Cid&order=date&maxResults=9`)

  const videos = data?.items?.map((item: Item) => ({
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.default.url,
  }));

  res.status(200).json({
    data: videos,
  });
}
