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
    const response = await fetch(`https://discord.com/api/webhooks/1011069949827100712/${DISCORD_MINECRAFT_TOKEN}`, {
      method: 'POST',
      "headers": {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36"
      },
      body: JSON.stringify({
        content: `New saved post: ${url}`,
      }),
    });
    if (response.ok) {
      res.status(200).json({ message: 'Sent to webhook' });
    } else {
      res.status(500).json({ error: 'Error sending to webhook' });
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }

}
