CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

CREATE TABLE mechanics (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20)
);

CREATE TABLE requests (
    id SERIAL PRIMARY KEY,
    date_added DATE NOT NULL,
    car_type VARCHAR(50) NOT NULL,
    car_model VARCHAR(50) NOT NULL,
    problem_description TEXT,
    client_name VARCHAR(100) NOT NULL,
    client_phone VARCHAR(20),
    status VARCHAR(50) NOT NULL,
    mechanic_id INTEGER,
    FOREIGN KEY (mechanic_id) REFERENCES mechanics(id)
);

CREATE TABLE statuses (
    id SERIAL PRIMARY KEY,
    request_id INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL,
    date_updated DATE NOT NULL,
    FOREIGN KEY (request_id) REFERENCES requests(id)
);
