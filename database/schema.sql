set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
	"userID" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
  "createdAt" time with time zone NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "events" (
	"userID" integer NOT NULL,
	"eventID" serial NOT NULL,
	"title" TEXT NOT NULL,
	"date" DATE,
	"address" TEXT,
  "city" TEXT,
  "state" TEXT,
	"lat" DECIMAL,
	"lng" DECIMAL,
	"startingtime" TIME,
	CONSTRAINT "events_pk" PRIMARY KEY ("eventID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "runninglogs" (
	"runninglogID" serial NOT NULL,
	"date" DATE NOT NULL,
	"duration" TEXT NOT NULL,
	"distance" TEXT NOT NULL,
	"userID" integer NOT NULL,
	CONSTRAINT "runninglogs_pk" PRIMARY KEY ("runninglogID")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "events" ADD CONSTRAINT "events_fk0" FOREIGN KEY ("userID") REFERENCES "users"("userID");

ALTER TABLE "runninglogs" ADD CONSTRAINT "runninglogs_fk0" FOREIGN KEY ("userID") REFERENCES "users"("userID");
