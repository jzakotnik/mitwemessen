// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

var level = require("level-rocksdb");

export default function handler(req, res) {
  var db = level("./lunchdb");
  console.log(req.body);
  db.put("juresUUID", JSON.stringify(req.body), function (err) {
    if (err) return console.log("Ooops!", err); // some kind of I/O error
  });
  db.close();

  res.end().status(200);
}
