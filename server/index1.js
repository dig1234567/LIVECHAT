const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("正在經過middleWare");
  next();
});

app.use((req, res, next) => {
  console.log("正在經過第二個middleWare...");
  next();
});

app.get("/", (req, res) => {
  res.send("歡迎來到首頁");
});

app.get("/example", (req, res) => {
  res.sendFile(__dirname + "/example.html");
});

app.post("/formHandle", (req, res) => {
  let { email, password } = req.body;
  res.send("已收到您的表單以下是你的資料:" + email + " " + password);
});

app.get("/fruit", (req, res) => {
  res.send("歡迎來到水果頁面");
});

app.get("/*path", (req, res) => {
  res.status(404).send("錯誤頁面");
});

app.listen(5050, () => {
  console.log("Server is  running port 5050");
});
