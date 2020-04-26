import db from "../../db";

export async function getChatMessages(userId: number) {
  try {
    const { rows } = await db.query(
      `SELECT "cm"."id",
              "cm"."text",
              "cm"."chatId",
              "cmt"."type"
         FROM "chatMessage" cm,
              "chat" c,
              "chatMessageType" cmt
        WHERE "c"."userId" = $1
          AND "cm"."typeId" = "cmt"."id"; `,
      [userId]
    );
    return rows;
  } catch (e) {
    console.error(e);
    return "error";
  }
}

export async function createChat(userId: number) {
  try {
    await db.query(`INSERT INTO "chat" ("userId") VALUES ($1);`, [userId]);
    return "done";
  } catch (e) {
    console.error(e);
    return "error";
  }
}

export async function sendMessage(
  chatId: number,
  text: string,
  typeId: string
) {
  try {
    await db.query(
      `INSERT INTO "chatMessage" ("chatId", "text", "typeId") VALUES ($1,$2,$3);`,
      [chatId, text, typeId]
    );
    return "done";
  } catch (e) {
    console.error(e);
    return "error";
  }
}
