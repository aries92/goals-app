import db from "../../db";
import { handleError } from "../../utils/helpers";

export async function addGoal(userId: number, text: string) {
  try {
    const res = await db.query(
      `INSERT INTO "goal" ("userId", "text", "complete") 
       VALUES ($1, $2, false) 
       RETURNING "id" ,"text", "userId", "complete"`,
      [userId, text]
    );
    return res.rows[0];
  } catch (e) {
    console.error(e);
    handleError(e.message, "error during adding goal");
  }
}
export async function deleteGoal(id: number) {
  try {
    const res = await db.query(`DELETE FROM "goal" WHERE "id" = $1`, [id]);
    return res.rows[0];
  } catch (e) {
    console.error(e);
    handleError(e.message, "error during adding goal");
  }
}
export async function getGoals() {
  try {
    const { rows } = await db.query(`SELECT * FROM "goal"`, []);
    return rows;
  } catch (e) {
    console.error(e);
    handleError(e.message, "error during getting goals");
  }
}
export async function setGoal(id: number, complete: boolean, userId: number) {
  try {
    const res = await db.query(
      `UPDATE "goal" SET "complete" = $1, "userId" = $2 WHERE "id" = $3 RETURNING "id","complete";`,
      [complete, userId, id]
    );
    return res.rows[0];
  } catch (e) {
    console.error(e);
    handleError(e.message, "error during setting goal");
  }
}
