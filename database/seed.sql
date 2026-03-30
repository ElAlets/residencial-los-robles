-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: residencial_los_robles
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `announcements`
--

LOCK TABLES `announcements` WRITE;
/*!40000 ALTER TABLE `announcements` DISABLE KEYS */;
INSERT INTO `announcements` VALUES (1,'Corte de agua','Habrá corte de agua el sábado de 8am a 2pm',1,'2026-03-29 22:36:09','2026-03-29 22:36:09'),(2,'Fumigación','Se realizará fumigación el martes',1,'2026-03-29 22:36:09','2026-03-29 22:36:09'),(3,'Reunión vecinal','Reunión este viernes a las 7pm',1,'2026-03-29 22:36:09','2026-03-29 22:36:09');
/*!40000 ALTER TABLE `announcements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `board_members`
--

LOCK TABLES `board_members` WRITE;
/*!40000 ALTER TABLE `board_members` DISABLE KEYS */;
INSERT INTO `board_members` VALUES (1,'Pedro Gómez','Presidente','5552221111','pedro@test.com'),(2,'Laura Díaz','Tesorera','5552221112','laura@test.com'),(3,'Miguel Ruiz','Secretario','5552221113','miguel@test.com');
/*!40000 ALTER TABLE `board_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `emergency_services`
--

LOCK TABLES `emergency_services` WRITE;
/*!40000 ALTER TABLE `emergency_services` DISABLE KEYS */;
INSERT INTO `emergency_services` VALUES (1,'Hospital General','hospital','911','Av. Salud 123'),(2,'Policía Municipal','police','911','Centro'),(3,'Bomberos','fire_department','911','Zona Norte'),(4,'Protección Civil','civil_protection','911','Zona Sur');
/*!40000 ALTER TABLE `emergency_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `meetings`
--

LOCK TABLES `meetings` WRITE;
/*!40000 ALTER TABLE `meetings` DISABLE KEYS */;
INSERT INTO `meetings` VALUES (1,'Reunión mensual','Temas generales de la colonia','2026-04-10 19:00:00','Salón comunitario','scheduled',1,'2026-03-29 22:36:09','2026-03-29 22:36:09'),(2,'Revisión de pagos','Estado de cuotas','2026-03-20 18:00:00','Oficina','completed',1,'2026-03-29 22:36:09','2026-03-29 22:36:09');
/*!40000 ALTER TABLE `meetings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,2,'payment','Pago pendiente','Tienes un pago pendiente de este mes',0,'2026-03-29 22:36:09'),(2,3,'announcement','Nuevo aviso','Se publicó un nuevo anuncio',0,'2026-03-29 22:36:09'),(3,4,'emergency','Alerta','Simulacro de emergencia mañana',1,'2026-03-29 22:36:09'),(4,5,'meeting','Nueva reunión','Se programó una reunión vecinal',0,'2026-03-29 22:36:09');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,1,500.00,'2026-01-05','cash','paid',NULL,'2026-03-29 22:36:09','2026-03-29 22:36:09'),(2,2,500.00,'2026-01-06','transfer','paid',NULL,'2026-03-29 22:36:09','2026-03-29 22:36:09'),(3,3,500.00,'2026-02-01','simulated_online','paid',NULL,'2026-03-29 22:36:09','2026-03-29 22:36:09'),(4,4,500.00,'2026-02-10','cash','pending',NULL,'2026-03-29 22:36:09','2026-03-29 22:36:09');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `residents`
--

LOCK TABLES `residents` WRITE;
/*!40000 ALTER TABLE `residents` DISABLE KEYS */;
INSERT INTO `residents` VALUES (1,2,'Calle Roble Norte','5551111111','101','active','2026-03-29 22:36:09','2026-03-29 22:36:09'),(2,3,'Calle Roble Norte','5551111112','102','active','2026-03-29 22:36:09','2026-03-29 22:36:09'),(3,4,'Calle Roble Sur','5551111113','201','active','2026-03-29 22:36:09','2026-03-29 22:36:09'),(4,5,'Calle Roble Sur','5551111114','202','active','2026-03-29 22:36:09','2026-03-29 22:36:09');
/*!40000 ALTER TABLE `residents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin Principal','admin@test.com','1234','admin','2026-03-29 22:36:09','2026-03-29 22:36:09'),(2,'Juan Pérez','juan@test.com','1234','resident','2026-03-29 22:36:09','2026-03-29 22:36:09'),(3,'María López','maria@test.com','1234','resident','2026-03-29 22:36:09','2026-03-29 22:36:09'),(4,'Carlos Sánchez','carlos@test.com','1234','resident','2026-03-29 22:36:09','2026-03-29 22:36:09'),(5,'Ana Torres','ana@test.com','1234','resident','2026-03-29 22:36:09','2026-03-29 22:36:09');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-29 16:45:52
