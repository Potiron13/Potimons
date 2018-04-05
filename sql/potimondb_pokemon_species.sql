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
-- Table structure for table `pokemon_species`
--

DROP TABLE IF EXISTS `pokemon_species`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pokemon_species` (
  `id` int(11) DEFAULT NULL,
  `identifier` text,
  `generation_id` int(11) DEFAULT NULL,
  `evolves_from_species_id` text,
  `evolution_chain_id` int(11) DEFAULT NULL,
  `color_id` int(11) DEFAULT NULL,
  `shape_id` int(11) DEFAULT NULL,
  `habitat_id` int(11) DEFAULT NULL,
  `gender_rate` int(11) DEFAULT NULL,
  `capture_rate` int(11) DEFAULT NULL,
  `base_happiness` int(11) DEFAULT NULL,
  `is_baby` int(11) DEFAULT NULL,
  `hatch_counter` int(11) DEFAULT NULL,
  `has_gender_differences` int(11) DEFAULT NULL,
  `growth_rate_id` int(11) DEFAULT NULL,
  `forms_switchable` int(11) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `conquest_order` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pokemon_species`
--

LOCK TABLES `pokemon_species` WRITE;
/*!40000 ALTER TABLE `pokemon_species` DISABLE KEYS */;
INSERT INTO `pokemon_species` VALUES (1,'bulbasaur',NULL,'',1,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(2,'ivysaur',NULL,'1',1,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(3,'venusaur',NULL,'2',1,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(4,'charmander',NULL,'',2,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(5,'charmeleon',NULL,'4',2,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(6,'charizard',NULL,'5',2,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(7,'squirtle',NULL,'',3,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(8,'wartortle',NULL,'7',3,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(9,'blastoise',NULL,'8',3,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(10,'caterpie',NULL,'',4,NULL,NULL,NULL,NULL,255,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(11,'metapod',NULL,'10',4,NULL,NULL,NULL,NULL,120,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(12,'butterfree',NULL,'11',4,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(13,'weedle',NULL,'',5,NULL,NULL,NULL,NULL,255,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(14,'kakuna',NULL,'13',5,NULL,NULL,NULL,NULL,120,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(15,'beedrill',NULL,'14',5,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(16,'pidgey',NULL,'',6,NULL,NULL,NULL,NULL,255,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(17,'pidgeotto',NULL,'16',6,NULL,NULL,NULL,NULL,120,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(18,'pidgeot',NULL,'17',6,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(19,'rattata',NULL,'',7,NULL,NULL,NULL,NULL,255,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(20,'raticate',NULL,'19',7,NULL,NULL,NULL,NULL,127,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(21,'spearow',NULL,'',8,NULL,NULL,NULL,NULL,255,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(22,'fearow',NULL,'21',8,NULL,NULL,NULL,NULL,90,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(23,'ekans',NULL,'',9,NULL,NULL,NULL,NULL,255,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(24,'arbok',NULL,'23',9,NULL,NULL,NULL,NULL,90,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(25,'pikachu',NULL,'172',10,NULL,NULL,NULL,NULL,190,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(26,'raichu',NULL,'25',10,NULL,NULL,NULL,NULL,75,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(27,'sandshrew',NULL,'',11,NULL,NULL,NULL,NULL,255,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(28,'sandslash',NULL,'27',11,NULL,NULL,NULL,NULL,90,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(29,'nidoran-f',NULL,'',12,NULL,NULL,NULL,NULL,235,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(30,'nidorina',NULL,'29',12,NULL,NULL,NULL,NULL,120,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(31,'nidoqueen',NULL,'30',12,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(32,'nidoran-m',NULL,'',13,NULL,NULL,NULL,NULL,235,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(33,'nidorino',NULL,'32',13,NULL,NULL,NULL,NULL,120,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(34,'nidoking',NULL,'33',13,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(35,'clefairy',NULL,'173',14,NULL,NULL,NULL,NULL,150,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL),(36,'clefable',NULL,'35',14,NULL,NULL,NULL,NULL,25,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL),(37,'vulpix',NULL,'',15,NULL,NULL,NULL,NULL,190,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(38,'ninetales',NULL,'37',15,NULL,NULL,NULL,NULL,75,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(39,'jigglypuff',NULL,'174',16,NULL,NULL,NULL,NULL,170,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL),(40,'wigglytuff',NULL,'39',16,NULL,NULL,NULL,NULL,50,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL),(41,'zubat',NULL,'',17,NULL,NULL,NULL,NULL,255,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(42,'golbat',NULL,'41',17,NULL,NULL,NULL,NULL,90,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(43,'oddish',NULL,'',18,NULL,NULL,NULL,NULL,255,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(44,'gloom',NULL,'43',18,NULL,NULL,NULL,NULL,120,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(45,'vileplume',NULL,'44',18,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(46,'paras',NULL,'',19,NULL,NULL,NULL,NULL,190,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(47,'parasect',NULL,'46',19,NULL,NULL,NULL,NULL,75,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(48,'venonat',NULL,'',20,NULL,NULL,NULL,NULL,190,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(49,'venomoth',NULL,'48',20,NULL,NULL,NULL,NULL,75,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(50,'diglett',NULL,'',21,NULL,NULL,NULL,NULL,255,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(51,'dugtrio',NULL,'50',21,NULL,NULL,NULL,NULL,50,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(52,'meowth',NULL,'',22,NULL,NULL,NULL,NULL,255,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(53,'persian',NULL,'52',22,NULL,NULL,NULL,NULL,90,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(54,'psyduck',NULL,'',23,NULL,NULL,NULL,NULL,190,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(55,'golduck',NULL,'54',23,NULL,NULL,NULL,NULL,75,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(56,'mankey',NULL,'',24,NULL,NULL,NULL,NULL,190,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(57,'primeape',NULL,'56',24,NULL,NULL,NULL,NULL,75,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(58,'growlithe',NULL,'',25,NULL,NULL,NULL,NULL,190,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(59,'arcanine',NULL,'58',25,NULL,NULL,NULL,NULL,75,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(60,'poliwag',NULL,'',26,NULL,NULL,NULL,NULL,255,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(61,'poliwhirl',NULL,'60',26,NULL,NULL,NULL,NULL,120,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(62,'poliwrath',NULL,'61',26,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(63,'abra',NULL,'',27,NULL,NULL,NULL,NULL,200,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(64,'kadabra',NULL,'63',27,NULL,NULL,NULL,NULL,100,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(65,'alakazam',NULL,'64',27,NULL,NULL,NULL,NULL,50,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(66,'machop',NULL,'',28,NULL,NULL,NULL,NULL,180,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(67,'machoke',NULL,'66',28,NULL,NULL,NULL,NULL,90,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(68,'machamp',NULL,'67',28,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(69,'bellsprout',NULL,'',29,NULL,NULL,NULL,NULL,255,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(70,'weepinbell',NULL,'69',29,NULL,NULL,NULL,NULL,120,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(71,'victreebel',NULL,'70',29,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(72,'tentacool',NULL,'',30,NULL,NULL,NULL,NULL,190,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(73,'tentacruel',NULL,'72',30,NULL,NULL,NULL,NULL,60,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(74,'geodude',NULL,'',31,NULL,NULL,NULL,NULL,255,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(75,'graveler',NULL,'74',31,NULL,NULL,NULL,NULL,120,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(76,'golem',NULL,'75',31,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(77,'ponyta',NULL,'',32,NULL,NULL,NULL,NULL,190,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(78,'rapidash',NULL,'77',32,NULL,NULL,NULL,NULL,60,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(79,'slowpoke',NULL,'',33,NULL,NULL,NULL,NULL,190,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(80,'slowbro',NULL,'79',33,NULL,NULL,NULL,NULL,75,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(81,'magnemite',NULL,'',34,NULL,NULL,NULL,NULL,190,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(82,'magneton',NULL,'81',34,NULL,NULL,NULL,NULL,60,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(83,'farfetchd',NULL,'',35,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(84,'doduo',NULL,'',36,NULL,NULL,NULL,NULL,190,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(85,'dodrio',NULL,'84',36,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(86,'seel',NULL,'',37,NULL,NULL,NULL,NULL,190,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(87,'dewgong',NULL,'86',37,NULL,NULL,NULL,NULL,75,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(88,'grimer',NULL,'',38,NULL,NULL,NULL,NULL,190,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(89,'muk',NULL,'88',38,NULL,NULL,NULL,NULL,75,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(90,'shellder',NULL,'',39,NULL,NULL,NULL,NULL,190,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(91,'cloyster',NULL,'90',39,NULL,NULL,NULL,NULL,60,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(92,'gastly',NULL,'',40,NULL,NULL,NULL,NULL,190,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(93,'haunter',NULL,'92',40,NULL,NULL,NULL,NULL,90,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(94,'gengar',NULL,'93',40,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL),(95,'onix',NULL,'',41,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(96,'drowzee',NULL,'',42,NULL,NULL,NULL,NULL,190,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(97,'hypno',NULL,'96',42,NULL,NULL,NULL,NULL,75,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(98,'krabby',NULL,'',43,NULL,NULL,NULL,NULL,225,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(99,'kingler',NULL,'98',43,NULL,NULL,NULL,NULL,60,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(100,'voltorb',NULL,'',44,NULL,NULL,NULL,NULL,190,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(101,'electrode',NULL,'100',44,NULL,NULL,NULL,NULL,60,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(102,'exeggcute',NULL,'',45,NULL,NULL,NULL,NULL,90,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(103,'exeggutor',NULL,'102',45,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(104,'cubone',NULL,'',46,NULL,NULL,NULL,NULL,190,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(105,'marowak',NULL,'104',46,NULL,NULL,NULL,NULL,75,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(106,'hitmonlee',NULL,'236',47,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(107,'hitmonchan',NULL,'236',47,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(108,'lickitung',NULL,'',48,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(109,'koffing',NULL,'',49,NULL,NULL,NULL,NULL,190,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(110,'weezing',NULL,'109',49,NULL,NULL,NULL,NULL,60,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(111,'rhyhorn',NULL,'',50,NULL,NULL,NULL,NULL,120,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(112,'rhydon',NULL,'111',50,NULL,NULL,NULL,NULL,60,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(113,'chansey',NULL,'440',51,NULL,NULL,NULL,NULL,30,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL),(114,'tangela',NULL,'',52,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(115,'kangaskhan',NULL,'',53,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(116,'horsea',NULL,'',54,NULL,NULL,NULL,NULL,225,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(117,'seadra',NULL,'116',54,NULL,NULL,NULL,NULL,75,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(118,'goldeen',NULL,'',55,NULL,NULL,NULL,NULL,225,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(119,'seaking',NULL,'118',55,NULL,NULL,NULL,NULL,60,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(120,'staryu',NULL,'',56,NULL,NULL,NULL,NULL,225,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(121,'starmie',NULL,'120',56,NULL,NULL,NULL,NULL,60,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(122,'mr-mime',NULL,'439',57,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(123,'scyther',NULL,'',58,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(124,'jynx',NULL,'238',59,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(125,'electabuzz',NULL,'239',60,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(126,'magmar',NULL,'240',61,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(127,'pinsir',NULL,'',62,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(128,'tauros',NULL,'',63,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(129,'magikarp',NULL,'',64,NULL,NULL,NULL,NULL,255,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(130,'gyarados',NULL,'129',64,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(131,'lapras',NULL,'',65,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(132,'ditto',NULL,'',66,NULL,NULL,NULL,NULL,35,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(133,'eevee',NULL,'',67,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(134,'vaporeon',NULL,'133',67,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(135,'jolteon',NULL,'133',67,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(136,'flareon',NULL,'133',67,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(137,'porygon',NULL,'',68,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(138,'omanyte',NULL,'',69,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(139,'omastar',NULL,'138',69,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(140,'kabuto',NULL,'',70,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(141,'kabutops',NULL,'140',70,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL),(142,'aerodactyl',NULL,'',71,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(143,'snorlax',NULL,'446',72,NULL,NULL,NULL,NULL,25,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(144,'articuno',NULL,'',73,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(145,'zapdos',NULL,'',74,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(146,'moltres',NULL,'',75,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(147,'dratini',NULL,'',76,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(148,'dragonair',NULL,'147',76,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(149,'dragonite',NULL,'148',76,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(150,'mewtwo',NULL,'',77,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(151,'mew',NULL,'',78,NULL,NULL,NULL,NULL,45,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL);
/*!40000 ALTER TABLE `pokemon_species` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-05  8:54:54
