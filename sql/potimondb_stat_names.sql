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
-- Table structure for table `stat_names`
--

DROP TABLE IF EXISTS `stat_names`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stat_names` (
  `stat_id` int(11) DEFAULT NULL,
  `local_language_id` int(11) DEFAULT NULL,
  `name` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stat_names`
--

LOCK TABLES `stat_names` WRITE;
/*!40000 ALTER TABLE `stat_names` DISABLE KEYS */;
INSERT INTO `stat_names` VALUES (1,1,'HP'),(1,5,'PV'),(1,6,'KP'),(1,7,'PS'),(1,8,'PS'),(1,9,'HP'),(2,1,'こうげき'),(2,5,'Attaque'),(2,6,'Angriff'),(2,7,'Ataque'),(2,8,'Attacco'),(2,9,'Attack'),(3,1,'ぼうぎょ'),(3,5,'Défense'),(3,6,'Verteidigung'),(3,7,'Defensa'),(3,8,'Difesa'),(3,9,'Defense'),(4,1,'とくこう'),(4,5,'Attaque Spéciale'),(4,6,'Spezialangriff'),(4,7,'Ataque Especial'),(4,8,'Attacco Speciale'),(4,9,'Special Attack'),(5,1,'とくぼう'),(5,5,'Défense Spéciale'),(5,6,'Spezialverteidigung'),(5,7,'Defensa Especial'),(5,8,'Difesa Speciale'),(5,9,'Special Defense'),(6,1,'すばやさ'),(6,5,'Vitesse'),(6,6,'Initiative'),(6,7,'Velocidad'),(6,8,'Velocità'),(6,9,'Speed'),(7,1,'めいちゅう'),(7,5,'Précision'),(7,6,'Genauigkeit'),(7,7,'Precisión'),(7,8,'precisione'),(7,9,'accuracy'),(8,1,'かいひ'),(8,5,'Esquive'),(8,6,'Fluchtwert'),(8,7,'Evasión'),(8,8,'elusione'),(8,9,'evasion');
/*!40000 ALTER TABLE `stat_names` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-11 12:08:28
