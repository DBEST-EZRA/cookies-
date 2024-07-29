const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 5000;

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set default cookies if not present
app.use((req, res, next) => {
  if (!req.cookies.language) {
    res.cookie("language", "en", { maxAge: 900000, httpOnly: true });
  }
  if (!req.cookies.sessionId) {
    res.cookie("sessionId", "123456789", { maxAge: 900000, httpOnly: true });
  }
  next();
});

// Route to set language preference
app.post("/set-language", (req, res) => {
  const { language } = req.body;
  if (language) {
    res.cookie("language", language, { maxAge: 900000, httpOnly: true });
    res.send(`Language set to ${language}`);
  } else {
    res.status(400).send("Language not provided");
  }
});

// Route to get user session and language preference
app.get("/get-preferences", (req, res) => {
  const language = req.cookies.language;
  const sessionId = req.cookies.sessionId;
  res.send(`Language: ${language}, Session ID: ${sessionId}`);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
