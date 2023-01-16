import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { count } = req.query;
  // if count isn't a valid number, throw error.
  // if count is greater than our range, return full range.

  // get <count> random ids, within our given range.

  // could SSR api res

  res.status(200).json({
    Res: count,
    help: "what",
  });
}
