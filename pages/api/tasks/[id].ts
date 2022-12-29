import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  switch (req.method) {
    case "PUT":
      return res.status(200).send(
        await prisma.task.update({
          where: { id: String(id) },
          data: req.body,
        })
      );
    case "DELETE":
      return res.status(200).send(
        await prisma.task.update({
          where: { id: String(id) },
          data: { isTrash: true },
        })
      );
    default:
      return res.status(405).end();
  }
};

export default handler;
