// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

var level = require("level-rocksdb");

export default function handler(req, res) {
  var db = level("./lunchdb");
  //console.log(req.body);
  /*db.get("juresUUID", function (err, value) {
    if (err) return console.log("Ooops!", err); // likely the key was not found
    console.log(value);
  });*/
  db.createReadStream()
    .on("data", function (data) {
      console.log(data.key, "=", data.value);
    })
    .on("error", function (err) {
      console.log("Oh my!", err);
    })
    .on("close", function () {
      console.log("Stream closed");
    })
    .on("end", function () {
      console.log("Stream ended");
    });
  db.close();
  res.end().status(200);
}
