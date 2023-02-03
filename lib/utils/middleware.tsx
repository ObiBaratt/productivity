import { NextApiRequest, NextApiResponse } from "next";

export default function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  middleware: Function,
) {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
