
const express = require("express");
const app = express();
require("dotenv").config();

const { isAuthenticated } = require("./middleware/jwt.middleware");

// âšī¸ Connects to the database
require("./db");

// âšī¸ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// đ Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const recipeRoutes = require("./routes/recipe.routes");
app.use("/api", recipeRoutes);
 
const authRouter = require("./routes/auth.routes");       //  <== IMPORT
app.use("/auth", authRouter);                             //  <== ADD

// â To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
