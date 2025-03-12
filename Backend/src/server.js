const express = require("express");
const app = express();
const cors = require("cors");

const utbildningarRouter = require("./routes/utbildningar");

app.use(cors());

app.use(express.json()); // Middleware för att hantera JSON i request-body
app.use("/utbildningar", utbildningarRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
