const express = require("express");
const heroesRouter = express.Router();
// Importamos los controllers necesarios
const heroesController = require("../controllers/heroesController");

heroesRouter.get("/", heroesController.getHeroes);

heroesRouter.get("/:id", heroesController.getHeroById);

heroesRouter.post("/", heroesController.createHero);

heroesRouter.put("/:id", heroesController.updateHero);

heroesRouter.delete("/:id", heroesController.deleteHero);

module.exports = heroesRouter;
