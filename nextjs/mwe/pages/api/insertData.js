// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

var level = require("level-rocksdb");

export default function handler(req, res) {
  var db = level("./lunchdb");
  console.log("Inserting data into DB");
  console.log(req.body);

  const authid = req.body.authid;
  const lunchprofile = req.body.dayselection;

  db.put(
    authid.admin,
    JSON.stringify({ lunchprofile, reader: authid.reader, admin: true }),
    function (err) {
      if (err) {
        db.close();
        return console.log("Inserting of new admin URL did not work", err); // some kind of I/O error
      }
    }
  );
  db.put(
    authid.reader,
    JSON.stringify({ lunchprofile, admin: false }),
    function (err) {
      if (err) {
        db.close();
        return console.log("Inserting of new reader URL did not work", err); // some kind of I/O error
      }
    }
  );
  db.close();

  res.end().status(200);
}
