import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

const VALID_PARAMS = [
  "count",
  //"id",
  "start",
  "random",
  "search",
  "exclude",
];

// http://localhost:3000/api/bears/facts?&count=5&start=3&dinner=Salmon,hikers,honey
// req.query = { count: '5', start: '3', dinner: 'Salmon,hikers,honey' }

// await prisma.facts.findMany({
//   where: {
//     fact: {
//       search: 'bear'
//     }
//   }
// })

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query);
  if (req.method !== "GET") {
    return res.status(405).json({
      Error: "Method not allowed, this route is only for GET requets.",
    });
  }

  if (req.query.random) {
    // RETURN RANDOM ITEM
  }

  let searchQuery;
  if (req.query.search || req.query.exclude) {
    const search = req.query.search ? `+${req.query.search}` : "";
    const exclude = req.query.exclude ? `-${req.query.exclude}` : "";
    searchQuery = `${search} ${exclude}`;
  }

  return res.status(200).send(await prisma.facts.findMany());
};
export default handler;
