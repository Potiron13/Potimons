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
-- Table structure for table `pokemon`
--

DROP TABLE IF EXISTS `pokemon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pokemon` (
  `id` int(11) DEFAULT NULL,
  `identifier` text,
  `height` int(11) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `base_experience` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pokemon`
--

LOCK TABLES `pokemon` WRITE;
/*!40000 ALTER TABLE `pokemon` DISABLE KEYS */;
INSERT INTO `pokemon` VALUES (1,'bulbasaur',7,69,64),(2,'ivysaur',10,130,142),(3,'venusaur',20,1000,236),(4,'charmander',6,85,62),(5,'charmeleon',11,190,142),(6,'charizard',17,905,240),(7,'squirtle',5,90,63),(8,'wartortle',10,225,142),(9,'blastoise',16,855,239),(10,'caterpie',3,29,39),(11,'metapod',7,99,72),(12,'butterfree',11,320,178),(13,'weedle',3,32,39),(14,'kakuna',6,100,72),(15,'beedrill',10,295,178),(16,'pidgey',3,18,50),(17,'pidgeotto',11,300,122),(18,'pidgeot',15,395,216),(19,'rattata',3,35,51),(20,'raticate',7,185,145),(21,'spearow',3,20,52),(22,'fearow',12,380,155),(23,'ekans',20,69,58),(24,'arbok',35,650,157),(25,'pikachu',4,60,112),(26,'raichu',8,300,218),(27,'sandshrew',6,120,60),(28,'sandslash',10,295,158),(29,'nidoran-f',4,70,55),(30,'nidorina',8,200,128),(31,'nidoqueen',13,600,227),(32,'nidoran-m',5,90,55),(33,'nidorino',9,195,128),(34,'nidoking',14,620,227),(35,'clefairy',6,75,113),(36,'clefable',13,400,217),(37,'vulpix',6,99,60),(38,'ninetales',11,199,177),(39,'jigglypuff',5,55,95),(40,'wigglytuff',10,120,196),(41,'zubat',8,75,49),(42,'golbat',16,550,159),(43,'oddish',5,54,64),(44,'gloom',8,86,138),(45,'vileplume',12,186,221),(46,'paras',3,54,57),(47,'parasect',10,295,142),(48,'venonat',10,300,61),(49,'venomoth',15,125,158),(50,'diglett',2,8,53),(51,'dugtrio',7,333,149),(52,'meowth',4,42,58),(53,'persian',10,320,154),(54,'psyduck',8,196,64),(55,'golduck',17,766,175),(56,'mankey',5,280,61),(57,'primeape',10,320,159),(58,'growlithe',7,190,70),(59,'arcanine',19,1550,194),(60,'poliwag',6,124,60),(61,'poliwhirl',10,200,135),(62,'poliwrath',13,540,230),(63,'abra',9,195,62),(64,'kadabra',13,565,140),(65,'alakazam',15,480,225),(66,'machop',8,195,61),(67,'machoke',15,705,142),(68,'machamp',16,1300,227),(69,'bellsprout',7,40,60),(70,'weepinbell',10,64,137),(71,'victreebel',17,155,221),(72,'tentacool',9,455,67),(73,'tentacruel',16,550,180),(74,'geodude',4,200,60),(75,'graveler',10,1050,137),(76,'golem',14,3000,223),(77,'ponyta',10,300,82),(78,'rapidash',17,950,175),(79,'slowpoke',12,360,63),(80,'slowbro',16,785,172),(81,'magnemite',3,60,65),(82,'magneton',10,600,163),(83,'farfetchd',8,150,132),(84,'doduo',14,392,62),(85,'dodrio',18,852,165),(86,'seel',11,900,65),(87,'dewgong',17,1200,166),(88,'grimer',9,300,65),(89,'muk',12,300,175),(90,'shellder',3,40,61),(91,'cloyster',15,1325,184),(92,'gastly',13,1,62),(93,'haunter',16,1,142),(94,'gengar',15,405,225),(95,'onix',88,2100,77),(96,'drowzee',10,324,66),(97,'hypno',16,756,169),(98,'krabby',4,65,65),(99,'kingler',13,600,166),(100,'voltorb',5,104,66),(101,'electrode',12,666,172),(102,'exeggcute',4,25,65),(103,'exeggutor',20,1200,186),(104,'cubone',4,65,64),(105,'marowak',10,450,149),(106,'hitmonlee',15,498,159),(107,'hitmonchan',14,502,159),(108,'lickitung',12,655,77),(109,'koffing',6,10,68),(110,'weezing',12,95,172),(111,'rhyhorn',10,1150,69),(112,'rhydon',19,1200,170),(113,'chansey',11,346,395),(114,'tangela',10,350,87),(115,'kangaskhan',22,800,172),(116,'horsea',4,80,59),(117,'seadra',12,250,154),(118,'goldeen',6,150,64),(119,'seaking',13,390,158),(120,'staryu',8,345,68),(121,'starmie',11,800,182),(122,'mr-mime',13,545,161),(123,'scyther',15,560,100),(124,'jynx',14,406,159),(125,'electabuzz',11,300,172),(126,'magmar',13,445,173),(127,'pinsir',15,550,175),(128,'tauros',14,884,172),(129,'magikarp',9,100,40),(130,'gyarados',65,2350,189),(131,'lapras',25,2200,187),(132,'ditto',3,40,101),(133,'eevee',3,65,65),(134,'vaporeon',10,290,184),(135,'jolteon',8,245,184),(136,'flareon',9,250,184),(137,'porygon',8,365,79),(138,'omanyte',4,75,71),(139,'omastar',10,350,173),(140,'kabuto',5,115,71),(141,'kabutops',13,405,173),(142,'aerodactyl',18,590,180),(143,'snorlax',21,4600,189),(144,'articuno',17,554,261),(145,'zapdos',16,526,261),(146,'moltres',20,600,261),(147,'dratini',18,33,60),(148,'dragonair',40,165,147),(149,'dragonite',22,2100,270),(150,'mewtwo',20,1220,306),(151,'mew',4,40,270);
/*!40000 ALTER TABLE `pokemon` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-16 18:53:54
