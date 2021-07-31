// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

var level = require("level-rocksdb");

export default function handler(req, res) {
  var db = level("./lunchdb");
  console.log("Inserting data into DB");
  console.log(req.body);
  const authurl = req.body.authurl;
  const lunchprofile = req.body.lunchprofile;

  db.put(
    authurl.admin,
    { lunchprofile, reader: authurl.reader, admin: true },
    function (err) {
      if (err) return console.log("Ooops!", err); // some kind of I/O error
    }
  );
  db.put(authurl.reader, { lunchprofile, admin: false }, function (err) {
    if (err) return console.log("Ooops!", err); // some kind of I/O error
  });
  db.close();

  res.end().status(200);
}
