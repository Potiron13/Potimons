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
-- Table structure for table `save_skills`
--

DROP TABLE IF EXISTS `save_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `save_skills` (
  `potimon_game_id` varchar(45) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `save_skills`
--

LOCK TABLES `save_skills` WRITE;
/*!40000 ALTER TABLE `save_skills` DISABLE KEYS */;
INSERT INTO `save_skills` VALUES ('e6454ef7-d9d2-5f21-d4ab-637d2d1925bb',20,100),('e6454ef7-d9d2-5f21-d4ab-637d2d1925bb',21,100),('e6454ef7-d9d2-5f21-d4ab-637d2d1925bb',88,100),('e6454ef7-d9d2-5f21-d4ab-637d2d1925bb',99,100),('e6454ef7-d9d2-5f21-d4ab-637d2d1925bb',103,100),('e6454ef7-d9d2-5f21-d4ab-637d2d1925bb',106,100),('e6454ef7-d9d2-5f21-d4ab-637d2d1925bb',33,100),('e6454ef7-d9d2-5f21-d4ab-637d2d1925bb',45,100),('e4d4037f-2d3f-77a3-f4c1-d57d83282495',33,100),('e4d4037f-2d3f-77a3-f4c1-d57d83282495',39,100),('2af24649-9b4b-5833-a7c8-2d429b649737',33,103),('2af24649-9b4b-5833-a7c8-2d429b649737',45,103),('ba24dfa5-7722-d1ec-35d2-1ed7cecfb4ae',33,104),('ba24dfa5-7722-d1ec-35d2-1ed7cecfb4ae',45,104);
/*!40000 ALTER TABLE `save_skills` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-11 12:08:23
