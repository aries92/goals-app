import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../db";
import config from "../../config";

export async function getUser(email: string) {
  try {
    const { rows } = await db.query(`SELECT * FROM "user" WHERE "email" = $1`, [
      email
    ]);
    return rows[0];
  } catch (e) {
    console.error(e);
    return "error";
  }
}

export async function createUser(email: string, password: string) {
  try {
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    await db.query(
      `INSERT INTO "user" ("email", "hash", "salt") VALUES ($1, $2, $3)`,
      [email, hash, salt]
    );
    return "user created";
  } catch (e) {
    console.error(e);
    return "error";
  }
}

export async function removeUser(email: string) {
  try {
    await db.query(`DELETE FROM "user" WHERE "email" = $1;`, [email]);
    return "user deleted";
  } catch (e) {
    console.error(e);
    return "error";
  }
}

export async function login(email: string, password: string) {
  try {
    const res = await db.query(
      `SELECT "id","email","hash" FROM "user" WHERE "email" = $1;`,
      [email]
    );
    const { hash, ...user } = res.rows[0];
    const access = await bcrypt.compare(password, hash);

    if (!access) {
      return "wrong email or password";
    } else {
      return jwt.sign({ user }, config.jwtSecret, { expiresIn: "3d" });
    }
  } catch (e) {
    console.error(e);
    return "error";
  }
}
