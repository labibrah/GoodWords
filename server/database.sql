CREATE DATABASE goodwords;

CREATE TABLE users(
  user_id uuid DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_dob DATE NOT NULL,
  user_gender CHAR(1),
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY(user_id)
);

CREATE TABLE post(
  post_id SERIAL,
  user_id UUID ,
  description VARCHAR(255),
  PRIMARY KEY (post_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);


INSERT INTO users (user_name, user_dob, user_gender,user_email, user_password) VALUES ('labib','2000-01-01','M', 'labib@gmail.com', '12345');