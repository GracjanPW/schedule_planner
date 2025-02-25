-- Enter migration here
DROP TABLE IF EXISTS calendar_events;

DROP TABLE IF EXISTS sessions;

DROP TABLE IF EXISTS profiles;

DROP TABLE IF EXISTS users;

CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    profiles (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    );

CREATE TABLE
    sessions (
        uuid UUID PRIMARY KEY,
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP + INTERVAL '1 day',
        FOREIGN KEY (user_id) REFERENCES users (id)
    );

CREATE TABLE
    calendar_events (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        event_date DATE NOT NULL DEFAULT CURRENT_DATE,
        start_time TIME,
        end_time TIME,
        all_day BOOLEAN,
        title VARCHAR NOT NULL,
        description TEXT,
        FOREIGN KEY (user_id) REFERENCES users (id)
    );