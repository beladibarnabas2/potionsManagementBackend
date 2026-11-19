require("dotenv").config();

const express = require("express");
const usersRouter = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use("/api/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Bájitaltár API fut a 3000-es porton! http://localhost:${PORT}`);
});
