CREATE DATABASE IF NOT EXISTS `synoptic`; 
USE `synoptic`;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` varchar(500) NOT NULL,
  `group_id` int unsigned NOT NULL DEFAULT '0',
  `fb_uid` varchar(255) DEFAULT NULL,
  `fb_access_token` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(72) DEFAULT NULL,
  `phone` varchar(16) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
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
  `category` enum('men','women') NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` int unsigned NOT NULL,
  `img_src` varchar(255) DEFAULT NULL,
  `description` varchar(2048) DEFAULT NULL,
  `more` varchar(2048) DEFAULT NULL,
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
  `number` int unsigned NOT NULL,
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
-- Dumping data for table `ordered_items`
--

-- LOCK TABLES `ordered_items` WRITE;
-- /*!40000 ALTER TABLE `ordered_items` DISABLE KEYS */;
-- /*!40000 ALTER TABLE `ordered_items` ENABLE KEYS */;
-- UNLOCK TABLES;


--
-- Dumping data for table `orders`
--

-- LOCK TABLES `orders` WRITE;
-- /*!40000 ALTER TABLE `orders` DISABLE KEYS */;
-- /*!40000 ALTER TABLE `orders` ENABLE KEYS */;
-- UNLOCK TABLES;


--
-- Dumping data for table `products`
--

-- LOCK TABLES `products` WRITE;
-- INSERT INTO `products` VALUES (1,'men','100% Extra Fine Merino Crew Neck Jumper',1253,'https://image.uniqlo.com/UQ/ST3/eu/imagesgoods/450535/item/eugoods_03_450535.jpg?width=450&impolicy=quality_70','100% Extra Fine Merino Crew Neck Jumper','100% Extra Fine Merino Crew Neck Jumper'),(2,'men','Premium Lambswool Crew Neck Jumper',1096,'https://image.uniqlo.com/UQ/ST3/eu/imagesgoods/450541/item/eugoods_62_450541.jpg?width=450&impolicy=quality_70','Premium Lambswool Crew Neck Jumper','Premium Lambswool Crew Neck Jumper'),(3,'men','Fluffy Fleece Jacket',1096,'https://image.uniqlo.com/UQ/ST3/eu/imagesgoods/450198/item/eugoods_66_450198.jpg?width=450&impolicy=quality_70','Fluffy Fleece Jacket','Fluffy Fleece Jacket'),(4,'men','100% Extra Fine Merino Turtleneck Jumper',1253,'https://image.uniqlo.com/UQ/ST3/eu/imagesgoods/450538/item/eugoods_01_450538.jpg?width=450&impolicy=quality_70','100% Extra Fine Merino Turtleneck Jumper','100% Extra Fine Merino Turtleneck Jumper'),(5,'men','100% Cashmere Crew Neck Jumper',4708,'https://image.uniqlo.com/UQ/ST3/eu/imagesgoods/450543/item/eugoods_45_450543.jpg?width=450&impolicy=quality_70','100% Cashmere Crew Neck Jumper','100% Cashmere Crew Neck Jumper'),(6,'men','Seamless Down 3D Cut Parka',5022,'https://image.uniqlo.com/UQ/ST3/eu/imagesgoods/449725/item/eugoods_02_449725.jpg?width=450&impolicy=quality_70','Seamless Down 3D Cut Parka','Seamless Down 3D Cut Parka'),(7,'men','Windproof Outer Fleece Jacket',1881,'https://image.uniqlo.com/UQ/ST3/eu/imagesgoods/450200/item/eugoods_31_450200.jpg?width=450&impolicy=quality_70','Windproof Outer Fleece Jacket','Windproof Outer Fleece Jacket'),(8,'men','Ultra Light Down Vest',1567,'https://image.uniqlo.com/UQ/ST3/eu/imagesgoods/452739/item/eugoods_08_452739.jpg?width=450&impolicy=quality_70','Ultra Light Down Vest','Ultra Light Down Vest'),(9,'men','Ultra Light Down 3D Cut Jacket',2510,'https://image.uniqlo.com/UQ/ST3/eu/imagesgoods/452738/item/eugoods_46_452738.jpg?width=450&impolicy=quality_70','Ultra Light Down 3D Cut Jacket','Ultra Light Down 3D Cut Jacket'),(10,'men','Premium Lambswool Turtleneck Jumper',1096,'https://image.uniqlo.com/UQ/ST3/eu/imagesgoods/451598/item/eugoods_66_451598.jpg?width=450&impolicy=quality_70','Premium Lambswool Turtleneck Jumper','Premium Lambswool Turtleneck Jumper'),(11,'men','Soufflé Low Gauge Knit Half-Zipped Jumper',1253,'https://image.uniqlo.com/UQ/ST3/eu/imagesgoods/450549/item/eugoods_48_450549.jpg?width=450&impolicy=quality_70','Soufflé Low Gauge Knit Half-Zipped Jumper','Soufflé Low Gauge Knit Half-Zipped Jumper'),(12,'men','Seamless Down Coat',5651,'https://image.uniqlo.com/UQ/ST3/eu/imagesgoods/449726/item/eugoods_07_449726.jpg?width=450&impolicy=quality_70','Seamless Down Coat','Seamless Down Coat'),(13,'women','100% Extra Fine Merino Crew Neck Jumper',1096,'https://image.uniqlo.com/UQ/ST3/eu/imagesgoods/450509/item/eugoods_55_450509.jpg?width=450&impolicy=quality_70','100% Extra Fine Merino Crew Neck Jumper','100% Extra Fine Merino Crew Neck Jumper'),(14,'women','Premium Lambswool Crew Neck Jumper',1096,'https://image.uniqlo.com/UQ/ST3/eu/imagesgoods/450516/item/eugoods_46_450516.jpg?width=450&impolicy=quality_70','Premium Lambswool Crew Neck Jumper','Premium Lambswool Crew Neck Jumper'),(15,'women','Seamless Down Long Coat',6279,'https://image.uniqlo.com/UQ/ST3/eu/imagesgoods/450490/item/eugoods_58_450490.jpg?width=450&impolicy=quality_70','Seamless Down Long Coat','Seamless Down Long Coat'),(16,'women','100% Cashmere 3D Knit Seamless Crew Neck Jumper',4080,'https://image.uniqlo.com/UQ/ST3/eu/imagesgoods/450635/item/eugoods_09_450635.jpg?width=450&impolicy=quality_70','100% Cashmere 3D Knit Seamless Crew Neck Jumper','100% Cashmere 3D Knit Seamless Crew Neck Jumper'),(17,'women','Uniqlo U Drawstring Shoulder Bag',1096,'https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/456847/item/goods_09_456847.jpg?width=450&impolicy=quality_70','Uniqlo U Drawstring Shoulder Bag','Uniqlo U Drawstring Shoulder Bag'),(18,'women','Lambswool Turtleneck Jumper',1096,'https://image.uniqlo.com/UQ/ST3/eu/imagesgoods/450517/item/eugoods_01_450517.jpg?width=450&impolicy=quality_70','Lambswool Turtleneck Jumper','Lambswool Turtleneck Jumper'),(19,'women','HEATTECH Crew Neck Long Sleeved Thermal Top',468,'https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/452326/item/goods_09_452326.jpg?width=450&impolicy=quality_70','HEATTECH Crew Neck Long Sleeved Thermal Top','HEATTECH Crew Neck Long Sleeved Thermal Top'),(20,'women','100% Extra Fine Merino Ribbed Turtleneck Jumper',1096,'https://image.uniqlo.com/UQ/ST3/eu/imagesgoods/453458/item/eugoods_56_453458.jpg?width=450&impolicy=quality_70','100% Extra Fine Merino Ribbed Turtleneck Jumper','100% Extra Fine Merino Ribbed Turtleneck Jumper'),(21,'women','Fluffy Fleece Zipped Jacket',939,'https://image.uniqlo.com/UQ/ST3/eu/imagesgoods/449753/item/eugoods_67_449753.jpg?width=450&impolicy=quality_70','Fluffy Fleece Zipped Jacket','Fluffy Fleece Zipped Jacket'),(22,'women','Seamless Down Parka',4708,'https://image.uniqlo.com/UQ/ST3/eu/imagesgoods/452309/item/eugoods_01_452309.jpg?width=450&impolicy=quality_70','Seamless Down Parka','Seamless Down Parka'),(23,'women','Pleated Wide Trousers',1253,'https://image.uniqlo.com/UQ/ST3/eu/imagesgoods/450639/item/eugoods_32_450639.jpg?width=450&impolicy=quality_70','Pleated Wide Trousers','Pleated Wide Trousers'),(24,'women','HEATTECH Scoop Neck Long Sleeved Thermal Top',468,'https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/452321/item/goods_38_452321.jpg?width=450&impolicy=quality_70','HEATTECH Scoop Neck Long Sleeved Thermal Top','HEATTECH Scoop Neck Long Sleeved Thermal Top'),(25,'accessories','100% Cashmere Knitted Beanie',1253,'https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/450336/item/goods_09_450336.jpg?width=450&impolicy=quality_70','100% Cashmere Knitted Beanie','100% Cashmere Knitted Beanie'),(26,'accessories','100% Cashmere Scarf',1881,'https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/450338/item/goods_31_450338.jpg?width=450&impolicy=quality_70','100% Cashmere Scarf','100% Cashmere Scarf'),(27,'accessories','HEATTECH Ribbed Beanie',405,'https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/450225/item/goods_01_450225.jpg?width=450&impolicy=quality_70','HEATTECH Ribbed Beanie','HEATTECH Ribbed Beanie'),(28,'accessories','HEATTECH Lined Touchscreen Thermal Gloves',782,'https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/450231/item/goods_09_450231.jpg?width=450&impolicy=quality_70','HEATTECH Lined Touchscreen Thermal Gloves','HEATTECH Lined Touchscreen Thermal Gloves'),(29,'accessories','100% Cashmere Gloves',1253,'https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/450334/item/goods_36_450334.jpg?width=450&impolicy=quality_70','100% Cashmere Gloves','100% Cashmere Gloves'),(30,'accessories','HEATTECH Patterned Scarf',782,'https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/451588/item/goods_34_451588.jpg?width=450&impolicy=quality_70','HEATTECH Patterned Scarf','HEATTECH Patterned Scarf'),(31,'accessories','HEATTECH Lined Stretch Thermal Gloves',782,'https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/451519/item/goods_06_451519.jpg?width=450&impolicy=quality_70','HEATTECH Lined Stretch Thermal Gloves','HEATTECH Lined Stretch Thermal Gloves'),(32,'accessories','HEATTECH Scarf',782,'https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/450229/item/goods_08_450229.jpg?width=450&impolicy=quality_70','HEATTECH Scarf','HEATTECH Scarf'),(33,'accessories','100% Cashmere Checked Scarf',1881,'https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/453637/item/goods_02_453637.jpg?width=450&impolicy=quality_70','100% Cashmere Checked Scarf','100% Cashmere Checked Scarf'),(34,'accessories','Hat',782,'https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/451501/item/goods_33_451501.jpg?width=450&impolicy=quality_70','Hat','Hat'),(35,'accessories','HEATTECH Scarf',782,'https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/457686/item/goods_01_457686.jpg?width=450&impolicy=quality_70','HEATTECH Scarf','HEATTECH Scarf'),(36,'accessories','HEATTECH Lined Padded Scarf',782,'https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/452374/item/goods_09_452374.jpg?width=450&impolicy=quality_70','HEATTECH Lined Padded Scarf','HEATTECH Lined Padded Scarf'),(37,'accessories','HEATTECH Lined Thermal Gloves',782,'https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/451518/item/goods_09_451518.jpg?width=450&impolicy=quality_70','HEATTECH Lined Thermal Gloves','HEATTECH Lined Thermal Gloves'),(38,'accessories','HEATTECH Neck Gaiter',405,'https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/451525/item/goods_03_451525.jpg?width=450&impolicy=quality_70','HEATTECH Neck Gaiter','HEATTECH Neck Gaiter'),(39,'accessories','Double Ring Belt',782,'https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/452921/item/goods_09_452921.jpg?width=450&impolicy=quality_70','Double Ring Belt','Double Ring Belt'),(40,'accessories','Bucket Hat',782,'https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/455773/item/goods_09_455773.jpg?width=450&impolicy=quality_70','Bucket Hat','Bucket Hat'),(41,'accessories','Reversible Fleece Blanket',782,'https://image.uniqlo.com/UQ/ST3/eu/imagesgoods/451079/item/eugoods_03_451079.jpg?width=450&impolicy=quality_70','Reversible Fleece Blanket','Reversible Fleece Blanket'),(42,'accessories','Twill Cap',782,'https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/451498/item/goods_09_451498.jpg?width=450&impolicy=quality_70','Twill Cap','Twill Cap'),(43,'accessories','HEATTECH Cap',405,'https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/451523/item/goods_03_451523.jpg?width=450&impolicy=quality_70','HEATTECH Cap','HEATTECH Cap'),(44,'accessories','Italian Leather Stitched Belt',939,'https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/451357/item/goods_09_451357.jpg?width=450&impolicy=quality_70','Italian Leather Stitched Belt','Italian Leather Stitched Belt');
-- UNLOCK TABLES;


--
-- Dumping data for table `users`
--

-- LOCK TABLES `users` WRITE;
-- UNLOCK TABLES;


--
-- Dumping data for table `variants`
--

-- LOCK TABLES `variants` WRITE;
-- INSERT INTO `variants` VALUES (1,1,'XS','#9fa0a4',5),(2,1,'XL','#9fa0a4',4),(3,1,'XS','#203d6e',2),(4,1,'S','#203d6e',5),(5,1,'XL','#60172a',5),(6,1,'S','#60172a',4),(7,1,'M','#60172a',2),(8,2,'S','#f2e8df',3),(9,2,'L','#f2e8df',2),(10,2,'XL','#f2e8df',2),(11,2,'M','#a1b9d7',1),(12,3,'XL','#12425d',5),(13,3,'M','#12425d',1),(14,3,'XS','#12425d',4),(15,3,'S','#12425d',1),(16,3,'XL','#2f2f2f',2),(17,3,'M','#2f2f2f',1),(18,3,'L','#2f2f2f',1),(19,4,'L','#1f2022',2),(20,4,'M','#1f2022',3),(21,4,'S','#1f2022',3),(22,4,'XL','#1f2022',2),(23,4,'XS','#f2eee3',2),(24,4,'S','#f2eee3',2),(25,4,'M','#f2eee3',4),(26,4,'XL','#562427',3),(27,4,'S','#562427',1),(28,5,'XS','#e2cb5d',5),(29,5,'S','#e2cb5d',3),(30,5,'L','#393b3b',4),(31,5,'XL','#393b3b',2),(32,6,'L','#535458',2),(33,6,'XL','#535458',2),(34,6,'S','#535458',5),(35,6,'XS','#2b2b2b',2),(36,6,'XL','#2b2b2b',2),(37,7,'L','#151618',5),(38,7,'M','#151618',1),(39,7,'XS','#e0d1b6',3),(40,7,'M','#e0d1b6',1),(41,7,'L','#e0d1b6',3),(42,7,'L','#383b30',3),(43,7,'XS','#383b30',5),(44,8,'XL','#3a3f4e',2),(45,8,'S','#3a3f4e',3),(46,8,'XL','#5a5a5f',3),(47,8,'XS','#5a5a5f',4),(48,8,'M','#5a5a5f',1),(49,8,'M','#7a6751',2),(50,8,'XL','#7a6751',1),(51,9,'L','#4c4f42',5),(52,9,'XS','#4c4f42',2),(53,9,'L','#b68959',3),(54,9,'S','#b68959',5),(55,10,'L','#c5c5c6',5),(56,10,'M','#c5c5c6',4),(57,10,'S','#c5c5c6',1),(58,10,'XS','#9d6f43',1),(59,10,'M','#9d6f43',5),(60,10,'XL','#f0e7de',1),(61,10,'S','#f0e7de',1),(62,10,'XS','#f0e7de',2),(63,10,'XS','#1a295a',1),(64,10,'M','#1a295a',5),(65,11,'XL','#463c1d',4),(66,11,'L','#463c1d',4),(67,11,'XS','#463c1d',2),(68,11,'L','#929395',4),(69,11,'M','#929395',4),(70,12,'XS','#58595e',3),(71,12,'XL','#58595e',1),(72,12,'S','#58595e',2),(73,12,'XL','#57544d',2),(74,12,'L','#57544d',4),(75,13,'XS','#b2adac',1),(76,13,'L','#b2adac',5),(77,13,'M','#b2adac',1),(78,13,'XL','#b2adac',1),(79,13,'S','#131313',2),(80,14,'XS','#a7a7a9',4),(81,14,'S','#a7a7a9',3),(82,14,'L','#a7a7a9',4),(83,14,'XL','#a7a7a9',3),(84,14,'XL','#5c2860',2),(85,14,'L','#5c2860',2),(86,15,'XS','#4f5145',4),(87,15,'XL','#4f5145',5),(88,15,'M','#4f5145',5),(89,15,'XL','#4a413f',2),(90,15,'XS','#4a413f',1),(91,16,'XL','#88913c',2),(92,16,'XS','#a9a8ad',5),(93,16,'XL','#a9a8ad',5),(94,16,'S','#a9a8ad',5),(95,16,'M','#1a1a1b',3),(96,16,'S','#1a1a1b',2),(97,17,'L','#e2dbc8',1),(98,17,'M','#e2dbc8',4),(99,17,'XS','#e2dbc8',5),(100,17,'XS','#745448',1),(101,18,'XS','#2b7094',2),(102,18,'S','#e46e6c',5),(103,18,'L','#e46e6c',3),(104,18,'XL','#ece8dd',5),(105,18,'XS','#ece8dd',3),(106,18,'M','#ece8dd',1),(107,19,'XL','#f3f2f0',3),(108,19,'S','#f3f2f0',2),(109,19,'M','#af1d2f',1),(110,19,'L','#af1d2f',1),(111,19,'S','#af1d2f',4),(112,19,'XS','#232123',3),(113,19,'XL','#232123',2),(114,19,'S','#232123',4),(115,19,'L','#232123',5),(116,19,'XL','#fadfbe',1),(117,19,'XS','#fadfbe',2),(118,19,'L','#fadfbe',5),(119,19,'M','#d3c0bf',4),(120,19,'S','#d3c0bf',2),(121,20,'S','#a3a2a7',3),(122,20,'XL','#a3a2a7',5),(123,20,'M','#a3a2a7',4),(124,20,'XS','#a3a2a7',5),(125,20,'S','#715d21',4),(126,20,'XL','#715d21',1),(127,20,'XS','#715d21',2),(128,21,'S','#1e2123',4),(129,21,'M','#1e2123',1),(130,21,'XS','#1e2123',4),(131,21,'L','#1e2123',2),(132,21,'L','#e1d1db',3),(133,21,'M','#e1d1db',2),(134,21,'S','#972520',3),(135,21,'L','#972520',3),(136,22,'XL','#27282d',1),(137,22,'M','#27282d',3),(138,22,'XS','#27282d',2),(139,22,'M','#525d59',5),(140,22,'XS','#525d59',4),(141,22,'L','#525d59',3),(142,22,'M','#b88274',5),(143,22,'L','#b88274',1),(144,22,'XL','#b88274',4),(145,22,'S','#95918e',1),(146,22,'M','#95918e',5),(147,22,'XS','#95918e',5),(148,22,'XL','#95918e',2),(149,23,'XL','#b3997e',3),(150,23,'XS','#1d1f23',3),(151,23,'M','#1d1f23',4),(152,23,'L','#1d1f23',3),(153,24,'L','#222023',5),(154,24,'S','#222023',5),(155,24,'XL','#f4f3f1',3),(156,24,'XS','#f4f3f1',3),(157,25,'L','#645a55',5),(158,25,'S','#645a55',4),(159,25,'S','#c80c16',5),(160,25,'XS','#c80c16',5),(161,25,'XL','#c80c16',3),(162,26,'S','#ece7e4',1),(163,26,'XL','#ece7e4',1),(164,26,'L','#1c1a1b',4),(165,26,'XS','#1c1a1b',4),(166,27,'S','#79674e',1),(167,27,'XL','#79674e',1),(168,27,'S','#2d2d2d',5),(169,27,'XL','#2d2d2d',4),(170,27,'M','#2d2d2d',1),(171,27,'XS','#131312',4),(172,27,'L','#131312',5),(173,27,'XL','#131312',5),(174,27,'L','#822322',4),(175,27,'XL','#822322',2),(176,27,'M','#822322',4),(177,28,'XL','#282828',2),(178,28,'L','#282828',3),(179,28,'M','#282828',4),(180,28,'M','#967d4f',3),(181,28,'S','#967d4f',3),(182,29,'S','#c7b6ae',2),(183,29,'L','#c7b6ae',2),(184,29,'L','#6a5f58',5),(185,29,'M','#6a5f58',4),(186,30,'XL','#6b1d22',5),(187,30,'XS','#6b1d22',4),(188,30,'M','#253235',4),(189,30,'XL','#253235',4),(190,31,'L','#6d7075',1),(191,31,'XL','#6d7075',4),(192,31,'L','#27282c',4),(193,31,'S','#27282c',2),(194,32,'S','#424345',1),(195,32,'L','#424345',3),(196,32,'XS','#424345',4),(197,32,'L','#212122',3),(198,32,'M','#212122',4),(199,32,'L','#9d7b59',1),(200,32,'M','#9d7b59',4),(201,32,'XL','#9f232a',3),(202,32,'XS','#9f232a',2),(203,33,'S','#1b253f',1),(204,33,'S','#a49993',1),(205,33,'XL','#a49993',5),(206,33,'L','#a49993',2),(207,33,'M','#880f28',2),(208,33,'XL','#880f28',5),(209,34,'XS','#9c8b73',5),(210,34,'M','#2e3945',4),(211,34,'L','#2e3945',2),(212,35,'M','#eaeade',1),(213,35,'XS','#eaeade',3),(214,35,'XL','#eaeade',5),(215,35,'M','#054675',5),(216,35,'XS','#054675',3),(217,36,'M','#55594e',2),(218,36,'L','#55594e',4),(219,36,'XL','#343b48',5),(220,36,'M','#343b48',5),(221,37,'XL','#47332d',1),(222,37,'M','#47332d',3),(223,37,'S','#47332d',4),(224,37,'XS','#47332d',2),(225,37,'XL','#29282a',1),(226,37,'L','#29282a',4),(227,37,'S','#29282a',3),(228,38,'M','#1c1c1c',3),(229,38,'XL','#1c1c1c',5),(230,38,'L','#1c1c1c',1),(231,38,'S','#1d1f29',4),(232,38,'XS','#1d1f29',4),(233,38,'L','#1d1f29',5),(234,39,'XS','#522e37',4),(235,39,'M','#522e37',2),(236,39,'XL','#522e37',3),(237,39,'M','#2b3c3c',5),(238,39,'L','#2b3c3c',3),(239,39,'XL','#2b3c3c',4),(240,39,'XL','#b7a183',3),(241,40,'M','#29292a',1),(242,40,'S','#29292a',2),(243,41,'L','#9e9b9a',5),(244,41,'M','#9e9b9a',5),(245,41,'XS','#232d2f',2),(246,41,'S','#232d2f',3),(247,41,'L','#232d2f',2),(248,42,'XS','#2d3034',2),(249,42,'M','#2d3034',4),(250,42,'XS','#697164',4),(251,42,'M','#697164',4),(252,43,'L','#303032',1),(253,43,'XS','#303032',4),(254,43,'XL','#afaeb3',2),(255,43,'XS','#afaeb3',2),(256,44,'XS','#342d2f',5),(257,44,'XL','#1f2022',4),(258,44,'S','#1f2022',4),(259,44,'M','#1f2022',4);
-- UNLOCK TABLES;


-- Dump completed on 
