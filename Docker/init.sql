
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    gender VARCHAR(50),
    country VARCHAR(100),
    password TEXT,
    privatekey TEXT
);