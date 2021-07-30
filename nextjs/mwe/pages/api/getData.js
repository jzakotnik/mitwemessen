// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

var level = require("level-rocksdb");

export default function handler(req, res) {
  var db = level("./lunchdb");
  console.log(req.body);
  db.get("juresUUID", function (err, value) {
    if (err) return console.log("Ooops!", err); // likely the key was not found
    console.log(value);
  });
  db.close();
  res.end().status(200);
}
