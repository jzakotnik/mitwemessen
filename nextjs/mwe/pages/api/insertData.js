import { PrismaClient } from "@prisma/client";
import pino from "pino";
import { LogEvents } from "@/lib/logEvents"; 

const logger = pino({ name: "lunch-api" });
const prisma = new PrismaClient();

async function createUser(authid) {
  return prisma.user.create({
    data: {
      public_id: authid.reader,
      private_id: authid.admin,
      name: "tbd",
      lunchprofile: {
        create: {
          mon: true,
          tue: true,
          wed: true,
          thu: true,
          fri: true,
          lunchtopic: 50,
        },
      },
    },
    include: { lunchprofile: true },
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const authid = req.body?.authid;

  if (!authid?.admin || !authid?.reader) {
    logger.warn({ event: LogEvents.LUNCH_CREATE }, "Missing or invalid authid");
    return res.status(400).json({ error: "Missing or invalid authid" });
  }

  try {
    const user = await createUser(authid);

    logger.info(
      { event: LogEvents.LUNCH_CREATE, publicId: authid.reader },
      "Created new user with lunch profile"
    );

    return res.status(201).json(user);
  } catch (error) {
    logger.error({ event: LogEvents.DB_ERROR, error }, "Failed to create user");
    return res.status(500).json({ error: "Internal server error" });
  }
}