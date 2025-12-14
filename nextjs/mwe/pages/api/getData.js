import { PrismaClient } from "@prisma/client";
import pino from "pino";
import { LogEvents } from "@/lib/logEvents"; 

const logger = pino({ name: "lunch-api" });
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const id = req.query.id;

  if (!id) {
    logger.warn({ event: LogEvents.LUNCH_GET }, "Missing id parameter");
    return res.status(400).json({ error: "Missing id parameter" });
  }

  try {
    // Check for public (reader) access
    const publicUser = await prisma.user.findFirst({
      where: { public_id: id },
      include: { lunchprofile: true },
    });

    if (publicUser) {
      logger.info({ event: LogEvents.LUNCH_GET, userId: id, admin: false }, "Fetched lunch profile (reader)");
      return res.status(200).json({
        admin: false,
        lunchprofile: publicUser.lunchprofile,
      });
    }

    // Check for private (admin) access
    const privateUser = await prisma.user.findFirst({
      where: { private_id: id },
      include: { lunchprofile: true },
    });

    if (privateUser) {
      logger.info({ event: LogEvents.LUNCH_GET, admin: true }, "Fetched lunch profile (admin)");
      return res.status(200).json({
        admin: true,
        public_id: privateUser.public_id,
        lunchprofile: privateUser.lunchprofile,
      });
    }

    logger.warn({ event: LogEvents.LUNCH_GET, id }, "User not found");
    return res.status(404).json({ error: "User not found" });
  } catch (error) {
    logger.error({ event: LogEvents.DB_ERROR, error }, "Database error fetching lunch profile");
    return res.status(500).json({ error: "Internal server error" });
  }
}