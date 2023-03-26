import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id, media } = req.query;

    const response = await fetch(
      `https://api.themoviedb.org/3/${media}/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
    );

    const data = await response.json()

    if (response.status >= 400) throw new Error(data.status_message);

    res.status(200).json(data);
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      res.status(404).end(message);
    } else {
      res.status(500).end(`Unexpected error ${err}`);
    }
    console.log(err)
  }
}
