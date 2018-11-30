import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import Post from "../shared/Post/Post";
import axios from "axios";

const app = express();
app.use(express.static("public"));

app.get("/api/posts", (req, res) => {
  res.json([
    {
      id: "12a",
      name: "hello world get oscar this year",
      description: "lorem lorem lorem lorem is boring",
      date: "2018 December 2nd"
    },
    {
      id: "12ab",
      name: "hello world get oscar this year also",
      description: "lorem lorem lorem lorem is boring",
      date: "2018 December 3rd"
    }
  ]);
});

app.get("*", (req, res) => {
  Post.fetchInitialData().then(initialData => {
    res.send(`
      <!DOCTYPE html>
      <head>
        <title>Universal Reacl</title>
        <link rel="stylesheet" href="/css/main.css">
        <script src="/bundle.js" defer></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <script>window.__initialData__=${JSON.stringify(initialData)}</script>
        </head>
      <body>
        <div id="root">${renderToString(
          <Post initialData={initialData} />
        )}</div>
      </body>
    </html>
  `);
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening");
});
