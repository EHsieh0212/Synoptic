CREATE DATABASE IF NOT EXISTS `synoptic`; 
USE `synoptic`;

--
-- Table structure for table `users`
--
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` varchar(500) NOT NULL,
  `fb_uid` varchar(255) DEFAULT NULL,
  `fb_access_token` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(72) DEFAULT NULL,
  `phone` varchar(16) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `fb_uid_UNIQUE` (`fb_uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `products`
--
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category` ENUM('men', 'women') NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `price` INT UNSIGNED NOT NULL,
  `img_src` VARCHAR(255) DEFAULT NULL,
  `description` VARCHAR(2048) DEFAULT NULL,
  `more` VARCHAR(2048) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




--
-- Table structure for table `variants`
--
DROP TABLE IF EXISTS `variants`;
CREATE TABLE `variants` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `size` enum('XS','S','M','L','XL') NOT NULL,
  `color` char(7) NOT NULL,
  `quantity` int unsigned NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_variant` (`product_id`,`size`,`color`),
  KEY `fk_variant_product_idx` (`product_id`),
  CONSTRAINT `fk_variant_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=260 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `orders`
--
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(500) NOT NULL,
  `amount` int unsigned NOT NULL,
  `recipient` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(16) NOT NULL,
  `address` varchar(255) NOT NULL,
  `delivery_time` enum('morning','afternoon','not specified') NOT NULL,
  `paid` tinyint NOT NULL DEFAULT '0',
  `payment` json DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_orders_users1_idx` (`user_id`),
  CONSTRAINT `fk_orders_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Table structure for table `ordered_items`
--
DROP TABLE IF EXISTS `ordered_items`;
CREATE TABLE `ordered_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `variant_id` bigint unsigned NOT NULL,
  `number` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idordered_items_UNIQUE` (`id`),
  KEY `fk_ordered_items_orders1_idx` (`order_id`),
  KEY `fk_ordered_items_variants1_idx` (`variant_id`),
  CONSTRAINT `fk_ordered_items_orders1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `fk_ordered_items_variants1` FOREIGN KEY (`variant_id`) REFERENCES `variants` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data 
--
START TRANSACTION;
INSERT INTO products(category, title, price, img_src, description, more, created_at, updated_at) VALUES ("men", "men-1", 754, "dummy.com/57.jpg", "Lorem ipsum", "further descriptions", "2023-01-13 00:00:00" , "2023-10-21 09:31:25.654507");
SELECT LAST_INSERT_ID() INTO @product_id;
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "black", 8, "2023-04-25 00:00:00" , "2023-10-21 09:31:25.654569");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "green", 4, "2023-12-13 00:00:00" , "2023-10-21 09:31:25.654589");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "white", 19, "2023-08-05 00:00:00" , "2023-10-21 09:31:25.654601");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "black", 1, "2023-02-17 00:00:00" , "2023-10-21 09:31:25.654612");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "green", 8, "2023-09-16 00:00:00" , "2023-10-21 09:31:25.654623");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "white", 18, "2023-04-12 00:00:00" , "2023-10-21 09:31:25.654787");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "black", 8, "2023-08-18 00:00:00" , "2023-10-21 09:31:25.654816");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "green", 1, "2023-03-23 00:00:00" , "2023-10-21 09:31:25.654830");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "white", 11, "2023-05-23 00:00:00" , "2023-10-21 09:31:25.654865");
INSERT INTO products(category, title, price, img_src, description, more, created_at, updated_at) VALUES ("men", "men-2", 320, "dummy.com/71.jpg", "Lorem ipsum", "further descriptions", "2023-02-22 00:00:00" , "2023-10-21 09:31:25.654879");
SELECT LAST_INSERT_ID() INTO @product_id;
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "black", 13, "2023-02-19 00:00:00" , "2023-10-21 09:31:25.654895");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "green", 12, "2023-11-06 00:00:00" , "2023-10-21 09:31:25.654906");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "white", 2, "2023-08-24 00:00:00" , "2023-10-21 09:31:25.654917");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "black", 13, "2023-02-10 00:00:00" , "2023-10-21 09:31:25.654927");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "green", 20, "2023-07-05 00:00:00" , "2023-10-21 09:31:25.654948");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "white", 3, "2023-01-24 00:00:00" , "2023-10-21 09:31:25.654958");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "black", 10, "2023-02-10 00:00:00" , "2023-10-21 09:31:25.654969");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "green", 4, "2023-07-14 00:00:00" , "2023-10-21 09:31:25.654982");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "white", 15, "2023-11-22 00:00:00" , "2023-10-21 09:31:25.654992");
INSERT INTO products(category, title, price, img_src, description, more, created_at, updated_at) VALUES ("men", "men-3", 266, "dummy.com/73.jpg", "Lorem ipsum", "further descriptions", "2023-07-01 00:00:00" , "2023-10-21 09:31:25.655004");
SELECT LAST_INSERT_ID() INTO @product_id;
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "black", 9, "2023-12-26 00:00:00" , "2023-10-21 09:31:25.655149");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "green", 20, "2023-11-22 00:00:00" , "2023-10-21 09:31:25.655169");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "white", 18, "2023-05-06 00:00:00" , "2023-10-21 09:31:25.655181");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "black", 15, "2023-07-14 00:00:00" , "2023-10-21 09:31:25.655192");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "green", 18, "2023-04-23 00:00:00" , "2023-10-21 09:31:25.655206");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "white", 2, "2023-04-28 00:00:00" , "2023-10-21 09:31:25.655217");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "black", 11, "2023-07-25 00:00:00" , "2023-10-21 09:31:25.655228");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "green", 3, "2023-04-19 00:00:00" , "2023-10-21 09:31:25.655238");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "white", 7, "2023-12-02 00:00:00" , "2023-10-21 09:31:25.655249");
INSERT INTO products(category, title, price, img_src, description, more, created_at, updated_at) VALUES ("men", "men-4", 505, "dummy.com/79.jpg", "Lorem ipsum", "further descriptions", "2023-03-15 00:00:00" , "2023-10-21 09:31:25.655264");
SELECT LAST_INSERT_ID() INTO @product_id;
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "black", 5, "2023-05-07 00:00:00" , "2023-10-21 09:31:25.655284");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "green", 19, "2023-08-08 00:00:00" , "2023-10-21 09:31:25.655295");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "white", 12, "2023-04-23 00:00:00" , "2023-10-21 09:31:25.655306");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "black", 17, "2023-09-10 00:00:00" , "2023-10-21 09:31:25.655317");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "green", 2, "2023-02-26 00:00:00" , "2023-10-21 09:31:25.655327");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "white", 6, "2023-12-15 00:00:00" , "2023-10-21 09:31:25.655338");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "black", 20, "2023-02-02 00:00:00" , "2023-10-21 09:31:25.655348");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "green", 13, "2023-11-02 00:00:00" , "2023-10-21 09:31:25.655359");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "white", 17, "2023-05-09 00:00:00" , "2023-10-21 09:31:25.655370");
INSERT INTO products(category, title, price, img_src, description, more, created_at, updated_at) VALUES ("men", "men-5", 796, "dummy.com/57.jpg", "Lorem ipsum", "further descriptions", "2023-12-16 00:00:00" , "2023-10-21 09:31:25.655381");
SELECT LAST_INSERT_ID() INTO @product_id;
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "black", 11, "2023-02-27 00:00:00" , "2023-10-21 09:31:25.655395");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "green", 14, "2023-03-22 00:00:00" , "2023-10-21 09:31:25.655406");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "white", 1, "2023-05-15 00:00:00" , "2023-10-21 09:31:25.655417");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "black", 17, "2023-02-24 00:00:00" , "2023-10-21 09:31:25.655427");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "green", 17, "2023-11-08 00:00:00" , "2023-10-21 09:31:25.655438");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "white", 5, "2023-07-11 00:00:00" , "2023-10-21 09:31:25.655448");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "black", 18, "2023-09-29 00:00:00" , "2023-10-21 09:31:25.655459");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "green", 20, "2023-06-15 00:00:00" , "2023-10-21 09:31:25.655469");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "white", 1, "2023-02-27 00:00:00" , "2023-10-21 09:31:25.655479");
INSERT INTO products(category, title, price, img_src, description, more, created_at, updated_at) VALUES ("women", "women-1", 999, "dummy.com/69.jpg", "Lorem ipsum", "further descriptions", "2023-05-03 00:00:00" , "2023-10-21 09:31:25.655492");
SELECT LAST_INSERT_ID() INTO @product_id;
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "black", 8, "2023-10-18 00:00:00" , "2023-10-21 09:31:25.655506");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "green", 3, "2023-09-06 00:00:00" , "2023-10-21 09:31:25.655517");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "white", 18, "2023-03-06 00:00:00" , "2023-10-21 09:31:25.655527");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "black", 16, "2023-10-09 00:00:00" , "2023-10-21 09:31:25.655546");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "green", 9, "2023-09-28 00:00:00" , "2023-10-21 09:31:25.655622");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "white", 7, "2023-10-04 00:00:00" , "2023-10-21 09:31:25.655648");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "black", 10, "2023-07-24 00:00:00" , "2023-10-21 09:31:25.655660");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "green", 15, "2023-09-22 00:00:00" , "2023-10-21 09:31:25.655671");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "white", 4, "2023-05-07 00:00:00" , "2023-10-21 09:31:25.655681");
INSERT INTO products(category, title, price, img_src, description, more, created_at, updated_at) VALUES ("women", "women-2", 165, "dummy.com/71.jpg", "Lorem ipsum", "further descriptions", "2023-01-11 00:00:00" , "2023-10-21 09:31:25.655694");
SELECT LAST_INSERT_ID() INTO @product_id;
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "black", 19, "2023-04-23 00:00:00" , "2023-10-21 09:31:25.655710");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "green", 3, "2023-12-29 00:00:00" , "2023-10-21 09:31:25.655721");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "white", 8, "2023-02-04 00:00:00" , "2023-10-21 09:31:25.655731");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "black", 11, "2023-02-06 00:00:00" , "2023-10-21 09:31:25.655742");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "green", 9, "2023-12-09 00:00:00" , "2023-10-21 09:31:25.655753");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "white", 7, "2023-10-04 00:00:00" , "2023-10-21 09:31:25.655767");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "black", 19, "2023-10-23 00:00:00" , "2023-10-21 09:31:25.655778");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "green", 8, "2023-08-31 00:00:00" , "2023-10-21 09:31:25.655861");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "white", 7, "2023-02-18 00:00:00" , "2023-10-21 09:31:25.655886");
INSERT INTO products(category, title, price, img_src, description, more, created_at, updated_at) VALUES ("women", "women-3", 774, "dummy.com/77.jpg", "Lorem ipsum", "further descriptions", "2023-07-01 00:00:00" , "2023-10-21 09:31:25.655901");
SELECT LAST_INSERT_ID() INTO @product_id;
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "black", 14, "2023-08-28 00:00:00" , "2023-10-21 09:31:25.655917");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "green", 4, "2023-02-01 00:00:00" , "2023-10-21 09:31:25.655928");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "white", 11, "2023-02-25 00:00:00" , "2023-10-21 09:31:25.655943");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "black", 7, "2023-04-08 00:00:00" , "2023-10-21 09:31:25.655953");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "green", 5, "2023-08-05 00:00:00" , "2023-10-21 09:31:25.655964");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "white", 9, "2023-08-25 00:00:00" , "2023-10-21 09:31:25.655974");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "black", 3, "2023-08-15 00:00:00" , "2023-10-21 09:31:25.655985");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "green", 2, "2023-11-30 00:00:00" , "2023-10-21 09:31:25.655996");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "white", 3, "2023-05-02 00:00:00" , "2023-10-21 09:31:25.656006");
INSERT INTO products(category, title, price, img_src, description, more, created_at, updated_at) VALUES ("women", "women-4", 516, "dummy.com/81.jpg", "Lorem ipsum", "further descriptions", "2023-09-04 00:00:00" , "2023-10-21 09:31:25.656018");
SELECT LAST_INSERT_ID() INTO @product_id;
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "black", 13, "2023-01-31 00:00:00" , "2023-10-21 09:31:25.656032");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "green", 13, "2023-01-02 00:00:00" , "2023-10-21 09:31:25.656042");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "white", 9, "2023-08-21 00:00:00" , "2023-10-21 09:31:25.656053");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "black", 14, "2023-12-23 00:00:00" , "2023-10-21 09:31:25.656063");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "green", 5, "2023-04-08 00:00:00" , "2023-10-21 09:31:25.656073");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "white", 7, "2023-01-30 00:00:00" , "2023-10-21 09:31:25.656087");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "black", 11, "2023-01-30 00:00:00" , "2023-10-21 09:31:25.656097");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "green", 19, "2023-09-02 00:00:00" , "2023-10-21 09:31:25.656108");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "white", 2, "2023-09-18 00:00:00" , "2023-10-21 09:31:25.656118");
INSERT INTO products(category, title, price, img_src, description, more, created_at, updated_at) VALUES ("women", "women-5", 971, "dummy.com/61.jpg", "Lorem ipsum", "further descriptions", "2023-02-05 00:00:00" , "2023-10-21 09:31:25.656129");
SELECT LAST_INSERT_ID() INTO @product_id;
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "black", 8, "2023-07-26 00:00:00" , "2023-10-21 09:31:25.656155");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "green", 19, "2023-05-07 00:00:00" , "2023-10-21 09:31:25.656166");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "S", "white", 20, "2023-02-11 00:00:00" , "2023-10-21 09:31:25.656176");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "black", 19, "2023-10-17 00:00:00" , "2023-10-21 09:31:25.656187");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "green", 9, "2023-04-15 00:00:00" , "2023-10-21 09:31:25.656198");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "M", "white", 8, "2023-05-16 00:00:00" , "2023-10-21 09:31:25.656208");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "black", 5, "2023-12-10 00:00:00" , "2023-10-21 09:31:25.656218");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "green", 15, "2023-06-11 00:00:00" , "2023-10-21 09:31:25.656229");
INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES (@product_id, "L", "white", 1, "2023-08-23 00:00:00" , "2023-10-21 09:31:25.656239");
COMMIT;