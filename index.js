const express = require("express");
const appsRoute = require("./routes/app");

// settings
const app = express();
const PORT = process.env.PORT || 3000;
app.set("token", process.env.TOKEN || "recipeT0k3n");
app.listen(PORT, () => console.log(`Usando puerto", ${PORT}`));

// middlewares
app.use(express.json());
app.use("/api", appsRoute);

// routes
app.get("/", (req, res) => {
  res.send("Bienvenido API-ECOMMERCE");
});