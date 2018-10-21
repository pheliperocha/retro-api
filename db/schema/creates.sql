-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user` (
  `id` INT(11) NOT NULL,
  `firstname` VARCHAR(70) NOT NULL,
  `lastname` VARCHAR(70) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `image` VARCHAR(2083) NULL,
  `linkedinId` VARCHAR(255) NULL,
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
  `userId` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `userId_idx` (`userId` ASC),
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `list`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `list` (
  `id` INT(11) NOT NULL,
  `title` VARCHAR(70) NOT NULL,
  `retroId` INT(11) NOT NULL,
  `status` TINYINT NOT NULL DEFAULT 1,
  `position` INT(2) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `retroId_idx` (`retroId` ASC),
  CONSTRAINT `retroId`
    FOREIGN KEY (`retroId`)
    REFERENCES `retro` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `card`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card` (
  `id` INT(11) NOT NULL,
  `description` VARCHAR(1024) NOT NULL,
  `listId` INT(11) NOT NULL,
  `userId` INT(11) NOT NULL,
  `retroId` INT(11) NOT NULL,
  `status` TINYINT NOT NULL DEFAULT 1,
  `position` INT(2) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `retroId_idx` (`retroId` ASC),
  INDEX `listId_idx` (`listId` ASC),
  INDEX `userId_idx` (`userId` ASC),
  CONSTRAINT `retroId`
    FOREIGN KEY (`retroId`)
    REFERENCES `retro` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `listId`
    FOREIGN KEY (`listId`)
    REFERENCES `list` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `member`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `member` (
  `id` INT(11) NOT NULL,
  `retroId` INT(11) NOT NULL,
  `userId` INT(11) NOT NULL,
  `status` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `retroId_idx` (`retroId` ASC),
  INDEX `userId_idx` (`userId` ASC),
  CONSTRAINT `retroId`
    FOREIGN KEY (`retroId`)
    REFERENCES `retro` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `cardvote`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cardvote` (
  `id` INT(11) NOT NULL,
  `cardId` INT(11) NOT NULL,
  `userId` INT(11) NOT NULL,
  `status` INT(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `cardId_idx` (`cardId` ASC),
  INDEX `userId_idx` (`userId` ASC),
  CONSTRAINT `cardId`
    FOREIGN KEY (`cardId`)
    REFERENCES `card` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `accesstoken`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `accesstoken` (
  `id` VARCHAR(64) NOT NULL,
  `ttl` INT NOT NULL DEFAULT 1209600,
  `userId` INT(11) NOT NULL,
  `created` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `userId_idx` (`userId` ASC),
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `template`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `template` (
  `id` INT(11) NOT NULL,
  `userId` INT(11) NOT NULL,
  `title` VARCHAR(70) NOT NULL,
  `image` VARCHAR(2083) NOT NULL,
  `structure` TEXT NOT NULL,
  `status` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `userId_idx` (`userId` ASC),
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `annotation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `annotation` (
  `id` INT(11) NOT NULL,
  `cardId` INT(11) NOT NULL,
  `userId` INT(11) NOT NULL,
  `description` TEXT NOT NULL,
  `status` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `cardId_idx` (`cardId` ASC),
  INDEX `userId_idx` (`userId` ASC),
  CONSTRAINT `cardId`
    FOREIGN KEY (`cardId`)
    REFERENCES `card` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `annotationResponsible`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `annotationResponsible` (
  `id` INT NOT NULL,
  `annotationId` INT(11) NOT NULL,
  `userId` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `annotationId_idx` (`annotationId` ASC),
  INDEX `userId_idx` (`userId` ASC),
  CONSTRAINT `annotationId`
    FOREIGN KEY (`annotationId`)
    REFERENCES `annotation` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
