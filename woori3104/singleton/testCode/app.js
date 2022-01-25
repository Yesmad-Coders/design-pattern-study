const express = require("express");
const app = express();

const mongodb = require("./db");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.listen(3000, async () => {
  let client = await mongodb.getClient();
  let client2 = await mongodb.getClient();
  console.log(client2===client);
});

