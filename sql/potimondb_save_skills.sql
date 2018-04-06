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
INSERT INTO `save_skills` VALUES ('2',45,6),('2',84,6),('2',86,6),('2',87,6),('2',97,6),('2',98,6),('2',129,6),('1',45,6),('1',84,6),('1',86,6),('1',87,6),('1',97,6),('1',98,6),('1',129,6),('21a68121-9513-c626-b063-c528c484b0a5',33,8),('21a68121-9513-c626-b063-c528c484b0a5',39,8),('9237455f-0483-372a-69c1-937c2a15defb',33,7),('9237455f-0483-372a-69c1-937c2a15defb',39,7),('d54ed23c-86fe-9123-0654-b6ec59c49cf9',10,9),('d54ed23c-86fe-9123-0654-b6ec59c49cf9',45,9),('0440a1d9-94f3-4c66-4f1a-2d026f5edc5b',33,10),('0440a1d9-94f3-4c66-4f1a-2d026f5edc5b',39,10),('152eb8ee-6a3a-07ba-1be6-8524d5a125ec',10,12),('152eb8ee-6a3a-07ba-1be6-8524d5a125ec',45,12),('03cb8ab3-e4d4-8dba-858c-b666248890c5',33,13),('03cb8ab3-e4d4-8dba-858c-b666248890c5',39,13);
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

-- Dump completed on 2018-04-05  8:54:53