// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// /* ✅ SIMPLE + SAFE CORS */
// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/projects", require("./routes/projects"));
// app.use("/api/skills", require("./routes/skills"));
// app.use("/api/search", require("./routes/search"));
// app.use("/api/certificates", require("./routes/certificates"));

// app.get("/", (req, res) => {
//   res.send("API running 🚀");
// });

// const { errorHandler, notFound } = require("./middleware/errorHandler");
// app.use(notFound);
// app.use(errorHandler);

// // Start server
// connectDB()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("DB connection failed:", err);
//     process.exit(1);
//   });

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(
  cors({
    origin: true,          // allow all origins dynamically
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/skills", require("./routes/skills"));
app.use("/api/search", require("./routes/search"));
app.use("/api/certificates", require("./routes/certificates"));


app.get("/", (req, res) => {
  res.status(200).send("API running 🚀");
});


const { errorHandler, notFound } = require("./middleware/errorHandler");

app.use(notFound);
app.use(errorHandler);


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });
