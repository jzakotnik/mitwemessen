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
  //found reader link
  if (result != null) {
    return res
      .status(200)
      .json({ admin: false, lunchprofile: result.lunchprofile });
  }

  const result2 = await prisma.user.findFirst({
    where: { private_id: req.query.id },
    include: { lunchprofile: true },
  });
  console.log("Private ID: " + JSON.stringify(result2));

  //found admin link
  if (result2 != null) {
    return res
      .status(200)
      .json({ admin: true, lunchprofile: result2.lunchprofile });
  }
  //found nothing
  return res.status(400).end();
}
