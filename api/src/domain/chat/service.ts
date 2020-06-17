import db from "../../db";
import { handleError } from "../../utils/helpers";

export async function getMessages(userIdList: [number]) {
  try {
    const { rows } = await db.query(
      `SELECT *
         FROM "chatMessage"
         WHERE "chatId" = (
             SELECT "chatId"
             FROM "chatUser"
             WHERE "userId" = ANY($1::int[])
             GROUP BY "chatId"
             HAVING COUNT(DISTINCT "userId") = $2
         )`,
      [userIdList, userIdList.length]
    );
    return rows;
  } catch (e) {
    console.error(e);
    handleError(e.message, "error during getting messages");
  }
}

export async function sendMessage(
  userIdList: [number],
  userId: number,
  text: string
) {
  try {
    const {rows} = await db.query(
        `
                SELECT *
                FROM "chat";
                DO
                $$
                    DECLARE
                        "newChatId" integer;
                    BEGIN
                        SELECT "chatId"
                        FROM "chatUser"
                        WHERE "userId" = ANY ($1::int[])
                        GROUP BY "chatId"
                        HAVING COUNT(DISTINCT "userId") = $2
                        INTO "newChatId";

                        IF ("newChatId") IS NULL THEN
                            INSERT INTO "chat" DEFAULT
                            VALUES
                            RETURNING "id" INTO "newChatId";
                        END IF;
                        INSERT INTO "chatMessage" ("chatId", "text", "userId")
                        VALUES ("newChatId", $3, $4)
                        RETURNING *;
                    END;
                $$
                ;
      `,
      [userIdList, userIdList.length, text, userId]
    );
    return rows[0];
  } catch (e) {
    console.error(e);
    handleError(e.message, "error during getting messages");
  }
}
