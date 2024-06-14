CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255),
    "last_name" VARCHAR(255),
    "gender" VARCHAR(255) CHECK (
        "gender" IN ('male', 'female', 'other')
    ),
    "biography" VARCHAR(512),
    "interests" TEXT,
    "pictures" TEXT,
    "verified" BOOLEAN,
    "fame_rating" DECIMAL(8, 2),
    "geolocation" JSON,
    "accept_location" BOOLEAN,
    "age" INTEGER,
    "online" BOOLEAN,
    "last_online_date" DATE
);

CREATE TABLE IF NOT EXISTS "notifications" (
    "id" SERIAL PRIMARY KEY,
    "user_id" BIGINT NOT NULL,
    "content" TEXT NOT NULL,
    "seen" BOOLEAN NOT NULL,
    "date" DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS "histories" (
    "id" SERIAL PRIMARY KEY,
    "visited_id" BIGINT NOT NULL,
    "visitor_id" BIGINT NOT NULL,
    "date" DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS "blocks" (
    "id" SERIAL PRIMARY KEY,
    "blocked_id" BIGINT NOT NULL,
    "blocker_id" BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS "reports" (
    "id" SERIAL PRIMARY KEY,
    "reported_id" BIGINT NOT NULL,
    "reporter_id" BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS "matches" (
    "id" SERIAL PRIMARY KEY,
    "liked_id" BIGINT NOT NULL,
    "liker_id" BIGINT NOT NULL,
    "chat_id" BIGINT
);

CREATE TABLE IF NOT EXISTS "dislikes" (
    "id" SERIAL PRIMARY KEY,
    "disliked_id" BIGINT NOT NULL,
    "disliker_id" BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS "messages" (
    "id" SERIAL PRIMARY KEY,
    "user_id" BIGINT NOT NULL,
    "content" TEXT NOT NULL,
    "chat_id" BIGINT NOT NULL,
    "seen" BOOLEAN NOT NULL,
    "date" VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS "preferences" (
    "id" SERIAL PRIMARY KEY,
    "user_id" BIGINT NOT NULL,
    "age_gap_min" SMALLINT NOT NULL,
    "age_gap_max" SMALLINT NULL,
    "fame_rating_min" SMALLINT NOT NULL,
    "fame_rating_max" SMALLINT NULL,
    "sexual_preference" VARCHAR(255) CHECK (
        "sexual_preference" IN (
            'heterosexual',
            'homosexual',
            'bisexual'
        )
    ) NOT NULL DEFAULT 'bisexual',
    "location" JSON NOT NULL
);

CREATE TABLE IF NOT EXISTS "chats" (
    "id" SERIAL PRIMARY KEY,
    "user1_id" BIGINT NOT NULL,
    "user2_id" BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS "sessions" (
    "id" SERIAL PRIMARY KEY,
    "user_id" BIGINT NOT NULL,
    "token" VARCHAR(255) NOT NULL
);

ALTER TABLE "blocks"
ADD CONSTRAINT "blocks_blocker_id_foreign" FOREIGN KEY ("blocker_id") REFERENCES "users" ("id");

ALTER TABLE "messages"
ADD CONSTRAINT "messages_chat_id_foreign" FOREIGN KEY ("chat_id") REFERENCES "chats" ("id");

ALTER TABLE "histories"
ADD CONSTRAINT "histories_visited_id_foreign" FOREIGN KEY ("visited_id") REFERENCES "users" ("id");

ALTER TABLE "messages"
ADD CONSTRAINT "messages_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "reports"
ADD CONSTRAINT "reports_reported_id_foreign" FOREIGN KEY ("reported_id") REFERENCES "users" ("id");

ALTER TABLE "chats"
ADD CONSTRAINT "chats_user1_id_foreign" FOREIGN KEY ("user1_id") REFERENCES "users" ("id");

ALTER TABLE "blocks"
ADD CONSTRAINT "blocks_blocked_id_foreign" FOREIGN KEY ("blocked_id") REFERENCES "users" ("id");

ALTER TABLE "preferences"
ADD CONSTRAINT "preferences_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "notifications"
ADD CONSTRAINT "notifications_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "reports"
ADD CONSTRAINT "reports_reporter_id_foreign" FOREIGN KEY ("reporter_id") REFERENCES "users" ("id");

ALTER TABLE "matches"
ADD CONSTRAINT "matches_liker_id_foreign" FOREIGN KEY ("liker_id") REFERENCES "users" ("id");

ALTER TABLE "matches"
ADD CONSTRAINT "matches_chat_id_foreign" FOREIGN KEY ("chat_id") REFERENCES "chats" ("id");

ALTER TABLE "chats"
ADD CONSTRAINT "chats_user2_id_foreign" FOREIGN KEY ("user2_id") REFERENCES "users" ("id");

ALTER TABLE "matches"
ADD CONSTRAINT "matches_liked_id_foreign" FOREIGN KEY ("liked_id") REFERENCES "users" ("id");

ALTER TABLE "histories"
ADD CONSTRAINT "histories_visitor_id_foreign" FOREIGN KEY ("visitor_id") REFERENCES "users" ("id");

ALTER TABLE "sessions"
ADD CONSTRAINT "sessions_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users" ("id");