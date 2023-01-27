import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  res.status(400).json({
    Error: "You didn't correctly format your request.",
    Your_Input: `${query}`,
    Solution: "Use this format: /api/countdown/TIMEZONE/MM/DD/YYYY",
    Help: "Visit https://ob-nextup.vercel.app/countdown",
  });
}
