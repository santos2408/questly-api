import express from "express";

const app = express();

const port = 4000;

app.listen(4000, () => {
  console.log(`Server running at http://localhost:${port}`);
});
