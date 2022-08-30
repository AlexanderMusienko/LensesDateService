CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(40) NOT NULL,
    login VARCHAR(30) NOT NULL,
    encrypted_password VARCHAR(100) NOT NULL,
    UNIQUE (email, login)
);

ALTER TABLE `users` 
ADD UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
ADD UNIQUE INDEX `login_UNIQUE` (`login` ASC) VISIBLE;
;