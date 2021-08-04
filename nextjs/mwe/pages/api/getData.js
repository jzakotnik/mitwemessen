// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  console.log("Got request for the database");
  console.log(req.query.id);
  const result = await prisma.user.findFirst({
    where: { public_id: req.query.id },
    include: { lunchprofile: true },
  });
  console.log(result);
  res.status(200).json(result.lunchprofile);
}
