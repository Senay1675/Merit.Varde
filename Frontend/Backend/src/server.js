// Importerar Express och skapar en instans av applikationen
const express = require("express");
const app = express();

// Importerar CORS för att tillåta förfrågningar från andra domäner
const cors = require("cors");

// Importerar utbildningar-router, som hanterar alla utbildningsrelaterade endpoints
const utbildningarRouter = require("./routes/utbildningar");

// Aktiverar CORS så att frontend kan kommunicera med backend
app.use(cors());

app.use(express.json()); // Middleware för att hantera JSON i request-body

// Kopplar alla förfrågningar till "/utbildningar"-endpoints till utbildningarRouter
app.use("/utbildningar", utbildningarRouter);

// Definierar vilken port servern ska lyssna på
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
