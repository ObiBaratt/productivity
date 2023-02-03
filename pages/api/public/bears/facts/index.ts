import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { prisma } from "../../../../../lib/prisma";
import runMiddleware from "../../../../../lib/utils/middleware";

const VALID_PARAMS = ["count", "id", "start", "random", "search", "exclude"];

const MIN = 1;
const MAX = 30;

// const searchReq = req.query.search as string;
// const searchText = searchReq.trim().split(" ").join(" & ") + ":*";

// SEARCH FUNCTIONALITY
// await prisma.facts.findMany({
//   where: {
//     fact: {
//       search: 'bear'
//     }
//   }
// })

const cors = Cors({
  methods: ["GET"],
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors);

  if (req.method !== "GET") {
    return res.status(405).json({
      Error: "Method not allowed, this route is only for GET requets.",
    });
  }

  if (req.query.random) {
    const randNum = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
    let url;
    if (process.env.NODE_ENV === "production") {
      url = `https://ob-nextup.vercel.app/api/public/bears/facts/${randNum}`;
    } else {
      url = `http://localhost:3000/api/public/bears/facts/${randNum}`;
    }
    const data = await fetch(url).then((data) => data.json());
    return res.status(200).send(data);
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
