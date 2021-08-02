// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

var level = require("level-rocksdb");

export default function handler(req, res) {
  var db = level("./lunchdb");
  console.log("Got request for the database");
  console.log(req.query.id);
  db.get(req.query.id, function (err, value) {
    if (err) return console.log("DB request failed", err); // likely the key was not found
    console.log(value);
    db.close();
    res.end(value);
  });
}
