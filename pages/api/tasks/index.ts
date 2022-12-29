import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return res.status(200).send(
        await prisma.task.findMany({
          where: { isDone: false, isTrash: false },
        })
      );
    case "POST":
      return res.status(200).send(await prisma.task.create({ data: req.body }));
    default:
      return res.status(405).end();
  }
};

export default handler;
