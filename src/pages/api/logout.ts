import { NextApiRequest, NextApiResponse } from 'next'
import { deleteCookie } from '@utils/cookie'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // Destroy cookie
    res.setHeader('Set-Cookie', deleteCookie())

    res.status(200).json({ success: true })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
