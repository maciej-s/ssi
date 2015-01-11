DROP DATABASE IF EXISTS `ssi`;
CREATE DATABASE `ssi`;
USE `ssi`;

-- users
GRANT ALL ON `ssi`.* TO `ssi`@`localhost` IDENTIFIED BY 'ssi';
-- tables
CREATE TABLE IF NOT EXISTS `user` (
  `USERID` int(8) NOT NULL  primary key auto_increment,
  `NAME` varchar(14) NOT NULL,
  `SURNAME` varchar(20) NOT NULL,
  `LOGIN` varchar(20) NOT NULL,
  `PASSWORD` varchar(20) NOT NULL,
  `EMAIL` varchar(24) NOT NULL,
  UNIQUE KEY `USERID` (`USERID`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

CREATE TABLE `offer`(
 `item_id` int not null primary key auto_increment,
 `name` varchar(30) not null,
 `price` decimal(7,2) not null default 0,
 `discount` decimal(7,2),
 `hotel` int(1) unsigned not null default 0,
 `stars` int(1) unsigned not null
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

CREATE TABLE `user_basket` (
 `item_id` int not null primary key auto_increment,
 `total` decimal(7,2) not null default 0,
 `user_id` int not null,
 `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 `status` enum('D','A','C','B'),
 FOREIGN KEY (`user_id`) REFERENCES `user`(`USERID`) ON DELETE CASCADE
)  ENGINE=InnoDB DEFAULT CHARSET=UTF8;

CREATE TABLE `user_basket_offer`(
 `item_id` int not null primary key auto_increment,
 `basket_id` int not null,
 `offer_id` int not null,
 `members_amount` int not null default 0,
  FOREIGN KEY (`offer_id`) REFERENCES `offer`(`item_id`) ON DELETE CASCADE,
  FOREIGN KEY (`basket_id`) REFERENCES `user_basket`(`item_id`) ON DELETE CASCADE,
  UNIQUE (`basket_id`,`offer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;



CREATE TABLE `offer_images`(
 `item_id` int not null primary key auto_increment,
 `offer_id` int not null,
 `name` varchar(20) not null,
 `file_path` varchar(256) not null,
 FOREIGN KEY(`offer_id`) REFERENCES `offer`(`item_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

CREATE TABLE `offer_basic`(
 `item_id` int not null primary key auto_increment,
 `offer_id` int not null,
 `name` varchar(20) not null,
 `value` longtext,
 FOREIGN KEY(`offer_id`) REFERENCES `offer`(`item_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

CREATE TABLE `offer_widget`(
 `item_id` int not null primary key auto_increment,
 `offer_id` int not null,
 `name` varchar(20) not null,
 `content` longtext,
 FOREIGN KEY(`offer_id`) REFERENCES `offer`(`item_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;


-- routines
DELIMITER //
CREATE TRIGGER `user_basket_offer_update` AFTER INSERT
 ON `user_basket_offer` FOR EACH ROW
 BEGIN
 	UPDATE `user_basket` SET `total`=`total`+(SELECT `price` FROM `offer` WHERE `item_id` = NEW.`offer_id` LIMIT 1) WHERE `item_id` = NEW.`basket_id`;
 END//
DELIMITER ;