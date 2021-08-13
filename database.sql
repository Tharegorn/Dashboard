use 'user_db';
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `perm` int(1) NOT NULL,
  `added_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

INSERT INTO `users` (name, password, perm) VALUES ('Tharegorn', '$2b$10$P2gSTINYdOiQUR.rJCbrXOvQc14UfdiDkI5/LIfakNWWAO3F9/kLG', '1');
CREATE TABLE `tokens` (
  `token_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `added_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`token_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
  );

COMMIT;