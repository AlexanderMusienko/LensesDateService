CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(40) NOT NULL,
    login VARCHAR(30) NOT NULL,
    avatar VARCHAR(100) NOT NULL DEFAULT 'http://37.235.202.133:5555/static/asserts/default/defaultAvatar.jpg',
    encrypted_password VARCHAR(100) NOT NULL,
    UNIQUE (email, login)
);

ALTER TABLE users 
ADD UNIQUE INDEX email_UNIQUE (email ASC) VISIBLE,
ADD UNIQUE INDEX login_UNIQUE (login ASC) VISIBLE;
;