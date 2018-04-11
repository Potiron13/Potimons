-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: potimondb
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `save_equipe`
--

DROP TABLE IF EXISTS `save_equipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `save_equipe` (
  `user_id` int(11) NOT NULL,
  `potimon_level` int(11) DEFAULT NULL,
  `potimon_current_hp` int(11) DEFAULT NULL,
  `potimon_current_mana` int(11) DEFAULT NULL,
  `potimon_experience` int(11) DEFAULT NULL,
  `potimon_game_id` varchar(45) NOT NULL,
  `potimon_id` int(11) NOT NULL,
  PRIMARY KEY (`potimon_game_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `save_equipe`
--

LOCK TABLES `save_equipe` WRITE;
/*!40000 ALTER TABLE `save_equipe` DISABLE KEYS */;
INSERT INTO `save_equipe` VALUES (103,5,20,18,0,'2af24649-9b4b-5833-a7c8-2d429b649737',1),(104,5,20,18,0,'ba24dfa5-7722-d1ec-35d2-1ed7cecfb4ae',1),(100,50,20,18,44,'e6454ef7-d9d2-5f21-d4ab-637d2d1925bb',95);
/*!40000 ALTER TABLE `save_equipe` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-11 12:08:26
