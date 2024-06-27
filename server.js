import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

import { answer } from "./index.js";

const app = express();
const port = 80;

app.use(bodyParser.json());

app.post("/test", (req, res) => {
  console.log(JSON.stringify(req.body, null, 2));
  res.end(JSON.stringify(req.body, null, 2));
});

app.post("/code-review", async (req, res) => {
  const body = req.body;
  const diff_url = body.pull_request?.diff_url;

  if (diff_url) {
    console.log("Wait for getting diff code info...");
    const diff_content = await axios.get(diff_url);
    const code = diff_content.data.split("@@")[2];

    console.log("Wait for gpt answer...");
    const message = await answer(code);
    console.log(message);

    res.end(message);
    return;
  }

  res.end("hello ai-code-review");
});

app.listen(port, () => {
  console.log(`⚡️ Server start at port ${port}`);
});
