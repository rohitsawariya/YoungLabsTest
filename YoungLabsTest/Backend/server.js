import express from "express";
import cors from "cors";


const app = express();
app.use(cors());

app.get("/api/greet", (req, res) => {
  const name = req.query.name?.trim();
  if (!name) {
    return res.status(400).json({ error: "Name is required." });
  }
  res.json({ message: `Hello, ${name}! Welcome to Younglabs.` });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
