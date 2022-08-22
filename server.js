const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sendEmail, serverAdapter } = require("./queues/emailQueue");

const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.json({
    message: "hello there",
  });
});

app.post("/data", async (req, res) => {
  await sendEmail(req.body);
  return res.json(req.body);
});

app.use("/admin/queues", serverAdapter.getRouter());

app.listen(3000, () => {
  console.log("port running on 3000");
});
