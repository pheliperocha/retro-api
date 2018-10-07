-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user` (
  `id` INT(11) NOT NULL,
  `firstname` VARCHAR(70) NOT NULL,
  `lastname` VARCHAR(70) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `image` VARCHAR(2083) NULL,
  `linkedinid` VARCHAR(255) NULL,
  `status` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `retro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `retro` (
  `id` INT(11) NOT NULL,
  `title` VARCHAR(70) NOT NULL,
  `context` TEXT NOT NULL,
  `image` VARCHAR(2083) NULL,
  `pin` INT(7) NULL,
  `status` TINYINT NULL DEFAULT 1,
  `userid` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `userid_idx` (`userid` ASC),
  CONSTRAINT `userid`
    FOREIGN KEY (`userid`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `list`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `list` (
  `id` INT(11) NOT NULL,
  `title` VARCHAR(70) NOT NULL,
  `retroid` INT(11) NOT NULL,
  `status` TINYINT NOT NULL DEFAULT 1,
  `position` INT(2) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `retroid_idx` (`retroid` ASC),
  CONSTRAINT `retroid`
    FOREIGN KEY (`retroid`)
    REFERENCES `retro` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `card`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card` (
  `id` INT(11) NOT NULL,
  `description` VARCHAR(1024) NOT NULL,
  `listid` INT(11) NOT NULL,
  `userid` INT(11) NOT NULL,
  `retroid` INT(11) NOT NULL,
  `status` TINYINT NOT NULL DEFAULT 1,
  `position` INT(2) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `retroid_idx` (`retroid` ASC),
  INDEX `listid_idx` (`listid` ASC),
  INDEX `userid_idx` (`userid` ASC),
  CONSTRAINT `retroid`
    FOREIGN KEY (`retroid`)
    REFERENCES `retro` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `listid`
    FOREIGN KEY (`listid`)
    REFERENCES `list` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `userid`
    FOREIGN KEY (`userid`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `member`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `member` (
  `id` INT(11) NOT NULL,
  `retroid` INT(11) NOT NULL,
  `userid` INT(11) NOT NULL,
  `status` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `retroid_idx` (`retroid` ASC),
  INDEX `userid_idx` (`userid` ASC),
  CONSTRAINT `retroid`
    FOREIGN KEY (`retroid`)
    REFERENCES `retro` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `userid`
    FOREIGN KEY (`userid`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `cardvote`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cardvote` (
  `id` INT(11) NOT NULL,
  `cardid` INT(11) NOT NULL,
  `userid` INT(11) NOT NULL,
  `status` INT(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `cardid_idx` (`cardid` ASC),
  INDEX `userid_idx` (`userid` ASC),
  CONSTRAINT `cardid`
    FOREIGN KEY (`cardid`)
    REFERENCES `card` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `userid`
    FOREIGN KEY (`userid`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `accesstoken`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `accesstoken` (
  `id` VARCHAR(64) NOT NULL,
  `ttl` INT NOT NULL DEFAULT 1209600,
  `userid` INT(11) NOT NULL,
  `created` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `userid_idx` (`userid` ASC),
  CONSTRAINT `userid`
    FOREIGN KEY (`userid`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `template`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `template` (
  `id` INT(11) NOT NULL,
  `userid` INT(11) NOT NULL,
  `title` VARCHAR(70) NOT NULL,
  `image` VARCHAR(2083) NOT NULL,
  `structure` TEXT NOT NULL,
  `status` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `userid_idx` (`userid` ASC),
  CONSTRAINT `userid`
    FOREIGN KEY (`userid`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `action`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `action` (
  `id` INT(11) NOT NULL,
  `cardid` INT(11) NOT NULL,
  `userid` INT(11) NOT NULL,
  `description` TEXT NOT NULL,
  `status` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `cardid_idx` (`cardid` ASC),
  INDEX `userid_idx` (`userid` ASC),
  CONSTRAINT `cardid`
    FOREIGN KEY (`cardid`)
    REFERENCES `card` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `userid`
    FOREIGN KEY (`userid`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `actionresponsible`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `actionresponsible` (
  `id` INT NOT NULL,
  `actionid` INT(11) NOT NULL,
  `userid` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `actionid_idx` (`actionid` ASC),
  INDEX `userid_idx` (`userid` ASC),
  CONSTRAINT `actionid`
    FOREIGN KEY (`actionid`)
    REFERENCES `action` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `userid`
    FOREIGN KEY (`userid`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
