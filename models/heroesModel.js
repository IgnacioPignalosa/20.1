const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "haatiyfioraa",
  database: "planning",
  connectionLimit: 5,
});

const getHeroes = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT id, name, rol, class, hp FROM heroes"
    );
    return rows;
  } catch (error) {
  } finally {
    if (conn) conn.release();
  }
  return false;
};

const getHeroById = async (id) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT * FROM heroes WHERE id=?",
      [id]
    );

    return rows[0];
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release();
  }
  return false;
};

const createHero = async (hero) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      `INSERT INTO heroes(name, rol, class, hp) VALUE(?, ?, ?, ?)`,
      [hero.name, hero.rol, hero.class, hero.hp]
    );

    return { id: parseInt(response.insertId), ...hero };
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release();
  }
  return false;
};

const updateHero = async (id, hero) => {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(
      `UPDATE heroes SET name=?, rol=?, class=?, hp=? WHERE id=?`,
      [hero.name, hero.rol, hero.class, hero.hp, id]
    );

    return { id, ...hero };
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release();
  }
  return false;
};

const deleteHero = async (id) => {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query("DELETE FROM heroes WHERE id=?", [id]);

    return true;
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release();
  }
  return false;
};

module.exports = {
  getHeroes,
  getHeroById,
  createHero,
  updateHero,
  deleteHero,
};
