const app = require("./app");

const port = process.env.PORT;
console.log("PORT =>", port);
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
