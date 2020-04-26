import db from "../../db";

export async function createGoal(userId: number, text: string) {
  try {
    await db.query(
      `INSERT INTO "goal" ("userId", "text", "complete") VALUES ($1, $2, false)`,
      [userId, text]
    );
    return "done";
  } catch (e) {
    console.error(e);
    return "error";
  }
}
export async function getGoals() {
  try {
    const { rows } = await db.query(`SELECT * FROM "goal"`, []);
    return rows;
  } catch (e) {
    console.error(e);
    return "error";
  }
}
export async function completeGoal(
  id: number,
  complete: boolean,
  userId: number
) {
  try {
    await db.query(
      `UPDATE "goals" SET "complete" = $1, "userId" = $2 WHERE "id" = $2;`,
      [complete, userId, id]
    );
    return "done";
  } catch (e) {
    console.error(e);
    return "error";
  }
}
