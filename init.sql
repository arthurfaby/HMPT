CREATE TABLE "users"(
    "id" BIGINT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "gender" VARCHAR(255) CHECK
        ("gender" IN('')) NOT NULL,
        "biography" TEXT NOT NULL,
        "interests" JSON NOT NULL,
        "pictures" JSON NOT NULL,
        "verified" BOOLEAN NOT NULL,
        "fame_rating" DECIMAL(8, 2) NOT NULL,
        "geolocation" JSON NOT NULL,
        "accept_location" BOOLEAN NOT NULL,
        "age" INTEGER NOT NULL,
        "online" BOOLEAN NOT NULL,
        "last_online_date" DATE NOT NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
CREATE TABLE "notifications"(
    "id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "content" TEXT NOT NULL,
    "seen" BOOLEAN NOT NULL
);
ALTER TABLE
    "notifications" ADD PRIMARY KEY("id");
CREATE TABLE "histories"(
    "id" BIGINT NOT NULL,
    "visited_id" BIGINT NOT NULL,
    "visitor_id" BIGINT NOT NULL,
    "date" DATE NOT NULL
);
ALTER TABLE
    "histories" ADD PRIMARY KEY("id");
CREATE TABLE "blocks"(
    "id" BIGINT NOT NULL,
    "blocked_id" BIGINT NOT NULL,
    "blocker_id" BIGINT NOT NULL
);
ALTER TABLE
    "blocks" ADD PRIMARY KEY("id");
CREATE TABLE "reports"(
    "id" BIGINT NOT NULL,
    "reported_id" BIGINT NOT NULL,
    "reporter_id" BIGINT NOT NULL
);
ALTER TABLE
    "reports" ADD PRIMARY KEY("id");
CREATE TABLE "matches"(
    "id" BIGINT NOT NULL,
    "liked_id" BIGINT NOT NULL,
    "liker_id" BIGINT NOT NULL,
    "matched" BOOLEAN NOT NULL,
    "chat_id" BIGINT NULL
);
ALTER TABLE
    "matches" ADD PRIMARY KEY("id");
CREATE TABLE "messages"(
    "id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "content" TEXT NOT NULL,
    "chat_id" BIGINT NOT NULL,
    "seen" BOOLEAN NOT NULL
);
ALTER TABLE
    "messages" ADD PRIMARY KEY("id");
CREATE TABLE "preferences"(
    "id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "age_gap_min" SMALLINT NOT NULL,
    "age_gap_max" SMALLINT NULL,
    "fame_rating_min" SMALLINT NOT NULL,
    "fame_rating_max" SMALLINT NULL,
    "sexual_preferenec" VARCHAR(255) CHECK
        ("sexual_preferenec" IN('')) NULL,
        "location" JSON NOT NULL
);
ALTER TABLE
    "preferences" ADD PRIMARY KEY("id");
CREATE TABLE "chats"(
    "id" BIGINT NOT NULL,
    "user1_id" BIGINT NOT NULL,
    "user2_id" BIGINT NOT NULL
);
ALTER TABLE
    "chats" ADD PRIMARY KEY("id");
ALTER TABLE
    "blocks" ADD CONSTRAINT "blocks_blocker_id_foreign" FOREIGN KEY("blocker_id") REFERENCES "users"("id");
ALTER TABLE
    "messages" ADD CONSTRAINT "messages_chat_id_foreign" FOREIGN KEY("chat_id") REFERENCES "chats"("id");
ALTER TABLE
    "histories" ADD CONSTRAINT "histories_visited_id_foreign" FOREIGN KEY("visited_id") REFERENCES "users"("id");
ALTER TABLE
    "messages" ADD CONSTRAINT "messages_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "reports" ADD CONSTRAINT "reports_reported_id_foreign" FOREIGN KEY("reported_id") REFERENCES "users"("id");
ALTER TABLE
    "chats" ADD CONSTRAINT "chats_user1_id_foreign" FOREIGN KEY("user1_id") REFERENCES "users"("id");
ALTER TABLE
    "blocks" ADD CONSTRAINT "blocks_blocked_id_foreign" FOREIGN KEY("blocked_id") REFERENCES "users"("id");
ALTER TABLE
    "preferences" ADD CONSTRAINT "preferences_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "notifications" ADD CONSTRAINT "notifications_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "reports" ADD CONSTRAINT "reports_reporter_id_foreign" FOREIGN KEY("reporter_id") REFERENCES "users"("id");
ALTER TABLE
    "matches" ADD CONSTRAINT "matches_liker_id_foreign" FOREIGN KEY("liker_id") REFERENCES "users"("id");
ALTER TABLE
    "matches" ADD CONSTRAINT "matches_chat_id_foreign" FOREIGN KEY("chat_id") REFERENCES "chats"("id");
ALTER TABLE
    "chats" ADD CONSTRAINT "chats_user2_id_foreign" FOREIGN KEY("user2_id") REFERENCES "users"("id");
ALTER TABLE
    "matches" ADD CONSTRAINT "matches_liked_id_foreign" FOREIGN KEY("liked_id") REFERENCES "users"("id");
ALTER TABLE
    "histories" ADD CONSTRAINT "histories_visitor_id_foreign" FOREIGN KEY("visitor_id") REFERENCES "users"("id");