import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query);
  if (req.method !== "GET") {
    return res.status(405).json({
      Error: "Method not allowed, this route is only for GET requets.",
    });
  }

  if (
    typeof req.query.id !== "string" ||
    Number.isNaN(parseInt(req.query.id))
  ) {
    return res.status(400).json({
      Status: "https://http.cat/400",
      Error: "Bad request. Try a number.",
    });
  }

  const data = await prisma.facts.findUnique({
    where: {
      id: parseInt(req.query.id),
    },
  });

  if (data) {
    return res.status(200).send(data);
  } else {
    return res.status(400).json({
      Status: "https://httpstatusdogs.com/400-bad-request",
      Error: "Invalid ID. Entry does not exist.",
    });
  }
};

export default handler;
