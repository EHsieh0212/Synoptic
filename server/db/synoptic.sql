-- -----------------------------------------------------
-- Schema synoptic
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `synoptic` DEFAULT CHARACTER SET utf8 ;
USE `synoptic` ;

-- -----------------------------------------------------
-- Table `synoptic`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `synoptic`.`category` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE INDEX `category_id_UNIQUE` (`category_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `synoptic`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `synoptic`.`product` (
  `product_id` VARCHAR(500) NOT NULL,
  `product_name` VARCHAR(255) NOT NULL,
  `product_price` INT NOT NULL,
  `product_img` VARCHAR(500) NOT NULL,
  `product_origin` VARCHAR(255) NOT NULL,
  `product_textDescription` VARCHAR(500) NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`product_id`, `category_id`),
  UNIQUE INDEX `product_id_UNIQUE` (`product_id` ASC) VISIBLE,
  INDEX `fk_product_category_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `synoptic`.`category` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `synoptic`.`product_inventory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `synoptic`.`product_inventory` (
  `productInventory_id` INT NOT NULL AUTO_INCREMENT,
  `product_color` VARCHAR(255) NOT NULL,
  `product_size` VARCHAR(45) NOT NULL,
  `product_quantity` INT NOT NULL,
  `product_id` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`productInventory_id`, `product_color`, `product_id`),
  UNIQUE INDEX `productInventory_id_UNIQUE` (`productInventory_id` ASC) VISIBLE,
  INDEX `fk_product_inventory_product1_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_inventory_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `synoptic`.`product` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `synoptic`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `synoptic`.`user` (
  `user_id` VARCHAR(500) NOT NULL,
  `user_email` VARCHAR(500) NOT NULL,
  `user_name` VARCHAR(500) NOT NULL,
  `user_password` VARCHAR(500) NOT NULL,
  `last_login` BIGINT(255) NOT NULL,
  `jwt_token` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`user_id`, `user_email`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `user_email_UNIQUE` (`user_email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `synoptic`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `synoptic`.`order` (
  `order_id` VARCHAR(500) NOT NULL,
  `orderer_email` VARCHAR(500) NOT NULL,
  `orderer_name` VARCHAR(500) NOT NULL,
  `orderer_phone` VARCHAR(500) NOT NULL,
  `orderer_address` VARCHAR(500) NOT NULL,
  `order_deliverTime` VARCHAR(45) NOT NULL,
  `orderer_prime` VARCHAR(500) NOT NULL,
  `is_paid` INT NOT NULL,
  `user_id` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`order_id`, `user_id`),
  UNIQUE INDEX `order_id_UNIQUE` (`order_id` ASC) VISIBLE,
  INDEX `fk_order_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_order_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `synoptic`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `synoptic`.`order_list`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `synoptic`.`order_list` (
  `orderList_id` INT NOT NULL AUTO_INCREMENT,
  `productOrder_quantity` INT NOT NULL,
  `order_id` VARCHAR(500) NOT NULL,
  `productInventory_id` INT NOT NULL,
  PRIMARY KEY (`orderList_id`, `order_id`, `productInventory_id`),
  UNIQUE INDEX `orderList_id_UNIQUE` (`orderList_id` ASC) VISIBLE,
  INDEX `fk_order_list_order1_idx` (`order_id` ASC) VISIBLE,
  INDEX `fk_order_list_product_inventory1_idx` (`productInventory_id` ASC) VISIBLE,
  CONSTRAINT `fk_order_list_order1`
    FOREIGN KEY (`order_id`)
    REFERENCES `synoptic`.`order` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_list_product_inventory1`
    FOREIGN KEY (`productInventory_id`)
    REFERENCES `synoptic`.`product_inventory` (`productInventory_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;




-- insert entries of category
INSERT INTO synoptic.category (category_name) VALUES ("men");
INSERT INTO synoptic.category (category_name) VALUES ("women");

-- -----------------------------------------------------
-- Undone
-- -----------------------------------------------------
-- insert entries of product
INSERT INTO synoptic.product(product_id, product_name, product_price, product_img, product_origin, product_textDescription, category_id) VALUES ("1901a045-dc93-42e3-8660-65bdd695a555", "b洋裝", 10, "./img/product_images/1666418162310_iu.jpeg", "taiwan", "this product is good.", 1);
INSERT INTO synoptic.product(product_id, product_name, product_price, product_img, product_origin, product_textDescription, category_id) VALUES ("1ef689d2-911d-481f-8373-a86ab0080f75", "accessories-test", 9999999, "./img/product_images/1666417890622_iu-god.jpeg", "taiwan", "this product is good.", 3);
INSERT INTO synoptic.product(product_id, product_name, product_price, product_img, product_origin, product_textDescription, category_id) VALUES ("295f3ac9-753d-4f1f-a276-c32c11fed137", "pant-1-test", 19999, "./img/product_images/1666417890622_iu-god.jpeg", "taiwan", "this product is good.", 2);
INSERT INTO synoptic.product(product_id, product_name, product_price, product_img, product_origin, product_textDescription, category_id) VALUES ("413ede7a-e798-453c-819a-e6d62f11b8b6", "c洋裝", 1878780, "./img/product_images/1666418644249_iu.jpeg", "taiwan", "this product is good.", 1);
INSERT INTO synoptic.product(product_id, product_name, product_price, product_img, product_origin, product_textDescription, category_id) VALUES ("5e205d21-ddca-4e2f-94ac-f0ac8dd15dce", "e洋裝", 135350, "./img/product_images/1666418162310_iu.jpeg", "taiwan", "this product is good.", 1);
INSERT INTO synoptic.product(product_id, product_name, product_price, product_img, product_origin, product_textDescription, category_id) VALUES ("ad1c4ca1-0acc-4b33-bbf7-d96a6e60495e", "dress-1", 10343, "./img/product_images/1666418162310_iu.jpeg", "taiwan", "this product is good.", 1);
INSERT INTO synoptic.product(product_id, product_name, product_price, product_img, product_origin, product_textDescription, category_id) VALUES ("907d4361-6dcc-44be-98c2-f1645fd8a85c", "dress", 10, "./img/product_images/1666418162310_iu.jpeg", "taiwan", "this product is good.", 1);
INSERT INTO synoptic.product(product_id, product_name, product_price, product_img, product_origin, product_textDescription, category_id) VALUES ("e9f0a85e-6179-4527-95a8-85a6523fc40d", "accessories-test-2", 9923239, "./img/product_images/1666417890622_iu-god.jpeg", "taiwan", "this product is good.", 3);
INSERT INTO synoptic.product(product_id, product_name, product_price, product_img, product_origin, product_textDescription, category_id) VALUES ("c8c2b44e-79e7-46d5-97ae-10b5c720d044", "dress-2", 10, "./img/product_images/1666418162310_iu.jpeg", "taiwan", "this product is good.", 1);
INSERT INTO synoptic.product(product_id, product_name, product_price, product_img, product_origin, product_textDescription, category_id) VALUES ("d4024510-e639-4f60-967c-d9869eefd18c", "pants-2-test", 10, "./img/product_images/1666417890622_iu-god.jpeg", "taiwan", "this product is good.", 2);


-- insert entries of product inventory

insert into synoptic.product_inventory(product_color, product_size, product_quantity, product_id) values ("#5AE5A4", 5, "S", "1901a045-dc93-42e3-8660-65bdd695a555");
insert into synoptic.product_inventory(product_color, product_size, product_quantity, product_id) values ("#E5D85A", 10, "S", "1901a045-dc93-42e3-8660-65bdd695a555");
insert into synoptic.product_inventory(product_color, product_size, product_quantity, product_id) values ("#5AE5A4", 5, "S", "1ef689d2-911d-481f-8373-a86ab0080f75");
insert into synoptic.product_inventory(product_color, product_size, product_quantity, product_id) values ("#E5D85A", 145, "M", "1ef689d2-911d-481f-8373-a86ab0080f75");
insert into synoptic.product_inventory(product_color, product_size, product_quantity, product_id) values ("#825AE5", 10, "S", "1ef689d2-911d-481f-8373-a86ab0080f75");
insert into synoptic.product_inventory(product_color, product_size, product_quantity, product_id) values ("#D4EB9F", 5, "S", "295f3ac9-753d-4f1f-a276-c32c11fed137");
insert into synoptic.product_inventory(product_color, product_size, product_quantity, product_id) values ("#E5D85A", 10, "S", "295f3ac9-753d-4f1f-a276-c32c11fed137");
insert into synoptic.product_inventory(product_color, product_size, product_quantity, product_id) values ("#EB9FBF", 5, "S", "413ede7a-e798-453c-819a-e6d62f11b8b6");
insert into synoptic.product_inventory(product_color, product_size, product_quantity, product_id) values ("#9FABEB", 10, "S", "413ede7a-e798-453c-819a-e6d62f11b8b6");
insert into synoptic.product_inventory(product_color, product_size, product_quantity, product_id) values ("#EB9FBF", 5, "S", "5e205d21-ddca-4e2f-94ac-f0ac8dd15dce");
insert into synoptic.product_inventory(product_color, product_size, product_quantity, product_id) values ("#9FEBDA", 5, "S", "907d4361-6dcc-44be-98c2-f1645fd8a85c");
insert into synoptic.product_inventory(product_color, product_size, product_quantity, product_id) values ("#5AE5A4", 5, "S", "907d4361-6dcc-44be-98c2-f1645fd8a85c");
insert into synoptic.product_inventory(product_color, product_size, product_quantity, product_id) values ("#9FEBDA", 5, "S", "ad1c4ca1-0acc-4b33-bbf7-d96a6e60495e");
insert into synoptic.product_inventory(product_color, product_size, product_quantity, product_id) values ("#DA9FEB", 5, "S", "ad1c4ca1-0acc-4b33-bbf7-d96a6e60495e");
insert into synoptic.product_inventory(product_color, product_size, product_quantity, product_id) values ("#9FEBDA", 5, "S", "c8c2b44e-79e7-46d5-97ae-10b5c720d044");
insert into synoptic.product_inventory(product_color, product_size, product_quantity, product_id) values ("#EB9FBF", 5, "S", "c8c2b44e-79e7-46d5-97ae-10b5c720d044");
insert into synoptic.product_inventory(product_color, product_size, product_quantity, product_id) values ("#D4EB9F", 5, "S", "d4024510-e639-4f60-967c-d9869eefd18c");
insert into synoptic.product_inventory(product_color, product_size, product_quantity, product_id) values ("#EB7FBF", 5, "S", "d4024510-e639-4f60-967c-d9869eefd18c");
insert into synoptic.product_inventory(product_color, product_size, product_quantity, product_id) values ("#823AE5", 5, "S", "e9f0a85e-6179-4527-95a8-85a6523fc40d");
insert into synoptic.product_inventory(product_color, product_size, product_quantity, product_id) values ("#EB1FBF", 5, "S", "e9f0a85e-6179-4527-95a8-85a6523fc40d");


