import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   input: Number;
//   seconds: Number;
//   minutes: Number;
//   hours: Number;
//   days: Number;
//   years: Number;
// }

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;
  if (slug) {
    const month = slug[0];
    const day = slug[1];
    const year = slug[2];

    if (!month || !day || !year) {
      const { query } = req.query;
      res.status(400).json({
        Error: "You didn't correctly format your request.",
        Your_Input: `${query}`,
        Solution:
          "Use this format: /api/countdown/MM/DD/YYYY. YY will work but can return past AND future values depending on the input! Ex. 12/12/49 returns the Dec 12, 2049, while 12/12/50 returns Dec 12, 1950...",
        Help: "Visit https://ob-nextup.vercel.app/countdown",
      });
    } else {
      const userInput = `${month}/${day}/${year}`;

      const future = new Date(userInput).getTime();
      const now = new Date().getTime();

      const msTill = future - now;

      const seconds = Math.floor(msTill / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const years = Math.floor(days / 365);

      res.status(200).json({
        input: userInput,
        seconds: seconds % 60,
        minutes: minutes % 60,
        hours: hours % 24,
        days: days % 365,
        years: years,
      });
    }
  }
}
