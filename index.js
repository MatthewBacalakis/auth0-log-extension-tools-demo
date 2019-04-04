require("dotenv").config();
const LogsProcessor = require("auth0-log-extension-tools").LogsProcessor;
const tools = require("auth0-extension-tools");
const path = require("path");
const fs = require("fs");

// file storage of settings is not suitable for production use
// management api token should not be stored in unencrypted plain text file
const storage = new tools.FileStorageContext(
  path.join(__dirname, "./data.json"),
  { mergeWrites: true }
);

//when authorizing a client read:logs is the only management api scope required
const processor = new LogsProcessor(storage, {
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  batchSize: process.env.BATCH_SIZE,
  startFrom: process.env.START_FROM,
  logTypes: ["fp"] //logs for logins that failed due to incorrect password.
});

processor
  .run((logs, cb) => {
    appendLogsToFile(logs);
    cb();
  })
  .then(status => console.log(status))
  .catch(err => console.log(err));

//for demo purposes write logs to file
const appendLogsToFile = logs => {
  var stream = fs.createWriteStream("logs.json", { flags: "a" });
  stream.write("\n");
  logs.forEach(function(item, index) {
    stream.write(JSON.stringify(item) + "\n");
  });

  stream.end();
};
