const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});

// serve your css as static
app.use(express.static(__dirname  +  "/public"));

app.get("/ak", (req, res) => {
  res.send("welcome ak");
});
app.get("/js", (req, res) => {
  res.json([{ no:1,text:"wwlcome ak"}]);
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});