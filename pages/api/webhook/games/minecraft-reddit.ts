import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message?: string,
  error?: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, body } = req;
  const DISCORD_MINECRAFT_TOKEN = process.env.DISCORD_MINECRAFT_TOKEN;

  console.log(req.body)

  if (method !== 'POST') return res.status(400).json({ error: 'Bad request' });

  const { subreddit, url } = JSON.parse(body);

  console.log(subreddit, url)

  if (!subreddit.includes('minecraft')) return res.status(200).json({ message: 'ok' });

  try {
    await fetch(`https://discord.com/api/webhooks/1011069949827100712/${DISCORD_MINECRAFT_TOKEN}`, {
      method: 'POST',
      "headers": {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: `New saved post: ${url}`,
      }),
    });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }

  res.status(200).json({ message: 'Sent to webhook' });
}
