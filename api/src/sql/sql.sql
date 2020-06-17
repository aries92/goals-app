CREATE TABLE "user"
(
    "id"       serial       NOT NULL,
    "email"    VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "salt"     VARCHAR(255) NOT NULL,
    CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
      OIDS= FALSE
    );

CREATE TABLE "goal"
(
    "id"       serial  NOT NULL,
    "userId"   integer NOT NULL,
    "text"     TEXT    NOT NULL,
    "complete" BOOLEAN NOT NULL,
    CONSTRAINT "goal_pk" PRIMARY KEY ("id")
) WITH (
      OIDS= FALSE
    );

CREATE TABLE "chat"
(
    "id" serial NOT NULL,
    CONSTRAINT "chat_pk" PRIMARY KEY ("id")
) WITH (
      OIDS= FALSE
    );

CREATE TABLE "chatMessage"
(
    "id"     serial  NOT NULL,
    "userId" integer NOT NULL,
    "chatId" integer NOT NULL,
    "text"   TEXT    NOT NULL,
    CONSTRAINT "chatMessage_pk" PRIMARY KEY ("id")
) WITH (
      OIDS= FALSE
    );

CREATE TABLE "chatUser"
(
    "userId" serial  NOT NULL,
    "chatId" integer NOT NULL
) WITH (
      OIDS= FALSE
    );


-- migrations
ALTER TABLE "goal" ADD CONSTRAINT "goal_fk0" FOREIGN KEY ("userId") REFERENCES "user" ("id");

ALTER TABLE "user" RENAME COLUMN "password" TO "hash";

ALTER TABLE "chatMessage" ADD CONSTRAINT "chatMessage_fk0" FOREIGN KEY ("userId") REFERENCES "user" ("id");
ALTER TABLE "chatMessage" ADD CONSTRAINT "chatMessage_fk1" FOREIGN KEY ("chatId") REFERENCES "chat" ("id");

ALTER TABLE "chatUser" ADD CONSTRAINT "chatUser_fk0" FOREIGN KEY ("userId") REFERENCES "user" ("id");
ALTER TABLE "chatUser" ADD CONSTRAINT "chatUser_fk1" FOREIGN KEY ("chatId") REFERENCES "chat" ("id");


-- seeders
INSERT INTO "user" ("email", "password", "salt") VALUES ('test@email.com', '111', 'a12bc34de56fg');

INSERT INTO "goal" ("userId", "text", "complete") VALUES (1, 'task text', false);

INSERT INTO "chat" ("id") VALUES (1);

INSERT INTO "chatUser" ("chatId", "userId") VALUES (1, 1);

INSERT INTO "chatUser" ("chatId", "userId") VALUES (1, 2);
