CREATE USER IF NOT EXISTS postgres;
CREATE DATABASE IF NOT EXISTS postgres OWNER postgres;
GRANT ALL PRIVILEGES ON DATABASE postgres TO postgres;
ALTER USER postgres WITH PASSWORD 'postgres';

SELECT "table_schema", "table_name" FROM "information_schema"."tables" WHERE ("table_schema" = 'public' AND "table_name" = 'user') OR ("table_schema" = 'public' AND "table_name" = 'block') OR ("table_schema" = 'public' AND "table_name" = 'auth') OR ("table_schema" = 'public' AND "table_name" = 'friend') OR ("table_schema" = 'public' AND "table_name" = 'request') OR ("table_schema" = 'public' AND "table_name" = 'room') OR ("table_schema" = 'public' AND "table_name" = 'channel_participant') OR ("table_schema" = 'public' AND "table_name" = 'dm_participant') OR ("table_schema" = 'public' AND "table_name" = 'channel_participant') OR ("table_schema" = 'public' AND "table_name" = 'room')
SELECT * FROM "information_schema"."tables" WHERE "table_schema" = 'public' AND "table_name" = 'typeorm_metadata'
CREATE TABLE "user" ("id" SERIAL NOT NULL, "nickname" character varying NOT NULL, "image" character varying, CONSTRAINT "UQ_e2364281027b926b879fa2fa1e0" UNIQUE ("nickname"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))
CREATE TABLE "block" ("id" SERIAL NOT NULL, "blockedTime" TIMESTAMP NOT NULL, "userId" integer, "blockedUserId" integer, CONSTRAINT "UQ_9f762427b7d51dd5c710488824e" UNIQUE ("userId", "blockedUserId"), CONSTRAINT "PK_d0925763efb591c2e2ffb267572" PRIMARY KEY ("id"))
CREATE TABLE "auth" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "authenticated" boolean NOT NULL, "userId" integer, CONSTRAINT "REL_373ead146f110f04dad6084815" UNIQUE ("userId"), CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))
CREATE TABLE "friend" ("id" SERIAL NOT NULL, "userId" integer, "friendId" integer, CONSTRAINT "UQ_240655bf8eba5e0d2ce943502a3" UNIQUE ("userId", "friendId"), CONSTRAINT "PK_1b301ac8ac5fcee876db96069b6" PRIMARY KEY ("id"))
CREATE TABLE "request" ("id" SERIAL NOT NULL, "requestorId" integer, "responserId" integer, CONSTRAINT "UQ_d380644ddf79f7459f1d08192ed" UNIQUE ("requestorId", "responserId"), CONSTRAINT "PK_167d324701e6867f189aed52e18" PRIMARY KEY ("id"))
CREATE TABLE "room" ("id" SERIAL NOT NULL, "name" character varying, "type" integer NOT NULL, "salt" character varying, "title" character varying, "image" character varying, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))
CREATE TABLE "channel_participant" ("id" SERIAL NOT NULL, "auth" integer, "status" integer, "statusStartDate" TIMESTAMP, "userId" integer, "roomId" integer, CONSTRAINT "PK_ae5e5f3f9ce9a1968392ebb6b08" PRIMARY KEY ("id"))
CREATE TABLE "dm_participant" ("id" SERIAL NOT NULL, "userId" integer, "roomId" integer, CONSTRAINT "PK_7400786b0fd136d7e1b7e5d6802" PRIMARY KEY ("id"))
ALTER TABLE "channel_participant" DROP COLUMN "userId"
ALTER TABLE "channel_participant" DROP COLUMN "roomId"
ALTER TABLE "channel_participant" ADD "userId" integer
ALTER TABLE "channel_participant" ADD "roomId" integer
ALTER TABLE "block" ADD CONSTRAINT "FK_b7c8985f27f5b0d1820832318da" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
ALTER TABLE "block" ADD CONSTRAINT "FK_c9a8df2f7cbbae1cda940694409" FOREIGN KEY ("blockedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
ALTER TABLE "auth" ADD CONSTRAINT "FK_373ead146f110f04dad60848154" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
ALTER TABLE "friend" ADD CONSTRAINT "FK_855044ea856e46f62a46acebd65" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
ALTER TABLE "friend" ADD CONSTRAINT "FK_d9bf438025ff9f7ae947596b38e" FOREIGN KEY ("friendId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
ALTER TABLE "request" ADD CONSTRAINT "FK_2c7431165f1c7f808bd338bd4b9" FOREIGN KEY ("requestorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
ALTER TABLE "request" ADD CONSTRAINT "FK_91a1494591e1b787d5795f021e6" FOREIGN KEY ("responserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
ALTER TABLE "channel_participant" ADD CONSTRAINT "FK_64393df3b0cdfd3e26a8a999ab6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
ALTER TABLE "channel_participant" ADD CONSTRAINT "FK_025192a457f55e0f49868a1bed4" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
ALTER TABLE "dm_participant" ADD CONSTRAINT "FK_a05c42c34e7c204da3911b2a781" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
ALTER TABLE "dm_participant" ADD CONSTRAINT "FK_0530689ed4b0bca1dd9fc3dc613" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION

