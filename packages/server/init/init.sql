BEGIN;
CREATE TABLE "user" ("id" SERIAL NOT NULL, "nickname" character varying NOT NULL, "image" character varying, CONSTRAINT "UQ_e2364281027b926b879fa2fa1e0" UNIQUE ("nickname"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"));
CREATE TABLE "block" ("id" SERIAL NOT NULL, "blockedTime" TIMESTAMP NOT NULL, "userId" integer, "blockedUserId" integer, CONSTRAINT "UQ_9f762427b7d51dd5c710488824e" UNIQUE ("userId", "blockedUserId"), CONSTRAINT "PK_d0925763efb591c2e2ffb267572" PRIMARY KEY ("id"));
CREATE TABLE "auth" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "authenticated" boolean NOT NULL, "userId" integer, CONSTRAINT "REL_373ead146f110f04dad6084815" UNIQUE ("userId"), CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"));
CREATE TABLE "friend" ("id" SERIAL NOT NULL, "userId" integer, "friendId" integer, CONSTRAINT "UQ_240655bf8eba5e0d2ce943502a3" UNIQUE ("userId", "friendId"), CONSTRAINT "PK_1b301ac8ac5fcee876db96069b6" PRIMARY KEY ("id"));
CREATE TABLE "request" ("id" SERIAL NOT NULL, "requestorId" integer, "responserId" integer, CONSTRAINT "UQ_d380644ddf79f7459f1d08192ed" UNIQUE ("requestorId", "responserId"), CONSTRAINT "PK_167d324701e6867f189aed52e18" PRIMARY KEY ("id"));
CREATE TABLE "room" ("id" SERIAL NOT NULL, "name" character varying, "type" integer NOT NULL, "salt" character varying, "title" character varying, "image" character varying, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"));
CREATE TABLE "channel_participant" ("id" SERIAL NOT NULL, "auth" integer, "status" integer, "statusStartDate" TIMESTAMP, "userId" integer, "roomId" integer, CONSTRAINT "PK_ae5e5f3f9ce9a1968392ebb6b08" PRIMARY KEY ("id"));
CREATE TABLE "dm_participant" ("id" SERIAL NOT NULL, "userId" integer, "roomId" integer, CONSTRAINT "PK_7400786b0fd136d7e1b7e5d6802" PRIMARY KEY ("id"));
CREATE TABLE "message" ("id" integer NOT NULL, "date" TIMESTAMP NOT NULL, "body" character varying NOT NULL, "userId" integer, "roomId" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"));
CREATE TABLE "game" ("id" SERIAL NOT NULL, "win" boolean NOT NULL, "ladder" boolean NOT NULL, "userId" integer, "opponentId" integer, CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"));
CREATE TABLE "rank" ("id" SERIAL NOT NULL, "rank" integer NOT NULL, "win" integer NOT NULL, "lose" integer NOT NULL, "userId" integer, CONSTRAINT "REL_0319fdc8ba0d4c2f456815dafe" UNIQUE ("userId"), CONSTRAINT "PK_a5dfd2e605e5e4fb8578caec083" PRIMARY KEY ("id"));
ALTER TABLE "block" ADD CONSTRAINT "FK_b7c8985f27f5b0d1820832318da" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "block" ADD CONSTRAINT "FK_c9a8df2f7cbbae1cda940694409" FOREIGN KEY ("blockedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "auth" ADD CONSTRAINT "FK_373ead146f110f04dad60848154" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "friend" ADD CONSTRAINT "FK_855044ea856e46f62a46acebd65" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "friend" ADD CONSTRAINT "FK_d9bf438025ff9f7ae947596b38e" FOREIGN KEY ("friendId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "request" ADD CONSTRAINT "FK_2c7431165f1c7f808bd338bd4b9" FOREIGN KEY ("requestorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "request" ADD CONSTRAINT "FK_91a1494591e1b787d5795f021e6" FOREIGN KEY ("responserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "channel_participant" ADD CONSTRAINT "FK_64393df3b0cdfd3e26a8a999ab6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "channel_participant" ADD CONSTRAINT "FK_025192a457f55e0f49868a1bed4" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "dm_participant" ADD CONSTRAINT "FK_a05c42c34e7c204da3911b2a781" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "dm_participant" ADD CONSTRAINT "FK_0530689ed4b0bca1dd9fc3dc613" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "message" ADD CONSTRAINT "FK_446251f8ceb2132af01b68eb593" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "message" ADD CONSTRAINT "FK_fdfe54a21d1542c564384b74d5c" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "game" ADD CONSTRAINT "FK_a8106c0a84d70ecfc3358301c54" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "game" ADD CONSTRAINT "FK_3240e72a746928ea85f05b3b2f8" FOREIGN KEY ("opponentId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "rank" ADD CONSTRAINT "FK_0319fdc8ba0d4c2f456815dafea" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

INSERT INTO "user" ("id", "nickname", "image") VALUES (1, 'dha', 'https://cdn.intra.42.fr/users/dha.jpg');
INSERT INTO "auth" ("id", "email", "authenticated", "userId") VALUES (1, 'dha@student.42seoul.kr', true, 1);
INSERT INTO "rank" ("id", "rank", "win", "lose", "userId") VALUES (1, 0, 2, 0, 1);
INSERT INTO "user" ("id", "nickname", "image") VALUES (2, 'junghan', 'https://cdn.intra.42.fr/users/junghan.jpg');
INSERT INTO "auth" ("id", "email", "authenticated", "userId") VALUES (2, 'junghan@student.42seoul.kr', false, 2);
INSERT INTO "rank" ("id", "rank", "win", "lose", "userId") VALUES (2, 0, 2, 0, 2);
INSERT INTO "user" ("id", "nickname", "image") VALUES (3, 'doyun', 'https://cdn.intra.42.fr/users/doyun.jpg');
INSERT INTO "auth" ("id", "email", "authenticated", "userId") VALUES (3, 'doyun@student.42seoul.kr', false, 3);
INSERT INTO "rank" ("id", "rank", "win", "lose", "userId") VALUES (3, 0, 0, 0, 3);
INSERT INTO "user" ("id", "nickname", "image") VALUES (4, 'sonkang', 'https://cdn.intra.42.fr/users/sonkang.jpg');
INSERT INTO "auth" ("id", "email", "authenticated", "userId") VALUES (4, 'sonkang@student.42seoul.kr', false, 4);
INSERT INTO "rank" ("id", "rank", "win", "lose", "userId") VALUES (4, 0, 0, 0, 4);
INSERT INTO "user" ("id", "nickname", "image") VALUES (5, 'hybae', 'https://cdn.intra.42.fr/users/hybae.jpg');
INSERT INTO "auth" ("id", "email", "authenticated", "userId") VALUES (5, 'hybae@student.42seoul.kr', false, 5);
INSERT INTO "rank" ("id", "rank", "win", "lose", "userId") VALUES (5, 0, 0, 0, 5);
INSERT INTO "user" ("id", "nickname", "image") VALUES (6, 'huchoi', 'https://cdn.intra.42.fr/users/huchoi.jpg');
INSERT INTO "auth" ("id", "email", "authenticated", "userId") VALUES (6, 'huchoi@student.42seoul.kr', false, 6);
INSERT INTO "rank" ("id", "rank", "win", "lose", "userId") VALUES (6, 0, 0, 0, 6);

INSERT INTO "block" ("id", "blockedTime", "userId", "blockedUserId") VALUES (1, '2022-10-10 00:00:00', 1, 2);
INSERT INTO "block" ("id", "blockedTime", "userId", "blockedUserId") VALUES (2, '2022-10-10 00:00:00', 3, 4);

INSERT INTO "friend" ("id", "userId", "friendId") VALUES (1, 1, 2);
INSERT INTO "friend" ("id", "userId", "friendId") VALUES (2, 2, 1);
INSERT INTO "friend" ("id", "userId", "friendId") VALUES (3, 1, 3);
INSERT INTO "friend" ("id", "userId", "friendId") VALUES (4, 3, 1);
INSERT INTO "friend" ("id", "userId", "friendId") VALUES (5, 1, 4);
INSERT INTO "friend" ("id", "userId", "friendId") VALUES (6, 4, 1);
INSERT INTO "friend" ("id", "userId", "friendId") VALUES (7, 1, 5);
INSERT INTO "friend" ("id", "userId", "friendId") VALUES (8, 5, 1);
INSERT INTO "friend" ("id", "userId", "friendId") VALUES (9, 2, 3);
INSERT INTO "friend" ("id", "userId", "friendId") VALUES (10, 3, 2);
INSERT INTO "friend" ("id", "userId", "friendId") VALUES (11, 2, 4);
INSERT INTO "friend" ("id", "userId", "friendId") VALUES (12, 4, 2);

INSERT INTO "request" ("id", "requestorId", "responserId") VALUES (1, 2, 5);
INSERT INTO "request" ("id", "requestorId", "responserId") VALUES (2, 3, 5);

INSERT INTO "room" ("id", "name", "type", "salt", "title", "image") VALUES (1, '42seoul', 1, NULL, NULL, NULL);
INSERT INTO "channel_participant" ("id", "auth", "status", "statusStartDate", "userId", "roomId") VALUES (1, 0, NULL, NULL, 1, 1);
INSERT INTO "channel_participant" ("id", "auth", "status", "statusStartDate", "userId", "roomId") VALUES (2, NULL, NULL, NULL, 2, 1);
INSERT INTO "channel_participant" ("id", "auth", "status", "statusStartDate", "userId", "roomId") VALUES (3, NULL, NULL, NULL, 4, 1);
INSERT INTO "channel_participant" ("id", "auth", "status", "statusStartDate", "userId", "roomId") VALUES (4, 1, 1, NULL, 4, 1);

INSERT INTO "room" ("id", "name", "type", "salt", "title", "image") VALUES (2, '42tokyo', 1, NULL, NULL, NULL);
INSERT INTO "channel_participant" ("id", "auth", "status", "statusStartDate", "userId", "roomId") VALUES (5, 0, NULL, NULL, 2, 2);

INSERT INTO "room" ("id", "name", "type", "salt", "title", "image") VALUES (3, NULL, 0, NULL, NULL, NULL);
INSERT INTO "dm_participant" ("id", "userId", "roomId") VALUES (1, 1, 3);
INSERT INTO "dm_participant" ("id", "userId", "roomId") VALUES (2, 2, 3);

INSERT INTO "game" ("id", "win", "ladder", "userId", "opponentId") VALUES (1, true, true, 1, 2);
INSERT INTO "game" ("id", "win", "ladder", "userId", "opponentId") VALUES (2, true, true, 1, 2);
INSERT INTO "game" ("id", "win", "ladder", "userId", "opponentId") VALUES (3, false, false, 1, 2);
COMMIT;