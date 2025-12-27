const _log = console.log;
const _info = console.info;
const _warn = console.warn;

console.log = console.info = console.warn = () => { };
require("dotenv").config();
console.log = _log;
console.info = _info;
console.warn = _warn;

process.on("warning", () => { });

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        process.env.FRONTEND_URL,
      ];

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


const projectsRoutes = require("./routes/projects");
const skillsRoutes = require("./routes/skills");
const searchRoutes = require("./routes/search");
const userRoutes = require("./routes/userRoutes");
const certificateRoutes = require("./routes/certificates");


app.get("/", (req, res) => {
  res.status(200).send("API is running 🚀");
});

// API routes
app.use("/api/projects", projectsRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/users", userRoutes);
app.use("/api/certificates", certificateRoutes);


const { errorHandler, notFound } = require("./middleware/errorHandler");

app.use(notFound);
app.use(errorHandler);


connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
