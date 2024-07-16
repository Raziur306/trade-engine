import express from "express";

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const router = express.Router();

router.get("*", (req, res) => {
  res.send("Hello World!");
});

app.use(router);
