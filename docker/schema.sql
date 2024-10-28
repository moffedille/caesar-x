CREATE TABLE IF NOT EXISTS entries (
    id SERIAL PRIMARY KEY,
    seq INTEGER UNIQUE,
    name_first VARCHAR(200),
    name_last VARCHAR(200),
    age INTEGER,
    street VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(20),
    latitude REAL,
    longitude REAL,
    ccnumber VARCHAR(50)
);

CREATE EXTENSION pg_trgm;

CREATE TABLE IF NOT EXISTS uploads (
    id SERIAL PRIMARY KEY,
    file_name TEXT,
    state VARCHAR(15),
    uploaded_date TIMESTAMP NOT NULL DEFAULT now()
);