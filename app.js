const express = require("express");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "BIG_ADVENTURE";

// Aquí importamos los routers
const heroesRouter = require("./routes/heroesRoute.js");


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "./public/index.html");
});


// Auth
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "Mighty" && password === "H3r0") {
    const token = jwt.sign({ username }, SECRET_KEY);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Usuario y/o contraseña incorrecto" });
  }
});

// Middleware que autoriza a realizar peticiones a /heroes
app.use("/heroes", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Heróe no autorizado" });
  }
});
//---

// Asociamos el router de heroes con la ruta /heroes
app.use("/heroes", heroesRouter);

app.listen(port, () => {
  console.log(`Servidor listo para la siguiente AVENTURA! en http://localhost:${port}`);
});
