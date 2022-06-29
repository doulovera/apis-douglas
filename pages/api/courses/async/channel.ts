import type { NextApiRequest, NextApiResponse } from 'next';
import getRapidApi from '@utils/getRapidApi';
import { Item, MappedItem } from '@typests/courses/async/channel';

type Data = {
  data?: MappedItem,
  error?: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, query } = req;

  if (method !== 'GET') return res.status(400).json({ error: 'Bad request' });
  if (!query?.channelId) return res.status(400).json({ error: 'Missing \"channelId\"' })

  const data = await getRapidApi(`https://youtube-v31.p.rapidapi.com/channels?part=snippet%2Cstatistics&id=${query.channelId}`)

  const channelData = data?.items[0];
  const channelInfo = {
    title: channelData.snippet.title,
    description: channelData.snippet.description,
    thumbnail: channelData.snippet.thumbnails.high.url,
  }

  res.status(200).json({
    data: channelInfo,
  });
}
