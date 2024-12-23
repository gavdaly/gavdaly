-- Migration number: 0001 	 2024-12-18T13:46:31.037Z

CREATE TABLE IF NOT EXISTS invalid_request (
    id SERIAL PRIMARY KEY,
    reason TEXT NOT NULL,
    headers JSON NOT NULL,
    data JSON NOT NULL,
    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS valid_request (
    id SERIAL PRIMARY KEY,
    data JSON NOT NULL,
    date_time TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
