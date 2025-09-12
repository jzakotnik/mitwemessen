import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

/*
{
  authid: {
    admin: 'ebb785b4-d140-40fc-9cd7-577d121bed23',
    reader: 'f05ddd03-1013-4b86-9a66-cf0b78ceac01'
  },
  dayselection: { mon: true, tue: true, wed: true, thu: true, fri: true }
}

*/

async function insertUser(req) {
  const authid = req.body.authid;
  console.log("insert user", req.body);
  //const lunchprofile = req.body.dayselection;

  await prisma.user.create({
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
  });
  return prisma.user.findMany();
}

export default async function handler(req, res) {
  console.log("Inserting data into DB");
  console.log(req.body);

  const allUsers = await insertUser(req);
  console.log("Inserted user:");
  console.dir(allUsers);

  res.end().status(200);
}
