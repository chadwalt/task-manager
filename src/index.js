const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routers/user");
const taskRouter = require('./routers/tasks')

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
