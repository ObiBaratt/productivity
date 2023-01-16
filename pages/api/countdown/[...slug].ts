import type { NextApiRequest, NextApiResponse } from "next";

type FormattedTime = {
  hours: number;
  minutes: number;
  ms: number;
};

const handleTimeParam = (queryInput: string): FormattedTime => {
  if (!queryInput) {
    const time = { hours: 0, minutes: 0, ms: 0 };
    return time;
  }

  const timeArr: string[] = queryInput.split(":");
  const timeHrs: number = parseInt(timeArr[0]);
  const timeMins: number = parseInt(timeArr[1]);

  if (
    timeArr.length !== 2 || // Time input should be hrs and mins
    Number.isNaN(timeHrs) || // Ensure that the converted inputs are numbers
    Number.isNaN(timeMins) ||
    timeHrs < 0 || // Check hours. Can't be negative or over 24. If 24 minutes must be 0.
    timeHrs > 24 ||
    (timeHrs === 24 && timeMins !== 0) ||
    timeMins < 0 || // Check minutes. Can't be negative or over 60.
    timeMins > 60
  ) {
    const time = { hours: 0, minutes: 0, ms: 0 };
    return time;
  }

  const msToSpecifiedTime: number = (timeHrs * 60 + timeMins) * 60 * 1000;
  const time = { hours: timeHrs, minutes: timeMins, ms: msToSpecifiedTime };

  return time;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  const MONTHS_WITH_30_DAYS = [4, 6, 9, 11];
  if (slug) {
    const timezone: string = slug[0].toUpperCase();
    const month: number = parseInt(slug[1]);
    const day: number = parseInt(slug[2]);
    const year: number = parseInt(slug[3]);
    const timeParam: string = slug[4];

    let maxValidDay: number = MONTHS_WITH_30_DAYS.includes(month) ? 30 : 31;

    if (month === 2) {
      if (year % 4 === 0) {
        maxValidDay = 29;
      } else {
        maxValidDay = 28;
      }
    }

    if (!month || !day || !year) {
      const { query } = req.query;
      res.status(400).json({
        Error: "You didn't correctly format your request.",
        Your_Input: `${query}`,
        Solution:
          "Use this format: /api/countdown/TIMEZONE/MM/DD/YYYY/TT:TT. YY will work but can return past AND future values depending on the input! Ex. 12/12/49 returns the Dec 12, 2049, while 12/12/50 returns Dec 12, 1950...TT:TT refers to a specific time on the given date, and is OPTIONAL, it used it MUST be in 24hr clock syntax i.e. 17:25 NOT 5:25pm",
        Help: "Visit https://ob-nextup.vercel.app/countdown",
      });
    } else if (day > maxValidDay) {
      res.status(400).json({
        Error:
          "Some months (4, 6, 9, 11) only have 30 days, additionally Feb only has 29 days on Leap years which happen every 4 years and result in Febuary having 29 days.",
        Solution:
          "If the month is: [4, 6, 9, 11] max days = 30, else if month is [2] max days = 28 or 29, otherwise max days = 31.",
      });
    }
    {
      const userInput: string = `${month}/${day}/${year} ${timezone}`;

      const handledTime = handleTimeParam(timeParam);

      const future: number = new Date(userInput).valueOf() + handledTime.ms;
      const now: Date = new Date();

      const msTill: number = new Date(future - now.getTime()).getTime();

      const seconds: number = Math.floor(msTill / 1000);
      const minutes: number = Math.floor(seconds / 60);
      const hours: number = Math.floor(minutes / 60);
      const days: number = Math.floor(hours / 24);
      const years: number = Math.floor(days / 365);

      res.status(200).json({
        Inputs: {
          date: userInput,
          time: `${handledTime.hours}:${handledTime.minutes}`,
          info: "Date was formatted from the req URL MM/DD/YYYY. For time: 0:0 indicates ether midnight (if 0:0 was the actual input), or an invalid/missing 24hr time format HOURS:MINUTES i.e. 17:25.",
        },
        Response: {
          requestTimestamp: new Date(now).toLocaleString(),
          countdown: {
            seconds: seconds % 60,
            minutes: minutes % 60,
            hours: hours % 24,
            days: days % 365,
            years: years,
          },
        },
      });
    }
  }
}
