// Importamos los models necesarios
const heroesModel = require("../models/heroesModel");

const getHeroes = async (req, res) => {
  const users = await heroesModel.getHeroes();
  res.json(users);
};

const getHeroById = async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await heroesModel.getHeroById(id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
};

const createHero = async (req, res) => {
  const createdUser = await heroesModel.createHero(req.body);
  if (createdUser) {
    res.json(createdUser);
  } else {
    res.status(500).json({ message: "Se rompió el servidor" });
  }
};

const updateHero = async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await heroesModel.getHeroById(id);
  if (user) {
    const updatedUser = await heroesModel.updateHero(parseInt(req.params.id), {
      ...user,
      ...req.body,
    });

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(500).json({ message: "Se rompió el servidor" });
    }
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
};

const deleteHero = async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await heroesModel.getHeroById(id);
  if (user) {
    const result = await heroesModel.deleteHero(parseInt(req.params.id));

    if (result) {
      res.json(user);
    } else {
      res.status(500).json({ message: "Se rompió el servidor" });
    }
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
};

module.exports = {
  getHeroes,
  getHeroById,
  createHero,
  updateHero,
  deleteHero,
};
