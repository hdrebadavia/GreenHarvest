require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize, connectDB } = require("./config/db");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./config/swagger-output.json");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/stores", require("./routes/storeRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Connect to DB and start server
const PORT = 5001;
connectDB();

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

sequelize.authenticate()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => console.error("❌ Database connection failed:", err));

const db = require("./models");

const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');
console.log(secret);

// db.sequelize.sync({ force: true }) // ⚠️ DANGER: This resets all tables!
//   .then(() => console.log("✅ Database & tables synced"))
//   .catch(err => console.error("❌ Sync error:", err));

