import { PrismaClient } from "@prisma/client";
import pino from "pino";
import { LogEvents } from "@/lib/logEvents"; 

const logger = pino({ name: "lunch-api" });
const prisma = new PrismaClient();

async function updateLunchProfile(profileId, lunchProfile) {
  return prisma.lunchProfile.update({
    where: { id: profileId },
    data: lunchProfile,
  });
}

export default async function handler(req, res) {
  if (req.method !== "PUT" && req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const profileId = req.body?.authid?.admin;
  const lunchProfile = req.body?.lunchProfile;

  if (!profileId) {
    logger.warn({ event: LogEvents.LUNCH_UPDATE }, "Missing profile id");
    return res.status(400).json({ error: "Missing profile id" });
  }

  if (!lunchProfile) {
    logger.warn({ event: LogEvents.LUNCH_UPDATE }, "Missing lunch profile data");
    return res.status(400).json({ error: "Missing lunch profile data" });
  }

  try {
    const updated = await updateLunchProfile(profileId, lunchProfile);

    logger.info(
      { event: LogEvents.LUNCH_UPDATE, profileId },
      "Updated lunch profile"
    );

    return res.status(200).json(updated);
  } catch (error) {
    if (error.code === "P2025") {
      logger.warn({ event: LogEvents.LUNCH_UPDATE, profileId }, "Profile not found");
      return res.status(404).json({ error: "Profile not found" });
    }

    logger.error({ event: LogEvents.DB_ERROR, error }, "Failed to update lunch profile");
    return res.status(500).json({ error: "Internal server error" });
  }
}