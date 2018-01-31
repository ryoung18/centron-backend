const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

const { productRouter, userRouter } = require("./routes");

var cors = require('cors')

app.use(cors())



// var corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
//serve static assets  (css/javascript/images)
app.use(express.static(__dirname + "/public"));

app.use("/api/products", productRouter);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  return next(err);
});

app.use((err, req, res, next) => {
  return res.status(err.status || 500).send({
    message: err.message,
    error: app.get("env") === "development" ? err : {}
  });
});

app.listen(3001, function() {
  console.log("The server has started on port 3001");
});
