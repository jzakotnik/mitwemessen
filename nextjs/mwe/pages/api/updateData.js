import { PrismaClient } from "@prisma/client";
import LunchProfile from "../lunchprofile";

const prisma = new PrismaClient();

/*
Updating user
{
  dayselection: {
    id: 'baa1f695-c412-4d45-8f5a-b264314e7a55',
    mon: true,
    tue: false,
    wed: false,
    thu: true,
    fri: true
  },
  authid: { admin: '52b57e03-6cd3-436d-9c5d-881ad59ce35c' }
}

*/

async function updateUser(req) {
  const authid = req.body.authid.admin;
  console.log("Updating user");
  console.log(req.body);
  const lunchprofile = req.body.dayselection;
  console.log(lunchprofile);
  console.log(authid);

  const updateLunch = await prisma.lunchprofile.update({
    where: {
      user: { private_id: authid },
    },
    data: lunchprofile,
  });
  return true;
}

export default async function handler(req, res) {
  console.log("Updating data into DB");
  console.log(req.body);

  const allUsers = await updateUser(req);
  console.log("Updated user:");

  res.end().status(200);
}
