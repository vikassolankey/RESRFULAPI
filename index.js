const express = require("express");
const { request } = require("http");
const app = express();
const port = 8085;
const { v4: uuidv4 } = require("uuid");
var methodOverride = require("method-override");

const path = require("path");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    username: "vikki",
    content: "hey cutie beauty frooti",
    id: uuidv4(),
  },
  {
    username: "dandy.153",
    content: "hyy beautiful!",
    id: uuidv4(),
  },
];

app.listen(port, () => {
  console.log(
    "hey vikki your app is working good. I miss you so much welcome back   "
  );
});
app.get("/posts", (request, res) => {
  res.render("index.ejs", { posts });
});
app.get("/posts/new", (request, res) => {
  res.render("new.ejs");
});
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ username, content, id });
  res.redirect("/posts");
});
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("id.ejs", { post });
});
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  console.log(post);
  res.redirect("/posts");
});
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.delete("/posts/:id/delete", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});
