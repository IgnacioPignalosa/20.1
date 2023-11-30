const heroesModel = require("../models/heroesModel");

const getHeroes = async (req, res) => {
  const heroes = await heroesModel.getHeroes();
  res.json(heroes);
};

const getHeroById = async (req, res) => {
  const id = parseInt(req.params.id);
  const hero = await heroesModel.getHeroById(id);
  if (hero) {
    res.json(hero);
  } else {
    res.status(404).json({ message: "Heróe no encontrado" });
  }
};

const createHero = async (req, res) => {
  const createdHero = await heroesModel.createHero(req.body);
  if (createdHero) {
    res.json(createdHero);
  } else {
    res.status(500).json({ message: "Se rompió el servidor" });
  }
};

const updateHero = async (req, res) => {
  const id = parseInt(req.params.id);
  const hero = await heroesModel.getHeroById(id);
  if (hero) {
    const updatedHero = await heroesModel.updateHero(parseInt(req.params.id), {
      ...hero,
      ...req.body,
    });

    if (updatedHero) {
      res.json(updatedHero);
    } else {
      res.status(500).json({ message: "Se rompió el servidor" });
    }
  } else {
    res.status(404).json({ message: "Heróe no encontrado" });
  }
};

const deleteHero = async (req, res) => {
  const id = parseInt(req.params.id);
  const hero = await heroesModel.getHeroById(id);
  if (hero) {
    const result = await heroesModel.deleteHero(parseInt(req.params.id));

    if (result) {
      res.json(hero);
    } else {
      res.status(500).json({ message: "Se rompió el servidor" });
    }
  } else {
    res.status(404).json({ message: "Heróe no encontrado" });
  }
};

module.exports = {
  getHeroes,
  getHeroById,
  createHero,
  updateHero,
  deleteHero,
};
