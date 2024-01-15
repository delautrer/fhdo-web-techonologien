const express = require("express");
const app = express();
const port = 8123;

const { initialisiereLehrangebot } = require("./models/persistence");
initialisiereLehrangebot();
const router = require("./routes/routes");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(__dirname + "/public"));

app.use("", router);

app.listen(port, () => {
  console.log("Express-Server ist an und hört auf Port " + port);
});
