CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(40) NOT NULL,
    encrypted_password VARCHAR(100) NOT NULL,
    UNIQUE (email)
);