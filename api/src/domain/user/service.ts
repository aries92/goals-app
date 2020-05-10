import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../db";
import config from "../../config";
import { handleError } from "../../utils/helpers";

async function checkUser(email: string) {
  const {
    rows
  } = await db.query(`SELECT exists(SELECT * FROM "user" WHERE "email"= $1);`, [
    email
  ]);
  return rows[0].exists;
}

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
    const exist = await checkUser(email);
    if (exist) {
      handleError("user already existed");
    }
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    await db.query(
      `INSERT INTO "user" ("email", "hash", "salt") VALUES ($1, $2, $3)`,
      [email, hash, salt]
    );
    return "user has been created";
  } catch (e) {
    handleError(e.message, "error while creating user");
  }
}

export async function login(email: string, password: string) {
  try {
    const res = await db.query(
      `SELECT "id","email","hash" FROM "user" WHERE "email" = $1;`,
      [email]
    );
    if (!res.rows.length) {
      handleError("user not existed");
    }
    const { hash, ...user } = res.rows[0];
    const access = await bcrypt.compare(password, hash);

    if (!access) {
      handleError("wrong email or password");
    } else {
      return jwt.sign({ user }, config.jwtSecret, { expiresIn: "3d" });
    }
  } catch (e) {
    handleError(e.message, "error during login");
  }
}
