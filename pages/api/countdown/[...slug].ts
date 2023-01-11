import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  const MONTHS_WITH_30_DAYS = [4, 6, 9, 11]
  if (slug) {
    const month = parseInt(slug[0]);
    const day = parseInt(slug[1]);
    const year = parseInt(slug[2]);

    let maxValidDay = MONTHS_WITH_30_DAYS.includes(month) ? 30 : 31

    if (month === 2) {
      if (year % 4 === 0) {
        maxValidDay = 29
      } else {
        maxValidDay = 28
      }
    }
    console.log(maxValidDay)

    if (!month || !day || !year) {
      const { query } = req.query;
      res.status(400).json({
        Error: "You didn't correctly format your request.",
        Your_Input: `${query}`,
        Solution:
          "Use this format: /api/countdown/MM/DD/YYYY. YY will work but can return past AND future values depending on the input! Ex. 12/12/49 returns the Dec 12, 2049, while 12/12/50 returns Dec 12, 1950...",
        Help: "Visit https://ob-nextup.vercel.app/countdown",
      });
    } else if (day > maxValidDay) {
      res.status(400).json({
        Error: "Some months (4, 6, 9, 11) only have 30 days, additionally Feb only has 29 days on Leap years which happen every 4 years and result in Febuary having 29 days.",
        Solution: "If the month is: [4, 6, 9, 11] max days = 30, else if month is [2] max days = 28 or 29, otherwise max days = 31."
      })
    }
    {
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
