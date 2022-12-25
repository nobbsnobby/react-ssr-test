const express = require("express");
const fs = require("fs");
const path = require("path");

const React = require("react");
const ReactDOMServer = require("react-dom/server");
const { Helmet } = require("react-helmet");
const { matchPath } = require("react-router-dom");

const { StaticRouter } = require("react-router-dom/server");
const { App } = require("../src/components/app");
// импорт роутов
const routes = require("./routes");

const app = express();

app.get(
  /\.(js|css|map|ico)$/,
  express.static(path.resolve(__dirname, "../dist"))
);

app.use("*", async (req, res) => {
  // читаем файл `index.html`
  let indexHTML = fs.readFileSync(
    path.resolve(__dirname, "../dist/index.html"),
    {
      encoding: "utf8",
    }
  );

  //fetch data from component
  let context = {};
  const matchRoute = routes.find((path) =>
    matchPath(path.path, req.originalUrl)
  );

  if (typeof matchRoute.component.getInitialProps === "function") {
    context = await matchRoute.component.getInitialProps();
  }

  let appHTML = ReactDOMServer.renderToString(
    <StaticRouter location={req.originalUrl} context={context}>
      <App context={context} />
    </StaticRouter>
  );
  const helmet = Helmet.renderStatic();

  //helmet replaces
  indexHTML = indexHTML.replace(
    /<title>.*<\/title>/gim,
    `${helmet.title.toString()}`
  );

  indexHTML = indexHTML.replace(
    '<div id="app"></div>',
    `<div id="app">${appHTML}</div>`
  );
  indexHTML = indexHTML.replace(
    "let initial_state = null;",
    `let initial_state = ${JSON.stringify(context)};`
  );

  // устанавливаем заголовок и статус
  res.contentType("text/html");
  res.status(200);

  return res.send(indexHTML);
});
// запускаем сервер на порту 9000
app.listen("9000", () => {
  console.log("Express server started at <http://localhost:9000>");
});
